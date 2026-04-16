import { useEffect, useMemo, useState } from 'react';

import { styled } from '@mui/material';
import { prisma } from 'common/libs/prisma.lib';
import { socket } from 'common/libs';
import type { Character } from 'common/types';
import Queue from 'js-queue';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface DiceConfig {
  diceOnScreenTimeoutInMS: number;
  timeBetweenDicesInMS: number;
}

interface Roll {
  rolled_number: number;
}

interface DiceProps {
  character: Character | null;
  config: DiceConfig;
}

// ---------------------------------------------------------------------------
// Server-side data fetching
// ---------------------------------------------------------------------------

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const characterId = Number.isNaN(Number(params?.id)) ? null : Number(params?.id);

  if (!characterId) {
    return { props: { character: null, config: null } };
  }

  // Fetch character and config in parallel to reduce latency
  const [character, configs] = await Promise.all([
    prisma.character.findUnique({ where: { id: characterId } }),
    prisma.config.findMany(),
  ]);

  if (!character) {
    return { props: { character: null, config: null } };
  }

  const findConfig = (name: string) =>
    Number.parseInt(configs.find((c) => c.name === name)?.value ?? '0', 10);

  return {
    props: {
      character: JSON.parse(JSON.stringify(character)),
      config: {
        diceOnScreenTimeoutInMS: findConfig('DICE_ON_SCREEN_TIMEOUT_IN_MS'),
        timeBetweenDicesInMS: findConfig('TIME_BETWEEN_DICES_IN_MS'),
      },
    },
  };
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const Dice = ({ character, config }: DiceProps) => {
  // Queue ensures dice animations play sequentially, not concurrently
  const queue = useMemo(() => new Queue(), []);

  const [currentDice, setCurrentDice] = useState<Roll | null>(null);

  useEffect(() => {
    // Make the dice overlay transparent so it can be layered over the portrait
    document.body.style.backgroundColor = 'transparent';
  }, []);

  useEffect(() => {
    if (!character || !config) return;

    const showDiceOnScreen = function (this: Queue, roll: Roll) {
      setCurrentDice(roll);

      // Hide the dice after the configured on-screen duration
      setTimeout(() => setCurrentDice(null), config.diceOnScreenTimeoutInMS);

      // Advance the queue after the full display + gap duration
      setTimeout(() => {
        (this as any).next();
      }, config.diceOnScreenTimeoutInMS + config.timeBetweenDicesInMS);
    };

    socket.emit('room:join', `dice_character_${character.id}`);

    socket.on('dice_roll', (data: { rolls: Roll[] }) => {
      data.rolls.forEach((roll) => {
        queue.add(showDiceOnScreen.bind(queue, roll));
      });
    });

    return () => {
      socket.off('dice_roll');
    };
  }, [character, queue, config]);

  if (!character) {
    return <div>Personagem não existe!</div>;
  }

  return (
    <>
      <Head>
        <title>Dados de {character.name} | RPG</title>
      </Head>
      <Container>
        {currentDice && (
          <DiceContainer>
            <div>
              <video width='600' height='600' autoPlay muted>
                <source src='/assets/dice.webm' type='video/webm' />
              </video>
            </div>
            <DiceResult>
              <DiceNumber>{currentDice.rolled_number}</DiceNumber>
            </DiceResult>
          </DiceContainer>
        )}
      </Container>
    </>
  );
};

// ---------------------------------------------------------------------------
// Styled components
// ---------------------------------------------------------------------------

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  fontFamily: 'Fruktur',
  userSelect: 'none',
});

const DiceContainer = styled('div')({
  position: 'relative',
});

const DiceResult = styled('div')({
  position: 'absolute',
  top: '180px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
});

const DiceNumber = styled('span')({
  zIndex: 2,
  fontSize: '150px',
  textShadow: '0 0 10px #FFFFFF',
});

export default Dice;

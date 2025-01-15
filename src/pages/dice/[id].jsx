import React, { useEffect, useMemo, useState } from 'react';

import Queue from 'js-queue';
import Head from 'next/head';

import socket from '../../utils/socket';

import { prisma } from '../../database';
import { styled } from '@mui/material';

export const getServerSideProps = async ({ params }) => {
  const characterId = isNaN(params.id) ? null : Number(params.id);

  if (!characterId) {
    return {
      props: {
        character: null,
      },
    };
  }

  const character = await prisma.character.findUnique({
    where: {
      id: characterId,
    },
  });

  if (!character) {
    return {
      props: {
        character: null,
      },
    };
  }

  const configs = await prisma.config.findMany();

  const serialized = JSON.parse(JSON.stringify(character));

  return {
    props: {
      character: serialized,
      config: {
        diceOnScreenTimeoutInMS: parseInt(
          configs.find(config => config.name === 'DICE_ON_SCREEN_TIMEOUT_IN_MS').value,
        ),
        timeBetweenDicesInMS: parseInt(
          configs.find(config => config.name === 'TIME_BETWEEN_DICES_IN_MS').value,
        ),
      },
    },
  };
};

function Dice({ classes, character, config }) {
  const queue = useMemo(() => new Queue(), []);

  const [currentDice, setCurrentDice] = useState(null);

  useEffect(() => {
    document.body.style.backgroundColor = 'transparent';
  }, []);

  useEffect(() => {
    function showDiceOnScreen(roll) {
      setCurrentDice(roll);

      setTimeout(() => {
        // Remove Dice
        setCurrentDice(null);
      }, config.diceOnScreenTimeoutInMS);

      setTimeout(() => {
        this.next();
      }, config.diceOnScreenTimeoutInMS + config.timeBetweenDicesInMS);
    }

    socket.emit('room:join', `dice_character_${character.id}`);

    socket.on('dice_roll', data => {
      data.rolls.forEach(roll => {
        queue.add(showDiceOnScreen.bind(queue, roll));
      });
    });
  }, [character, queue, config]);

  if (!character) {
    return <div>Personagem não existe!</div>;
  }

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  fontFamily: 'Fruktur',
  userSelect: 'none',
}));

const DiceContainer = styled('div')(({ theme }) => ({
  position: 'relative',
}));

const DiceResult = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '180px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
}));

const DiceNumber = styled('span')(({ theme }) => ({
  zIndex: 2,
  fontSize: '150px',
  textShadow: '0 0 10px #FFFFFF',
}));

export default Dice;

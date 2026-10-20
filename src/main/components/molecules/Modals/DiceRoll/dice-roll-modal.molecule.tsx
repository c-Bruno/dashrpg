import { useEffect, useMemo, useRef, useState } from 'react';

import { Grid } from '@mui/material';
import { rollDiceHelper } from 'common/helpers';
import { RollDiceResult } from 'common/helpers/roll-dice.helper';
import { useAudio } from 'common/hooks';
import { socket } from 'common/libs';
import { Dice } from 'main/components/atoms';
import { ModalTemplate } from 'main/components/templates';

import * as S from './dice-roll-modal.styles';

interface DiceRollModalProps {
  amount: string;
  attribute?: string;
  attributeValue?: number;
  /** Quando informado, o resultado da rolagem é emitido via socket para
   *  que o mestre e demais jogadores possam acompanhar em tempo real. */
  character?: { id: number; name: string } | null;
  handleClose: () => void;
}

const DiceRollModal = ({ amount, attribute, attributeValue, character, handleClose }: DiceRollModalProps) => {
  const [showGrids, setShowGrids] = useState(false);
  const [stopRotation, setStopRotation] = useState(false);
  const { play } = useAudio('/sounds/DiceRollingOnTable.mp3');
  const hasEmitted = useRef(false);

  // Calcula o resultado uma única vez, antes de qualquer efeito colateral
  const diceResult = useMemo<RollDiceResult>(
    () => rollDiceHelper.rollDamage(amount, attributeValue),
    [amount, attributeValue],
  );

  useEffect(() => {
    play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Emite o resultado via socket uma única vez
    if (character && !hasEmitted.current) {
      hasEmitted.current = true;

      socket.emit('dice_roll', {
        character_id: character.id,
        character_name: character.name,
        attribute: attribute ?? null,
        roll: { number: diceResult.number, description: diceResult.description ?? null, color: diceResult.color },
      });
    }

    const timer = setTimeout(() => {
      setStopRotation(true);
      setShowGrids(true);
    }, 1000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ModalTemplate onClose={handleClose} maxWidth='xl'>
      <Grid container>
        <Grid container spacing={0} size={12} sx={{ justifyContent: 'center', alignItems: 'center' }}>
          <Dice width={50} height={50} stopRotation={stopRotation} />
        </Grid>

        {showGrids && (
          <S.ResultBox>
            <S.CenteredChip label={diceResult.number} color={diceResult.color} size='medium' variant='outlined' />
            {attribute && <S.CenteredChip label={diceResult.description} color={diceResult.color} size='medium' />}
          </S.ResultBox>
        )}
      </Grid>
    </ModalTemplate>
  );
};

export default DiceRollModal;

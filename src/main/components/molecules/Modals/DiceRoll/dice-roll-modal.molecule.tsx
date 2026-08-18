import { useEffect, useState } from 'react';

import { Grid } from '@mui/material';
import { rollDiceHelper } from 'common/helpers';
import { RollDiceResult } from 'common/helpers/roll-dice.helper';
import { useAudio } from 'common/hooks';
import { CenteredBox, Dice } from 'main/components/atoms';
import { ModalTemplate } from 'main/components/templates';

import * as S from './dice-roll-modal.styles';

interface DiceRollModalProps {
  amount: string;
  attribute?: string;
  attributeValue?: number;
  handleClose: () => void;
}

const DiceRollModal = ({ amount, attribute, attributeValue, handleClose }: DiceRollModalProps) => {
  const [showGrids, setShowGrids] = useState(false);
  const [stopRotation, setStopRotation] = useState(false);
  const { play } = useAudio('/sounds/DiceRollingOnTable.mp3');

  const [diceResult, setDiceResult] = useState<RollDiceResult>({ number: '', description: '', color: 'primary' });

  useEffect(() => {
    play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setDiceResult(rollDiceHelper.rollDamage(amount, attributeValue));

    const timer = setTimeout(() => {
      setStopRotation(true);
      setShowGrids(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ModalTemplate onClose={handleClose} maxWidth='xl'>
      <Grid container>
        <Grid container spacing={0} size={12} sx={{ justifyContent: 'center', alignItems: 'center' }}>
          <Dice width={50} height={50} stopRotation={stopRotation} />
        </Grid>

        {showGrids && (
          <S.ResultBox>
            <CenteredBox label={diceResult.number} color={diceResult.color} />
            {attribute && <CenteredBox label={diceResult.description} color={diceResult.color} variant='filled' />}
          </S.ResultBox>
        )}
      </Grid>
    </ModalTemplate>
  );
};

export default DiceRollModal;

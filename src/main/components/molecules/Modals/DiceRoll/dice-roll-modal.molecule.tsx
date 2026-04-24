import { useEffect, useState } from 'react';

import { Box, Grid } from '@mui/material';
import { rollDiceHelper } from 'common/helpers';
import { useAudio } from 'common/hooks';
import { ModalTemplate } from 'main/components/templates';

import * as S from './dice-roll-modal.styles';

type RollDiceResult = {
  number: string;
  description?: string;
  color: 'primary' | 'error' | 'success';
};

interface DiceRollModalProps {
  amount: string;
  atribute?: any;
  handleClose: () => void;
}

const DiceRollModal = ({ amount, atribute, handleClose }: DiceRollModalProps) => {
  const [showGrids, setShowGrids] = useState(false); // Hook para carregar os grids apenas após a rolagem dos dados
  const [stopRotation, setStopRotation] = useState(false); // Hook para definir a rotação do dado em tela
  const { play } = useAudio('/sounds/DiceRollingOnTable.mp3');

  const [rollDiceResult, setRollDiceResult] = useState<RollDiceResult>({
    number: '',
    description: '',
    color: 'primary',
  });

  useEffect(() => {
    play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setRollDiceResult(rollDiceHelper.rollDamage(amount));

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
          {/* Dado na tela */}
          <S.RotatingDiceImage
            width={40}
            height={40}
            alt='Dice roll'
            src={'/assets/dice.png'}
            stopRotation={stopRotation}
          />
        </Grid>

        {/* Valor/numero retornado na rolagem */}
        {showGrids && (
          <>
            <Grid size={12}>
              <Box
                sx={{
                  width: 500,
                  maxWidth: '100%',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginTop: '1%',
                }}>
                <S.CenteredChip
                  label={rollDiceResult.number}
                  color={rollDiceResult.color}
                  size='medium'
                  style={{ width: '20%' }}
                  variant='outlined'
                />
              </Box>
            </Grid>

            {/* Tipo de resultado obtido */}
            {atribute ? (
              <Grid size={12}>
                <Box
                  sx={{
                    width: 500,
                    maxWidth: '100%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: '0.5%',
                  }}>
                  {rollDiceResult.description && (
                    <S.CenteredChip
                      label={rollDiceResult.description}
                      color={rollDiceResult.color}
                      size='medium'
                      style={{ width: '50%' }}
                    />
                  )}
                </Box>
              </Grid>
            ) : (
              atribute
            )}
          </>
        )}
      </Grid>
    </ModalTemplate>
  );
};

export default DiceRollModal;

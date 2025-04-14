import React, { useState, useEffect } from 'react';

import { Box, Button, Dialog, DialogActions, DialogContent, Grid } from '@mui/material';
import { rollDiceHelper } from 'common/helpers';
import useSound from 'use-sound';

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

const DiceRollModal: React.FC<DiceRollModalProps> = ({ amount, atribute, handleClose }) => {
  const [showGrids, setShowGrids] = useState(false); // Hook para carregar os grids apenas após a rolagem dos dados
  const [stopRotation, setStopRotation] = useState(false); // Hook para definir a rotação do dado em tela
  const [play] = useSound('/sounds/DiceRollingOnTable.mp3');

  const [rollDiceResult, setRollDiceResult] = useState<RollDiceResult>({
    number: '',
    description: '',
    color: 'primary',
  });

  // Hook para iniciar o audio da rolagem
  useEffect(() => {
    play();
  }, [play]);

  useEffect(() => {
    setRollDiceResult(rollDiceHelper.rollDamage(amount));

    const timer = setTimeout(() => {
      setStopRotation(true);
      setShowGrids(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog open={true} onClose={handleClose} fullWidth maxWidth='xl'>
      <DialogContent>
        {
          <Grid container>
            <Grid item xs={12} container spacing={0} alignItems='center' justifyContent='center'>
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
                <Grid item xs={12}>
                  <Box
                    sx={{
                      width: 500,
                      maxWidth: '100%',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      marginTop: '1%',
                    }}
                  >
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
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        width: 500,
                        maxWidth: '100%',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: '0.5%',
                      }}
                    >
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
        }
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color='secondary'>
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DiceRollModal;

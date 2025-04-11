import React, { useState, useEffect } from 'react';

import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  keyframes,
  styled,
} from '@mui/material';
import Image from 'next/image';
import useSound from 'use-sound';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const StyledChip = styled(Chip)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 'auto',
  marginRight: 'auto',
  fontSize: 'medium',
}));

const StyledDice = styled(Image)(({ stopRotation }) => ({
  animation: stopRotation ? 'none' : `${rotate} 1s linear infinite`,
}));

function DiceRollModal({
  amount,
  atribute,
  handleClose,
  valueAtribute,
  skillAttibute,
  avaliableSkills,
}) {
  const [showGrids, setShowGrids] = useState(false); // Hook para carregar os grids apenas após a rolagem dos dados
  const [stopRotation, setStopRotation] = useState(false); // Hook para definir a rotação do dado em tela
  const [isAudioPlaying, setIsAudioPlaying] = useState(false); // Hook para acionar o audio da rolagem
  const [play] = useSound('/sounds/DiceRollingOnTable.mp3');

  const [diceNumber, setDiceNumber] = useState({ number: '' });
  const [diceTypeResult, setDiceTypeResult] = useState({ description: '' });
  const [diceResultColor, setDiceResultColor] = useState({ color: 'primary' });

  // Hook para iniciar o audio da rolagem
  useEffect(() => {
    play();
  }, [play]);

  useEffect(() => {
    rollDamage(amount);

    const timer = setTimeout(() => {
      setStopRotation(true);
      setShowGrids(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setIsAudioPlaying(true);
  }, []);

  function rollDamage(amountDamage) {
    const diceRandomNumber = rollDice(amountDamage);
    setDiceNumber({ number: diceRandomNumber });

    if (atribute) {
      const diceType = calcDice(atribute, valueAtribute, diceRandomNumber);
      setDiceTypeResult({ description: diceType });

      // Define qual vai ser a cor do component Chip exibido
      if (diceType == 'Sucesso extremo') {
        setDiceResultColor({ color: 'success' });
      } else if (diceType == 'Fracasso extremo') {
        setDiceResultColor({ color: 'error' });
      } else {
        setDiceResultColor({ color: 'primary' });
      }
    }
  }

  // Rolador de dados
  function rollDice(dice) {
    let dices = dice.split('+');
    let amountFromDice = 0;

    dices.map(item => {
      const diceTrimmed = item.trim();
      let [count, max] = diceTrimmed.split('d'); // Separar a quantidade de dados, para o valor do dado

      if (Number(count) && Number(max)) {
        count = Number(count); // Verifica quantas vezes vai rolar o dado
        max = Number(max); // Verifica qual o tipo de dado

        let total = 0;
        for (let i = 0; i < count; i++) {
          total += Math.floor(Math.random() * max + 1); // Sorteia um numero entre 1 e o valor do atributo
        }

        amountFromDice += total;
      } else {
        amountFromDice += 0;
      }
    });

    return amountFromDice;
  }

  // Calcula qual o tipo do resultado do dado (Extremo, Bom, Normal, Fracasso)
  function calcDice(atribute, ability, dice) {
    let valueSkill;
    ability = Number(ability);

    if (skillAttibute) {
      avaliableSkills.forEach(element => {
        if (element.skill_id == skillAttibute) {
          valueSkill = element.value;
        }
      });
    }

    // Se tiver encontrado a skill na lista de skills, soma o seu valor ao resultado atual do dado
    Number(valueSkill) ? (ability += Number(valueSkill)) : (ability += 0);

    if (dice === 20) return 'Sucesso extremo'; // 20 NATURAL retorna Extremo
    else if (dice === 1) return 'Fracasso extremo'; // Dado 1 NATURAL retorna Fracasso Extremo
    else return;
  }

  return (
    <Dialog open={true} onClose={handleClose} fullWidth maxWidth='100vh'>
      <DialogContent>
        {
          <Grid container>
            <Grid item xs={12} container spacing={0} alignItems='center' justifyContent='center'>
              {/* Dado na tela */}
              <StyledDice
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
                    <StyledChip
                      label={diceNumber.number}
                      color={diceResultColor.color}
                      size='medium'
                      style={{ width: '20%' }}
                      variant='outlined'
                    />
                  </Box>
                </Grid>

                {/* Tipo de resultado obtido */}
                {(atribute) ? (
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
                      {diceTypeResult.description &&
                        <StyledChip
                          label={diceTypeResult.description}
                          color={diceResultColor.color}
                          size='medium'
                          style={{ width: '50%' }}
                        />
                      } 
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
}

export default DiceRollModal;

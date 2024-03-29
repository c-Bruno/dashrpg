import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import ReactSound from "react-sound";

const styles = (theme) => ({
  dice: {
    animation: "$rotate 1s linear infinite",
  },

  noRotate: {
    animation: "none !important",
  },

  "@keyframes rotate": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },

  formarChip: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: "medium",
  },
});

function DiceRollModal({
  amount,
  classes,
  atribute,
  handleClose,
  valueAtribute,
  skillAttibute,
  avaliableSkills,
}) {
  const [showGrids, setShowGrids] = useState(false); // Hook para carregar os grids apenas após a rolagem dos dados
  const [stopRotation, setStopRotation] = useState(false); // Hook para definir a rotação do dado em tela
  const [isAudioPlaying, setIsAudioPlaying] = useState(false); // Hook para acionar o audio da rolagem

  const [diceNumber, setDiceNumber] = useState({ number: "" });
  const [diceTypeResult, setDiceTypeResult] = useState({ description: "" });
  const [diceResultColor, setDiceResultColor] = useState({ color: "primary" });

  // Desativar os logs de debug do SoundManager2
  soundManager.setup({ debugMode: false });

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
      if (diceType == "Extremo") {
        setDiceResultColor({ color: "success" });
      } else if (diceType == "Sucesso Bom" || diceType == "Sucesso Normal") {
        setDiceResultColor({ color: "primary" });
      } else {
        setDiceResultColor({ color: "error" });
      }
    }
  }

  // Rolador de dados
  function rollDice(dice) {
    let dices = dice.split("+");
    let amountFromDice = 0;

    dices.map((item) => {
      const diceTrimmed = item.trim();
      let [count, max] = diceTrimmed.split("d"); // Separar a quantidade de dados, para o valor do dado

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
      avaliableSkills.forEach((element) => {
        if (element.skill_id == skillAttibute) {
          valueSkill = element.value;
        }
      });
    }

    // Se tiver encontrado a skill na lista de skills, soma o seu valor ao resultado atual do dado
    Number(valueSkill) ? (ability += Number(valueSkill)) : (ability += 0);

    // Constante contendo todas as variações com base no ATRIBUTO + PERICIA
    const table = [
      /*0*/ { extremeFail: 10, normal: 20 }, // Atributos com valor = 1
      /*1*/ { extremeFail: 10, normal: 19, good: 20 }, // Atributos com valor = 2
      /*2*/ { extremeFail: 10, normal: 18, good: 20 }, // Atributos com valor = 3
      /*3*/ { extremeFail: 10, normal: 17, good: 19 }, // Atributos com valor = 4
      /*4*/ { extremeFail: 10, normal: 16, good: 19, extreme: 20 }, // Atributos com valor = 5
      /*5*/ { extremeFail: 10, normal: 15, good: 19, extreme: 20 }, // Atributos com valor = 6
      /*6*/ { extremeFail: 8, normal: 14, good: 18, extreme: 20 }, // Atributos com valor = 7
      /*7*/ { extremeFail: 8, normal: 13, good: 18, extreme: 20 }, // Atributos com valor = 8
      /*8*/ { extremeFail: 6, normal: 12, good: 17, extreme: 20 }, // Atributos com valor = 9
      /*9*/ { extremeFail: 6, normal: 11, good: 17, extreme: 20 }, // Atributos com valor = 10
      /*10*/ { extremeFail: 4, normal: 10, good: 16, extreme: 20 }, // Atributos com valor = 11
      /*11*/ { extremeFail: 4, normal: 9, good: 16, extreme: 19 }, // Atributos com valor = 12
      /*12*/ { extremeFail: 3, normal: 8, good: 16, extreme: 19 }, // Atributos com valor = 13
      /*13*/ { extremeFail: 3, normal: 7, good: 15, extreme: 19 }, // Atributos com valor = 14
      /*14*/ { extremeFail: 3, normal: 6, good: 14, extreme: 19 }, // Atributos com valor = 15
      /*15*/ { extremeFail: 2, normal: 5, good: 14, extreme: 18 }, // Atributos com valor = 16
      /*16*/ { extremeFail: 2, normal: 5, good: 14, extreme: 18 }, // Atributos com valor = 17
      /*17*/ { extremeFail: 2, normal: 5, good: 13, extreme: 18 }, // Atributos com valor = 18
      /*18*/ { extremeFail: 2, normal: 5, good: 12, extreme: 18 }, // Atributos com valor = 19
      /*19*/ { extremeFail: 2, normal: 5, good: 12, extreme: 18 }, // Atributos com valor = 20
      /*20*/ { extremeFail: 2, normal: 5, good: 11, extreme: 17 }, // Atributos com valor iguais ou superiores a 21
    ];

    const type = ability <= 20 ? table[ability - 1] : table[20]; // Verificar a faixa de valor que vai ser utilizada
    if (dice >= type.extreme) return "Extremo";
    else if (dice >= type.good) return "Sucesso Bom";
    else if (dice >= type.normal) return "Sucesso Normal";
    else if (dice >= type.extremeFail) return "Fracasso";
    else if (dice < type.extremeFail) return "Fracasso extremo";
  }

  return (
    <Dialog open={true} onClose={handleClose} fullWidth maxWidth="100vh">
      <DialogContent>
        {
          <Grid container>
            <ReactSound
              url={`/sounds/DiceRollingOnTable.mp3`}
              playStatus={ReactSound.status.PLAYING}
            />
            <Grid
              item
              xs={12}
              container
              spacing={0}
              alignItems="center"
              justifyContent="center"
            >
              {/* Dado na tela */}
              <Image
                className={`${classes.dice} ${
                  stopRotation ? classes.noRotate : ""
                }`}
                src={"/assets/dice.png"}
                alt="Dice roll"
                width={40}
                height={40}
              />
            </Grid>

            {/* Valor/numero retornado na rolagem */}
            {showGrids && (
              <>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      width: 500,
                      maxWidth: "100%",
                      marginLeft: "auto",
                      marginRight: "auto",
                      marginTop: "1%",
                    }}
                  >
                    <Chip
                      label={diceNumber.number}
                      className={classes.formarChip}
                      color={diceResultColor.color}
                      size="medium"
                      style={{ width: "20%" }}
                      variant="outlined"
                    />
                  </Box>
                </Grid>

                {/* Tipo de resultado obtido */}
                {atribute ? (
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        width: 500,
                        maxWidth: "100%",
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: "0.5%",
                      }}
                    >
                      <Chip
                        label={diceTypeResult.description}
                        className={classes.formarChip}
                        color={diceResultColor.color}
                        size="medium"
                        style={{ width: "50%" }}
                      />
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
        <Button onClick={handleClose} color="secondary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withStyles(styles)(DiceRollModal);

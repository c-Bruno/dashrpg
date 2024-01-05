import React, { useEffect, useState } from "react";

import { withStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import { StatusBar, Section } from "..";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Image from "next/image";

const CharacterOverview = ({
  classes,
  character,
  diceRollModal,
  hitPointsModal,
  sanityPointsModal,
  changePictureModal,
}) => {
  // Encontra no banco a imagem atual
  const getCharacterPictureURL = () => {
    if (!character) {
      return null;
    }

    if (
      character.standard_character_picture_url &&
      character.injured_character_picture_url
    ) {
      if (character.current_hit_points > character.max_hit_points / 2) {
        return character.standard_character_picture_url;
      } else {
        return character.injured_character_picture_url;
      }
    } else {
      return `/assets/character.png`;
    }
  };

  return (
    <Grid item xs={12} md={4}>
      <Section>
        <Grid container item spacing={3} className={classes.alignCenter}>
          {/* Imagem do personagem */}
          <Grid item xs={6} className={classes.alignCenter}>
            <Image
              src={getCharacterPictureURL()}
              alt="Imagem de jogador"
              className={classes.characterImage}
              width={122}
              height={122}
              onClick={() => changePictureModal.appear()}
            />
          </Grid>

          {/* Vida do personagem*/}
          <Grid item xs={12} className={classes.alignCenter}>
            <Grid container item xs={12} className={classes.bar}>
              <Grid item xs={12} className={classes.barTitle}>
                <span>Vida</span>
              </Grid>
              <Grid item xs={12}>
                <StatusBar
                  current={character.current_hit_points} // Vida Atual
                  max={character.max_hit_points} // Vida Total
                  label={`${character.current_hit_points}/${character.max_hit_points}`} // Valor exibido em tela
                  primaryColor="#640101"
                  secondaryColor="#1b1517"
                  onClick={() => {
                    hitPointsModal.appear();
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Sanidade do personagem*/}
          <Grid item xs={12} className={classes.alignCenter}>
            <Grid container item xs={12} className={classes.bar}>
              <Grid item xs={12} className={classes.barTitle}>
                <span>Sanidade</span>
              </Grid>
              <Grid item xs={12}>
                <StatusBar
                  current={character.current_sanity_points} // Sanidade Atual
                  max={character.max_sanity_points} // Sanidade Total
                  label={`${character.current_sanity_points}/${character.max_sanity_points}`} // Valor exibido em tela
                  primaryColor="#011B64"
                  secondaryColor="#1b1517"
                  onClick={() => {
                    sanityPointsModal.appear();
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} className={classes.alignCenter}>
            <FormControlLabel
              control={<Switch color="secondary" />}
              label="Traumatizado"
            />
            <FormControlLabel
              control={<Switch color="secondary" />}
              label="Morrendo"
            />
          </Grid>

          {/* Dado para rolagem d100 */}
          <Grid item xs={6} className={classes.alignCenter}>
            <Image
              width={80}
              height={80}
              alt="Dice roll"
              src={"/assets/dice.png"}
              className={classes.dice}
              onClick={() => diceRollModal.appear()}
            />
          </Grid>
        </Grid>
      </Section>
    </Grid>
  );
};

const styles = (theme) => ({
  characterImage: {
    width: "200px",
    borderRadius: "50%",
    cursor: "pointer",
  },

  alignCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  bar: {
    marginBottom: "2px",
  },

  barTitle: {
    marginBottom: "2px",
    color: theme.palette.secondary.main,
    fontSize: "15px",
    fontWeight: "bold",
  },

  dice: {
    cursor: "pointer",
    transition: "-webkit-transform .8s ease-in-out",
    transform: "transform .8s ease-in-out",

    "&:hover": {
      transition: "rotate(360deg)",
      transform: "rotate(360deg)",
    },
  },
});

export default withStyles(styles)(CharacterOverview);

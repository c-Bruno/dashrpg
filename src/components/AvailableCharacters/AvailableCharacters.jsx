import { Grid } from "@mui/material";
import React from "react";
import { AddBox, CharacterBox, Section } from "..";
import { CreateCharacterModal } from "../modals";
import useModal from "../../hooks/useModal.hook";
import { useRouter } from "next/router";

const AvailableCharacters = ({ characters, refreshData, confirmationModal }) => {
  const createCharacterModal = useModal(({ close }) => (
    <CreateCharacterModal
      handleClose={close}
      onCharacterCreated={() => {
        refreshData;
      }}
    />
  ));

  return (
    <Section title="Fichas de personagens      " image="/assets/characters.png">
      <Grid item container xs={12} spacing={3}>
        {characters.map((character, index) => (
          <Grid item xs={12} md={4} key={index}>
            <CharacterBox
              character={character}
              deleteCharacter={() =>
                confirmationModal.appear({
                  title: "Apagar personagem",
                  text: "Deseja apagar este personagem?",
                  data: { id: character.id, type: "character" },
                })
              }
            />
          </Grid>
        ))}
        <Grid item xs={12} md={4}>
          <AddBox onClick={() => createCharacterModal.appear()} />
        </Grid>
      </Grid>
    </Section>
  );
};

export default AvailableCharacters;

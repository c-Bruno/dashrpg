import React, { useEffect, useState } from "react";

import { withStyles } from "@mui/styles";
import { Button, Grid, TextField, Tooltip } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { EditableRow, Section, TableBox } from "../../components";

const Combat = ({ character, setCharacter, combatModal }) => {
  return (
    <Section
      title="Combate   "
      image="/assets/slash.png"
      renderButton={() => (
        <Tooltip title="Criar item">
          <Button
            variant="outlined"
            style={{
              display: "flex",
              alignSelf: "center",
            }}
            onClick={() =>
              combatModal.appear({
                operation: "create",
                character: character.id,
              })
            }
          >
            <AddIcon />
          </Button>
        </Tooltip>
      )}
    >
      <TableBox
        character={character}
        handleCharacter={(newCharacter) => {
          setCharacter(newCharacter);
        }}
      />
    </Section>
  );
};

export default Combat;

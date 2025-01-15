import React, { useEffect, useState } from "react";

import { Button, Grid, TextField } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { EditableRow, Section } from "../../components";
import { api } from "../../utils";

const SpecialItem = ({ character }) => {
  // Atualiza o valor do item especial ao digitar
  const updateCharacterSpecialItem = (value) => {
    var temporiza;
    clearTimeout(temporiza);
    // Temporizador para que o usuario só seja salvo após 3 segundos sem digitar nada no campo
    temporiza = setTimeout(function () {
      api
        .put(`/character/${character.id}`, { specialItem: value.target.value })
        .then(() => {})
        .catch(() => {
          toast.error(`Erro ao atualizar o item especial!`);
        });
    }, 5000);
  };

  return (
    <Section title="Item especial   " image="/assets/specialItem.png">
      <Grid item xs={12}>
        <TextField
          variant="standard"
          multiline
          rows={6}
          name="specialItem"
          fullWidth
          defaultValue={character.specialItem}
          onKeyUp={(newValue) => {
            updateCharacterSpecialItem(newValue);
          }}
        />
      </Grid>
    </Section>
  );
};

export default SpecialItem;

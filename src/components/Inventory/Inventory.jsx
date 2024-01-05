import React, { useEffect, useState } from "react";

import { withStyles } from "@mui/styles";
import { Button, Grid, TextField } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { EditableRow, Section } from "../../components";

const Inventory = ({
  classes,
  character,
  inventoryModal,
  confirmationModal,
}) => {
  const calcSpaceInventory = () => {
    var totalSpace = 10; // Inicia com 10 espaços no inventario
    var ocupedSpaces = 0; // Inicializa espaços ocupados com 0

    if (!character) {
      return null;
    } else if (character.skills) {
      character.skills.map(function (item, i) {
        // Checar a carga maxima disponivel para o inventario
        if (
          item.skill.name.toUpperCase().match("FORÇA") ||
          item.skill.name.toUpperCase().match("FORCA")
        ) {
          totalSpace += Number(item.value) * 2; // Para cada ponto de força, o personagem ganha mais 2 espaços no invetario
        }
      });

      character.inventory.map(function (item, i) {
        // Verifica quanto já esta ocupado
        ocupedSpaces += Number(item.inventory.weight);
      });

      return totalSpace - ocupedSpaces;
    }
  };

  return (
    <Section
      title="Inventário   "
      image="/assets/Inventory.png"
      renderButton={() => (
        <Button
          variant="outlined"
          style={{
            display: "flex",
            alignSelf: "center",
          }}
          // Botão para criar novo item
          onClick={() =>
            inventoryModal.appear({
              operation: "create",
              character: character.id,
              space: calcSpaceInventory(),
            })
          }
        >
          <AddIcon />
        </Button>
      )}
    >
      {/* Cabeçalho das informações de inventario */}
      <Grid
        container
        style={{
          paddingBottom: "16px",
        }}
      >
        {/* Item */}
        <Grid item md={6} xs={12}>
          <TextField disabled label="ITEM" variant="standard" fullWidth />
        </Grid>

        {/* Espaço ocupado */}
        <Grid item md={3} xs={12}>
          <TextField disabled label="ESPAÇOS" variant="standard" fullWidth />
        </Grid>

        {/* Livre */}
        <Grid item md={3} xs={12}>
          <TextField
            disabled
            label={`(${calcSpaceInventory()} LIVRE)`}
            variant="standard"
            fullWidth
          />
        </Grid>
      </Grid>

      {/* Mapeia cada item disponivel para este personagem */}
      <Grid
        item
        container
        xs={12}
        spacing={2}
        className={classes.scrollableBox}
      >
        {character.inventory.map((inventory, index) => (
          <Grid item xs={12} key={index}>
            <EditableRow
              data={inventory}
              // Atualizar informação do item do inventario
              editRow={(data) => {
                inventoryModal.appear({
                  operation: "edit",
                  data,
                  space: calcSpaceInventory(),
                });
              }}
              // Deletar item do inventario
              deleteRow={(data) => {
                console.log(data)
                confirmationModal.appear({
                  title: "Apagar item do inventário",
                  text: "Deseja apagar este item?",
                  data: { id: data.inventory_id, type: "inventory" },
                });
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Section>
  );
};

const styles = (theme) => ({
  scrollableBox: {
    overflow: "auto",
    maxHeight: "300px",
    paddingRight: "10px",
    paddingLeft: "20%",
  },
});

export default withStyles(styles)(Inventory);

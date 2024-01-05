import React, { useEffect, useState } from "react";

import { withStyles } from "@mui/styles";
import { Button, Grid } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { EditableRow, Section } from "../../components";

const AttributesList = ({
  classes,
  attributes,
  attributeModal,
  confirmationModal,
}) => {
  return (
    <Section
      title="Atributos   "
      image="/assets/atributes.png"
      renderButton={() => (
        <Button
          variant="outlined"
          style={{
            display: "flex",
            alignSelf: "center",
          }}
          onClick={() => attributeModal.appear({ operation: "create" })}
        >
          <AddIcon />
        </Button>
      )}
    >
      <Grid
        item
        container
        xs={12}
        spacing={2}
        className={classes.scrollableBox}
      >
        {/* Para cada atributo existente, exiba as informações */}
        {attributes.map((attribute, index) => (
          <Grid item xs={12} key={index}>
            <EditableRow
              data={attribute}
              editRow={(data) => {
                attributeModal.appear({ operation: "edit", data });
              }}
              deleteRow={(data) => {
                confirmationModal.appear({
                  title: "Apagar atributo",
                  text: "Deseja apagar este atributo?",
                  data: { id: data.id, type: "attribute" },
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

export default withStyles(styles)(AttributesList);

import React, { useEffect, useState } from "react";

import { withStyles } from "@mui/styles";
import { Button, Grid } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { EditableRow, Section } from "../../components";

const SkillsList = ({classes, skills, skillModal, confirmationModal}) => {
  return (
    <Section
      title="Perícias   "
      image="/assets/expertise.png"
      renderButton={() => (
        <Button
          variant="outlined"
          style={{
            display: "flex",
            alignSelf: "center",
          }}
          onClick={() => skillModal.appear({ operation: "create" })}
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
        {skills.map((skill, index) => (
          <Grid item xs={12} key={index}>
            <EditableRow
              data={skill}
              editRow={(data) => {
                skillModal.appear({ operation: "edit", data });
              }}
              deleteRow={(data) => {
                confirmationModal.appear({
                  title: "Apagar perícia",
                  text: "Deseja apagar esta perícia?",
                  data: { id: data.id, type: "skill" },
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

export default withStyles(styles)(SkillsList);

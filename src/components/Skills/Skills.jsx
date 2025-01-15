import React, { useEffect, useState } from "react";

import { Button, Grid } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { EditableRow, Section, SheetEditableRow } from "../../components";
import { api } from "../../utils";

const Skills = ({ character, setCharacter }) => {
  // Atualiza o valor da pericia ao digitar
  const updateCharacterSkillValue = (skill, value) => {
    const index = character.skills.findIndex(
      (s) => s.skill_id === skill.skill_id
    );
    const newArray = character.skills;

    newArray[index] = {
      ...skill,
      value,
    };

    setCharacter((prevState) => ({
      ...prevState,
      skills: newArray,
    }));
  };

  return (
    <Section title="Perícias   " image="/assets/expertise.png">
      <Grid
        container
        item
        xs={12}
        spacing={3}
        style={{
          display: "flex",
          flexFlow: "row wap",
          justifyContent: "center",
        }}
      >
        {character.skills.map((each, index) => (
          <Grid item xs={2} key={index}>
            <SheetEditableRow
              image="/assets/expertiseRoll.png"
              data={{
                name: each.skill.name,
                value: each.value,
                description: each.skill.description,
              }}
              onValueChange={(newValue) => {
                api
                  .put("/character/skill", {
                    character_id: character.id,
                    skill_id: each.skill.id,
                    value: newValue,
                  })
                  .catch((err) => {
                    toast.error(
                      `Erro ao atualizar o valor! Erro: ${err.toString()}`
                    );
                  });
              }}
              onInput={(newValue) => {
                updateCharacterSkillValue(each, newValue);
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Section>
  );
};

export default Skills;

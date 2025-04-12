import React from "react";

import { Grid } from "@mui/material";
import { api } from "../../utils";
import { RollableAttribute, Section } from "main/components/molecules";

const Attributes = ({ character, setCharacter }) => {
  // Atualiza o valor do atributo ao digitar
  const updateCharacterAttributeValue = (attribute, value) => {
    const index = character.attributes.findIndex(
      (a) => a.attribute_id === attribute.attribute_id
    );
    const newArray = character.attributes;

    newArray[index] = {
      ...attribute,
      value,
    };

    setCharacter((prevState) => ({
      ...prevState,
      attributes: newArray,
    }));
  };

  return (
    <Section title="Atributos   " image="/assets/atributes.png">
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
        {character.attributes.map((each, index) => (
          <Grid item xs={2} key={index}>
            <RollableAttribute
              avaliableSkills={character.skills}
              image="/assets/dice.png"
              data={{
                name: each.attribute.name,
                value: each.value,
                description: each.attribute.description,
                skill_id: each.attribute.skill_id,
              }}
              onValueChange={(newValue) => {
                api
                  .put("/character/attribute", {
                    character_id: character.id,
                    attribute_id: each.attribute.id,
                    value: newValue,
                  })
                  .catch((err) => {
                    toast.error(
                      `Erro ao atualizar o valor! Erro: ${err.toString()}`
                    );
                  });
              }}
              onInput={(newValue) => {
                updateCharacterAttributeValue(each, newValue);
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Section>
  );
};

export default Attributes;

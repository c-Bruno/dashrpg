import React from 'react';
import { toast } from 'react-toastify';

import { Grid } from '@mui/material';
import { api } from 'common/libs';
import { RollableAttribute } from 'main/components/molecules';

const AttributeStatusItem: React.FC<any> = ({ character, setCharacter }) => {
  const updateCharacterAttributeValue = (attribute, value) => {
    const index = character.attributes.findIndex((a) => a.attribute_id === attribute.attribute_id);
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
    <Grid container spacing={2} justifyContent='center'>
      {character.attributes.map((item, index) => (
        <Grid item xs={2} key={index}>
          <RollableAttribute
            image='/assets/dice.png'
            data={{
              name: item.attribute.name,
              value: item.value,
              description: item.attribute.description,
              skill_id: item.attribute.skill_id,
            }}
            onValueChange={(newValue) => {
              api
                .put('/character/attribute', {
                  character_id: character.id,
                  attribute_id: item.attribute.id,
                  value: newValue,
                })
                .catch((err) => {
                  toast.error(`Erro ao atualizar o valor! Erro: ${err.toString()}`);
                });
            }}
            onInput={(newValue) => {
              updateCharacterAttributeValue(item, newValue);
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default AttributeStatusItem;

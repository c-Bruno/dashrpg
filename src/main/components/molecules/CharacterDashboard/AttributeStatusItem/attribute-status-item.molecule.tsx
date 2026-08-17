import { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';

import { Grid } from '@mui/material';
import { useFetchMutation } from 'common/hooks';
import { api } from 'common/libs';
import { Character } from 'common/types';
import { RollableAttribute } from 'main/components/molecules';

type UpdateAttributeParams = {
  character_id: number;
  attribute_id: number;
  value: string;
};

type AttributeStatusItemProps = {
  character: Character;
  setCharacter: Dispatch<SetStateAction<Character | null>>;
};

const AttributeStatusItem = ({ character, setCharacter }: AttributeStatusItemProps) => {
  const { trigger } = useFetchMutation((params: UpdateAttributeParams) => api.put('/character/attribute', params), {
    onError: () => toast.error('Erro ao atualizar o atributo!'),
  });

  const updateLocalAttribute = (attributeId: number, value: string) => {
    setCharacter((prev) =>
      prev
        ? {
            ...prev,
            attributes: prev.attributes?.map((attr) => (attr.attribute_id === attributeId ? { ...attr, value } : attr)),
          }
        : prev,
    );
  };

  return (
    <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
      {character.attributes?.map((item) => (
        <Grid key={item.attribute_id} size={2}>
          <RollableAttribute
            data={{
              name: item.attribute.name,
              value: item.value,
              description: item.attribute.description,
              skill_id: item.attribute.skill_id,
            }}
            onValueChange={(newValue) =>
              trigger({ character_id: character.id!, attribute_id: item.attribute.id, value: newValue })
            }
            onInput={(newValue) => updateLocalAttribute(item.attribute_id, newValue)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default AttributeStatusItem;

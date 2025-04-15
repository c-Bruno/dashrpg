import React from 'react';
import { toast } from 'react-toastify';

import { Grid } from '@mui/material';
import { api } from 'common/libs';
import { AttributeStatusItem, RollableAttribute, Section } from 'main/components/molecules';

interface AttributeStatusListProps {
  character: {
    attributes: any[];
    id: string;
    [key: string]: any;
  };
  setCharacter: (updateFn: (prev: any) => any) => void;
}

const AttributeStatusList: React.FC<AttributeStatusListProps> = ({ character, setCharacter }) => {
  return (
    <Section title='Atributos   ' image='/assets/atributes.png'>
      <Grid
        container
        item
        xs={12}
        spacing={3}
        style={{
          display: 'flex',
          flexFlow: 'row wap',
          justifyContent: 'center',
        }}
      >
        <AttributeStatusItem character={character} setCharacter={setCharacter} />
      </Grid>
    </Section>
  );
};

export default AttributeStatusList;

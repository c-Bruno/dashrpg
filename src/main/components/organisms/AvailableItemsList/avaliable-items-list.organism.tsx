import React from 'react';

import { Add as AddIcon } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import { EditableDataRow, Section } from 'main/components/molecules';

import * as S from './available-items-list.styles';

interface AvailableItemsListProps {
  title: string;
  image: string;
  type: string;
  items: any;
  itemModal: any;
  confirmationModal: any;
}

const AvailableItemsList: React.FC<AvailableItemsListProps> = ({
  title,
  image,
  type,
  items,
  itemModal,
  confirmationModal,
}) => {
  return (
    <Section
      title={title}
      image={image}
      renderButton={() => (
        <Button
          variant='outlined'
          style={{
            display: 'flex',
            alignSelf: 'center',
          }}
          onClick={() => itemModal.appear({ operation: 'create' })}
        >
          <AddIcon />
        </Button>
      )}
    >
      <S.ScrollTableBox item container xs={12} spacing={2}>
        {/* Para cada atributo existente, exiba as informações */}
        {items.map((item, index) => (
          <Grid item xs={12} key={index}>
            <EditableDataRow
              data={item}
              editRow={(data) => {
                itemModal.appear({ operation: 'edit', data });
              }}
              deleteRow={(data) => {
                confirmationModal.appear({
                  title: 'Excluir item',
                  text: 'Tem certeza que deseja excluir este item?',
                  data: { id: data.id, type },
                });
              }}
            />
          </Grid>
        ))}
      </S.ScrollTableBox>
    </Section>
  );
};

export default AvailableItemsList;

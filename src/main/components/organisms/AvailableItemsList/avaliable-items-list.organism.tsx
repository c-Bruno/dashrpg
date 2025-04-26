import React from 'react';

import { Grid } from '@mui/material';
import { EditableDataRow } from 'main/components/molecules';

import * as S from './available-items-list.styles';

interface AvailableItemsListProps {
  type: string;
  items: any;
  itemModal: any;
  confirmationModal: any;
}

const AvailableItemsList: React.FC<AvailableItemsListProps> = ({ type, items, itemModal, confirmationModal }) => {
  return (
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
  );
};

export default AvailableItemsList;

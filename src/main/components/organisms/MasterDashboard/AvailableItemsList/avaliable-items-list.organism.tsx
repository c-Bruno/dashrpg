
import { Grid } from '@mui/material';
import { EditableDataRow } from 'main/components/molecules';

import * as S from './available-items-list.styles';

interface AvailableItemsListProps {
  type: string;
  items: any;
  itemModal: any;
  confirmationModal: any;
}

const AvailableItemsList = ({ type, items, itemModal, confirmationModal }: AvailableItemsListProps) => {
  return (
    <S.ScrollTableBox item container xs={12} spacing={0.8}>
      {/* Para cada atributo existente, exiba as informações */}
      {items.map((item, index) => (
        <Grid item xs={10} key={index}>
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

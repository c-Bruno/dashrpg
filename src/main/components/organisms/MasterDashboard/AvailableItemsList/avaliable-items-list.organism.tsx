import { Grid } from '@mui/material';
import { useModal } from 'common/hooks';
import { EditableDataRow, InfoModal } from 'main/components/molecules';

import * as S from './available-items-list.styles';

interface AvailableItemsListProps {
  type: string;
  items: any;
  itemModal: any;
}

const AvailableItemsList = ({ type, items, itemModal }: AvailableItemsListProps) => {
  const infoModal = useModal(({ close, custom }) => (
    <InfoModal
      showConfirm
      title='Excluir item'
      text='Tem certeza que deseja excluir este item?'
      data={custom.data}
      handleClose={close}
    />
  ));

  return (
    <S.ScrollTableBox container size={12} spacing={0.8}>
      {items.map((item, index) => (
        <Grid key={index} size={10}>
          <EditableDataRow
            data={item}
            editRow={(data) => {
              itemModal.appear({ operation: 'edit', data });
            }}
            deleteRow={(data) => {
              infoModal.appear({ data: { id: data.id, type } });
            }}
          />
        </Grid>
      ))}
    </S.ScrollTableBox>
  );
};

export default AvailableItemsList;

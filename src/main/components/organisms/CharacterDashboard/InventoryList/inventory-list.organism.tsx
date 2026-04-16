// src/components/organisms/InventoryList/InventoryList.tsx


import {   Grid, TextField   } from '@mui/material';
import { calcSpaceInventory } from 'common/helpers';
import { EditableDataRow } from 'main/components/molecules';

import * as S from './inventory-list.styles';

interface InventoryListProps {
  character: any;
  inventoryModal: any;
  confirmationModal: any;
}

const InventoryList = ({ character, inventoryModal, confirmationModal }: InventoryListProps) => {
  return (
    <>
      {/* Cabeçalho das informações de inventário */}
      <Grid container style={{ paddingBottom: '16px' }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField disabled label='ITEM' variant='standard' fullWidth />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <TextField disabled label='ESPAÇOS' variant='standard' fullWidth />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <TextField disabled label={`(${calcSpaceInventory(character)} LIVRE)`} variant='standard' fullWidth />
        </Grid>
      </Grid>

      {/* Lista de itens */}
      <S.ScrollableBox container size={12} spacing={0.8}>
        {character.inventory.map((inventory, index) => (
          <Grid key={index} size={12}>
            <EditableDataRow
              data={inventory}
              editRow={(data) =>
                inventoryModal.appear({
                  operation: 'edit',
                  data,
                  space: calcSpaceInventory(character),
                })
              }
              deleteRow={(data) =>
                confirmationModal.appear({
                  title: 'Apagar item do inventário',
                  text: 'Deseja apagar este item?',
                  data: { id: data.inventory_id, type: 'inventory' },
                })
              }
            />
          </Grid>
        ))}
      </S.ScrollableBox>
    </>
  );
};

export default InventoryList;

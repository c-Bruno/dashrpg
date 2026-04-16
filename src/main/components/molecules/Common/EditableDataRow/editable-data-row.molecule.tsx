
import { Delete as DeleteIcon, Create as EditIcon } from '@mui/icons-material';
import { Box, Grid, IconButton, TextField, Tooltip } from '@mui/material';

interface EditableDataRowProps {
  data: any;
  editRow: (data: any) => void;
  deleteRow: (data: any) => void;
}

const EditableDataRow = ({ data, editRow, deleteRow }: EditableDataRowProps) => {
  return (
    <Box sx={{ py: 1, px: 1, borderBottom: '1px solid #4e4e4e' }}>
      <Grid container spacing={2} sx={{ alignItems: "center" }}>
        {/* Descrição do item */}
        <Grid size={{ xs: 6, md: 6 }}>
          <TextField
            label='Descrição'
            value={data.name || data.inventory.description}
            variant='standard'
            fullWidth
            slotProps={{ input: { disableUnderline: true, readOnly: true } }}
          />
        </Grid>

        {/* Peso (se houver inventory) */}
        {data.inventory && (
          <Grid size={{ xs: 12, md: 2 }}>
            <TextField
              label='Peso'
              value={data.inventory.weight}
              variant='standard'
              fullWidth
              slotProps={{ input: { disableUnderline: true, readOnly: true } }}
            />
          </Grid>
        )}

        {/* Ações: Editar / Remover */}
        <Grid size={{ xs: 6, md: 2 }}>
          <Tooltip title='Editar informações'>
            <IconButton color='primary' aria-label='Editar informações' onClick={() => editRow(data)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </Grid>

        <Grid size={{ xs: 6, md: 2 }}>
          <Tooltip title='Remover item'>
            <IconButton color='primary' aria-label='Remover item' onClick={() => deleteRow(data)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditableDataRow;

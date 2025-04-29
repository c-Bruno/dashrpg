import React from 'react';

import { Delete as DeleteIcon, Create as EditIcon } from '@mui/icons-material';
import { Box, Grid, IconButton, TextField, Tooltip } from '@mui/material';

interface EditableDataRowProps {
  data: any;
  editRow: (data: any) => void;
  deleteRow: (data: any) => void;
}

const EditableDataRow: React.FC<EditableDataRowProps> = ({ data, editRow, deleteRow }) => {
  return (
    <Box sx={{ py: 1, px: 1, borderBottom: '1px solid #4e4e4e' }}>
      <Grid container spacing={2} alignItems='center'>
        {/* Descrição do item */}
        <Grid item xs={6} md={6}>
          <TextField
            label='Descrição'
            value={data.name || data.inventory.description}
            variant='standard'
            fullWidth
            InputProps={{ disableUnderline: true, readOnly: true }}
          />
        </Grid>

        {/* Peso (se houver inventory) */}
        {data.inventory && (
          <Grid item xs={12} md={2}>
            <TextField
              label='Peso'
              value={data.inventory.weight}
              variant='standard'
              fullWidth
              InputProps={{ disableUnderline: true, readOnly: true }}
            />
          </Grid>
        )}

        {/* Ações: Editar / Remover */}
        <Grid item xs={6} md={2}>
          <Tooltip title='Editar informações'>
            <IconButton color='primary' aria-label='Editar informações' onClick={() => editRow(data)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </Grid>

        <Grid item xs={6} md={2}>
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

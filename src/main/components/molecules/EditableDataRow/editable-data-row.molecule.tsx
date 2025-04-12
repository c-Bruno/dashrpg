import React from 'react';

import { Delete as DeleteIcon, Create as EditIcon } from '@mui/icons-material';
import { Button, Grid, TextField, Tooltip } from '@mui/material';

interface EditableDataRowProps {
  data: any;
  editRow: (data: any) => void;
  deleteRow: (data: any) => void;
};

const EditableDataRow: React.FC<EditableDataRowProps> = ({ data, editRow, deleteRow }) => {
  return (
    <div>
      <Grid container>
        {/* Descrição do item */}
        <Grid item md={6} xs={12}>
          <TextField
            disabled
            value={data.name || data.inventory.description}
            variant='standard'
            fullWidth
          />
        </Grid>

        {data.inventory && (
          <Grid item md={2} xs={12}>
            <TextField disabled value={data.inventory.weight} variant='standard' fullWidth />
          </Grid>
        )}

        {/* Remover Item */}
        <Grid item md={2} xs={6}>
          <Tooltip title='Remover item'>
            <Button variant='outlined' onClick={() => deleteRow(data)}>
              <DeleteIcon />
            </Button>
          </Tooltip>
        </Grid>

        {/* Editar Item */}
        <Grid item md={2} xs={6}>
          <Tooltip title='Editar indormações'>
            <Button variant='outlined' onClick={() => editRow(data)}>
              <EditIcon />
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
    </div>
  );
};

export default EditableDataRow;

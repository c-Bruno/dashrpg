import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  styled,
  TextField,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../../utils';

const AttributeName = styled(TextField)(({ theme }) => ({
  marginTop: '15px',
}));

function AttributeModal({ data, onSubmit, operation, attributes, handleClose, attributeSkill }) {
  const [updatedAttributes, setUpdatedAttributes] = useState(attributes);

  const [attribute, setAttribute] = useState({
    name: '',
    description: '',
    skill_id: '',
  });

  useEffect(() => {
    if (!data) {
      return;
    }

    setAttribute({
      name: data.name,
      description: data.description,
      skill_id: data.skill_id,
    });
  }, [data]);

  const resetState = () => {
    return setAttribute({
      name: '',
      description: '',
      skill_id: '',
    });
  };

  const submit = () => {
    if (!attribute.name) {
      return;
    }

    if (operation === 'create') {
      api
        .post('/attribute', attribute)
        .then(async () => {
          const responseID = await api.get(`/attribute/`);

          let newIds = [];
          responseID.data.forEach(val => {
            newIds.push(val.id);
          });

          // Atualiza os itens com os novos valores do inventário
          updatedAttributes.push({
            id: Math.max.apply(null, newIds),
            ...attribute,
          });
          setUpdatedAttributes(updatedAttributes);

          // Callback para atualizar o atributo no componente pai
          onSubmit(updatedAttributes);

          // Close modal
          handleClose();

          // Limpa as informações do formulário
          resetState();
        })
        .catch(() => {
          toast.error('Erro ao criar o atributo!');
        });
    } else if (operation === 'edit') {
      api
        .put(`/attribute/${data.id}`, attribute)
        .then(() => {
          // Descobre o ID no inventario que vai ser atualizado e modifica essa posição na lista
          const index = updatedAttributes.findIndex(obj => obj.id === data.id);

          updatedAttributes[index] = { id: data.id, ...attribute };
          setUpdatedAttributes(updatedAttributes);

          // Callback para atualizar o personagem no componente pai
          onSubmit(updatedAttributes);

          // Close modal
          handleClose();

          // Limpa as informações do formulário
          resetState();
        })
        .catch(err => {
          toast.error('Erro ao editar o atributo!');
        });
    }
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>
        {operation === 'create' ? 'Criar novo atributo' : 'Editar atributo'}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {/* Nome do atributo */}
            <AttributeName
              autoFocus
              label='Nome'
              type='text'
              fullWidth
              variant='standard'
              value={attribute.name}
              onChange={({ target }) => {
                const value = target.value;

                setAttribute(prevState => ({
                  ...prevState,
                  name: value,
                }));
              }}
              spellCheck={false}
            />
          </Grid>

          <Grid item xs={12}>
            {/* Descrição do atributo */}
            <AttributeName
              autoFocus
              label='Descrição'
              type='text'
              fullWidth
              multiline
              variant='standard'
              value={attribute.description}
              onChange={({ target }) => {
                const value = target.value;

                setAttribute(prevState => ({
                  ...prevState,
                  description: value,
                }));
              }}
              spellCheck={false}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Perícia</InputLabel>
              <Select
                labelId='skill_id'
                id='skill_id'
                value={attribute.skill_id}
                label='Perícia'
                onChange={({ target }) => {
                  const value = target.value;

                  setAttribute(prevState => ({
                    ...prevState,
                    skill_id: value,
                  }));
                }}
              >
                {attributeSkill.map((skill, index) => (
                  <MenuItem key={skill.id} value={skill.id}>
                    {skill.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='secondary'>
          Cancelar
        </Button>
        <Button onClick={submit}>Confirmar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AttributeModal;

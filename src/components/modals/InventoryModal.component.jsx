import React, { useState, useEffect } from 'react';

import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  DialogTitle,
  Button,
  Snackbar,
} from '@mui/material';

import { toast, ToastContainer } from 'react-toastify';

import { api } from '../../utils';

function InventoryModal({
  data,
  onSubmit,
  operation,
  character,
  totalSpace,
  handleClose,
  fullCharacter,
}) {
  const [updatedCharacter, setUpdatedCharacter] = useState(fullCharacter);

  const [inventory, setInventory] = useState({
    description: '',
    weight: null,
    character_id: character,
  });

  useEffect(() => {
    if (!data) {
      return;
    }

    setInventory({
      description: data.inventory.description,
      weight: data.inventory.weight,
      character_id: character,
    });
  }, [data]);

  const resetState = () => {
    return setInventory({
      description: '',
      weight: null,
      character_id: character,
    });
  };

  const submit = () => {
    if (!inventory.description || !inventory.weight) {
      // Verifica se a descrição e peso esta preenchida
      toast.error('Preencha todos os campos');
      return;
    }

    if (inventory.weight > totalSpace) {
      // Verifica se o novo item cabe no inventario
      toast.error('Este item não cabe no seu inventário');
      return;
    }

    // Se a operação for criar
    if (operation === 'create') {
      api
        .post('/inventory', inventory)
        .then(async () => {
          //
          const responseID = await api.get(`/inventory/`);

          let newIds = [];
          responseID.data.forEach(val => {
            newIds.push(val.id);
          });

          // Atualiza o personagem com os novos valores do inventário
          updatedCharacter.inventory.push({
            inventory_id: Math.max.apply(null, newIds),
            inventory,
          });
          setUpdatedCharacter(updatedCharacter);

          // Callback para atualizar o personagem no componente pai
          onSubmit(updatedCharacter);

          // Close modal
          handleClose();

          // Limpa as informações do formulário
          resetState();
        })
        .catch(() => {
          toast.error('Erro ao criar o item!');
        });
    } else if (operation === 'edit') {
      // Se a operação for editar
      api
        .put(`/inventory/${data.inventory_id}`, inventory)
        .then(() => {
          // Descobre o ID no inventario que vai ser atualizado e modifica essa posição na lista
          const index = updatedCharacter.inventory.findIndex(
            obj => obj.inventory_id === data.inventory_id,
          );
          updatedCharacter.inventory[index].inventory = inventory;
          setUpdatedCharacter(updatedCharacter);

          // Callback para atualizar o personagem no componente pai
          onSubmit(updatedCharacter);

          // Close modal
          handleClose();

          resetState();
        })
        .catch(err => {
          toast.error('Erro ao editar o item!');
          console.log(err);
        });
    }
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>
        {' '}
        {operation === 'create' ? 'Adicionar um novo item' : 'Editar item'}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              style={{
                marginTop: '15px',
              }}
              autoFocus
              label='Descrição'
              type='text'
              fullWidth
              variant='standard'
              defaultValue={data ? data.inventory.description : ''}
              onChange={({ target }) => {
                const value = target.value;

                setInventory(prevState => ({
                  ...prevState,
                  description: value,
                }));
              }}
              spellCheck={false}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              style={{
                marginTop: '15px',
              }}
              label='Peso'
              type='number'
              fullWidth
              multiline
              variant='standard'
              defaultValue={data ? data.inventory.weight : ''}
              onChange={({ target }) => {
                const value = Number(target.value);

                setInventory(prevState => ({
                  ...prevState,
                  weight: value,
                }));
              }}
              spellCheck={false}
            />
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

export default InventoryModal;

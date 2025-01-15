import React, { useState, useEffect } from 'react';

import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  DialogTitle,
  Button,
} from '@mui/material';
import { api } from '../../utils';
import { toast, ToastContainer } from 'react-toastify';

function SkillModal({ data, skills, onSubmit, operation, handleClose }) {
  const [updatedSkills, setUpdatedSkills] = useState(skills);

  const [skill, setSkill] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    if (!data) {
      return;
    }

    setSkill({
      name: data.name,
      description: data.description,
    });
  }, [data]);

  const resetState = () => {
    return setSkill({
      name: '',
      description: '',
    });
  };

  const submit = () => {
    if (!skill.name) {
      return;
    }

    if (operation === 'create') {
      api
        .post('/skill', skill)
        .then(async () => {
          const responseID = await api.get(`/skill/`);

          let newIds = [];
          responseID.data.forEach(val => {
            newIds.push(val.id);
          });

          // Atualiza os itens com os novos valores do inventário
          updatedSkills.push({
            id: Math.max.apply(null, newIds),
            ...skill,
          });
          setUpdatedSkills(updatedSkills);

          // Callback para atualizar o skill no componente pai
          onSubmit(updatedSkills);

          // Close modal
          handleClose();

          // Limpa as informações do formulário
          resetState();
        })
        .catch(() => {
          toast.error('Erro ao criar a perícia!');
        });
    } else if (operation === 'edit') {
      api
        .put(`/skill/${data.id}`, skill)
        .then(() => {
          // Descobre o ID no inventario que vai ser atualizado e modifica essa posição na lista
          const index = updatedSkills.findIndex(obj => obj.id === data.id);

          updatedSkills[index] = { id: data.id, ...skill };
          setUpdatedSkills(updatedSkills);

          // Callback para atualizar a skill no componente pai
          onSubmit(updatedSkills);

          // Close modal
          handleClose();

          // Limpa as informações do formulário
          resetState();
        })
        .catch(() => {
          toast.error('Erro ao editar a perícia!');
        });
    }
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>{operation === 'create' ? 'Criar nova perícia' : 'Editar perícia'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              style={{
                marginTop: '15px',
              }}
              autoFocus
              label='Nome'
              type='text'
              fullWidth
              variant='standard'
              value={skill.name}
              onChange={({ target }) => {
                const value = target.value;

                setSkill(prevState => ({
                  ...prevState,
                  name: value,
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
              autoFocus
              label='Descrição'
              type='text'
              fullWidth
              multiline
              variant='standard'
              value={skill.description}
              onChange={({ target }) => {
                const value = target.value;

                setSkill(prevState => ({
                  ...prevState,
                  description: value,
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

export default SkillModal;

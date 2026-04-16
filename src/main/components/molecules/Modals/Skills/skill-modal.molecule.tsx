import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Grid, TextField } from '@mui/material';
import { api } from 'common/libs';
import { ModalTemplate } from 'main/components/templates';

interface SkillModalProps {
  data: any;
  skills: any;
  onSubmit: any;
  operation: string;
  handleClose: () => void;
}

const SkillModal = ({ data, skills, onSubmit, operation, handleClose }: SkillModalProps) => {
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

          const newIds: number[] = [];
          (responseID.data as { id: number }[]).forEach((val) => {
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
          const index = updatedSkills.findIndex((obj) => obj.id === data.id);

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
    <ModalTemplate
      title={operation === 'create' ? 'Criar nova perícia' : 'Editar perícia'}
      onClose={handleClose}
      onConfirm={submit}
    >
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

              setSkill((prevState) => ({
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

              setSkill((prevState) => ({
                ...prevState,
                description: value,
              }));
            }}
            spellCheck={false}
          />
        </Grid>
      </Grid>
    </ModalTemplate>
  );
};

export default SkillModal;

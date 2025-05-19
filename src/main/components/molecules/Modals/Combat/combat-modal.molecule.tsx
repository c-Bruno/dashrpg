import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { api } from 'common/libs';
import { TableHead } from 'main/components/molecules';
import { ModalTemplate } from 'main/components/templates';

interface CombatModalProps {
  data: any;
  onSubmit: any;
  operation: string;
  character: any;
  handleClose: () => void;
  fullCharacter: any;
}

const CombatModal: React.FC<CombatModalProps> = ({
  data,
  onSubmit,
  operation,
  character,
  handleClose,
  fullCharacter,
}) => {
  const [updatedCharacter, setUpdatedCharacter] = useState(fullCharacter);

  // Tipo de armas
  const [type, setType] = React.useState('');
  const handleChange = (event) => {
    setType(event.target.value);
  };

  const [combat, setCombat] = useState({
    weapon: '',
    type: '',
    damage: '',
    current_load: '',
    total_load: '',
    character_id: character,
  });

  useEffect(() => {
    if (!data) {
      return;
    }

    setCombat({
      weapon: data.weapon,
      type: data.type,
      damage: data.damage,
      current_load: data.current_load,
      total_load: data.total_load,
      character_id: character,
    });
  }, [data]);

  const resetState = () => {
    return setCombat({
      weapon: '',
      type: '',
      damage: '',
      current_load: '',
      total_load: '',
      character_id: character,
    });
  };

  const submit = () => {
    if (!combat.weapon) {
      return;
    }

    // Se a operação for criar
    if (operation === 'create') {
      api
        .post('/combat', combat)
        .then(async () => {
          const responseID = await api.get(`/combat/`);

          const newIds: number[] = [];
          (responseID.data as { id: number }[]).forEach((val) => {
            newIds.push(val.id);
          });

          updatedCharacter.combat.push({
            combat_id: Math.max.apply(null, newIds),
            combat,
          });
          setUpdatedCharacter(updatedCharacter);

          // Callback
          onSubmit(updatedCharacter);

          // Close modal
          handleClose();

          // Limpa aa informações
          resetState();
        })
        .catch(() => {
          toast.error('Erro ao criar o item!');
        });
    } else if (operation === 'edit') {
      // Se a operação for editar
      api
        .put(`/combat/${data.id}`, combat)
        .then(() => {
          // Descobre o ID no inventario que vai ser atualizado e modifica essa posição na lista
          const index = updatedCharacter.combat.findIndex((obj) => obj.combat_id == data.id);

          updatedCharacter.combat[index].combat = combat;
          setUpdatedCharacter(updatedCharacter);

          // Callback para atualizar o personagem no componente pai
          onSubmit(updatedCharacter);

          // Close modal
          handleClose();

          resetState();
        })
        .catch((err) => {
          toast.error('Erro ao editar o item!');
        });
    }
  };

  return (
    <ModalTemplate
      title={operation === 'create' ? 'Adicionar um novo item' : 'Editar item'}
      onClose={handleClose}
      onConfirm={submit}
      maxWidth='xl'
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label='custom pagination table' stickyHeader>
          {/* Cabeçalho da tabela */}
          <TableHead />

          <TableBody>
            <TableRow>
              {/* Descrição da arma */}
              <TableCell component='th' scope='row'>
                <TextField
                  id='filled-basic'
                  label='Descrição'
                  variant='standard'
                  autoComplete='off'
                  defaultValue={data ? data.weapon : ''}
                  onChange={({ target }) => {
                    const value = target.value;

                    setCombat((prevState) => ({
                      ...prevState,
                      weapon: value,
                    }));
                  }}
                />
              </TableCell>

              {/* Tipo */}
              <TableCell style={{ minWidth: 180 }} align='left'>
                <FormControl fullWidth variant='standard'>
                  <InputLabel id='demo-simple-select-label'>Tipo da arma</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    // value={type}
                    label='Tipo de arma'
                    defaultValue={data ? data.type : ''}
                    onChange={({ target }) => {
                      const value = target.value;

                      setCombat((prevState) => ({
                        ...prevState,
                        type: value,
                      }));
                    }}
                  >
                    <MenuItem value='Balistico'>Balístico</MenuItem>
                    <MenuItem value='Fisico'>Físico</MenuItem>
                    <MenuItem value='Fogo'>Fogo</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>

              {/* Dano */}
              <TableCell style={{ minWidth: 100 }} align='right'>
                <TextField
                  id='filled-basic'
                  label='Dano'
                  variant='standard'
                  autoComplete='off'
                  defaultValue={data ? data.damage : ''}
                  onChange={({ target }) => {
                    const value = target.value;

                    setCombat((prevState) => ({
                      ...prevState,
                      damage: value,
                    }));
                  }}
                />
              </TableCell>

              {/* Carga atual */}
              <TableCell style={{ minWidth: 70 }} align='right'>
                <TextField
                  type='number'
                  id='filled-basic'
                  label='Carga Atual'
                  variant='standard'
                  autoComplete='off'
                  defaultValue={data ? data.current_load : ''}
                  onChange={({ target }) => {
                    const value = target.value;

                    setCombat((prevState) => ({
                      ...prevState,
                      current_load: value,
                    }));
                  }}
                />
              </TableCell>

              {/* Capacidade */}
              <TableCell style={{ minWidth: 70 }} align='right'>
                <TextField
                  type='number'
                  id='filled-basic'
                  label='Carga Maxima'
                  variant='standard'
                  autoComplete='off'
                  defaultValue={data ? data.total_load : ''}
                  onChange={({ target }) => {
                    const value = target.value;

                    setCombat((prevState) => ({
                      ...prevState,
                      total_load: value,
                    }));
                  }}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </ModalTemplate>
  );
};

export default CombatModal;

import React from 'react';
import { toast } from 'react-toastify';

import { Delete, Edit } from '@mui/icons-material';
import { TableRow, TableCell, Tooltip, Button } from '@mui/material';
import { useModal } from 'common/hooks';
import { api } from 'common/libs';
import { ConfirmationModal, DiceRollModal } from 'main/components/molecules';

import { CombatModal } from '../../../../../components/modals';
import * as S from './table-body.styles';

const TableBody: React.FC<any> = (props) => {
  const rows = [].sort((a, b) => (a.weapon < b.weapon ? -1 : 1));

  function createData(id, weapon, type, damage, current_load, total_load) {
    return { id, weapon, type, damage, current_load, total_load };
  }
  
  const combatItems = props.character.combat;
  combatItems.map(function (nome, i) {
    rows.push(
      createData(
        nome.combat_id,
        nome.combat.weapon,
        nome.combat.type,
        nome.combat.damage,
        nome.combat.current_load,
        nome.combat.total_load,
      ),
    );
  });

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const diceRollModal = useModal(({ close, custom }) => <DiceRollModal amount={custom.amount} handleClose={close} />);

  const confirmationModal = useModal(({ close, custom }) => (
    <ConfirmationModal
      title={custom.title}
      text={custom.text}
      data={custom.data}
      handleClose={close}
      onConfirmation={(data) => {
        const { id, type } = data;

        api
          .delete(`/${type}/${id}`)
          .then(() => {
            props.handleCharacter((prevCharacter) => ({
              ...prevCharacter,
              [type]: prevCharacter[type].filter((item) => item[`${type}_id`] !== id),
            }));
          })
          .catch(() => {
            toast.error(`Erro ao apagar: ${type}`);
          });
      }}
    />
  ));

  // Aciona o modal de combate
  const combatModal = useModal(({ close, custom }) => {
    const { data, character: combatCharacter, operation } = custom;

    return (
      <CombatModal
        handleClose={close}
        data={data || null}
        character={combatCharacter || data.character_id}
        onSubmit={props.handleCharacter}
        operation={operation}
        fullCharacter={props.character}
      />
    );
  });

  return (
    <TableBody>
      {(rowsPerPage > 0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map((row) => (
        <TableRow key={row.id}>
          {/* Descrição da arma */}
          <TableCell component='th' scope='row'>
            {row.weapon}
          </TableCell>

          {/* Tipo */}
          <TableCell style={{ minWidth: 100 }} align='right'>
            {row.type}
          </TableCell>

          {/* Dano */}
          <TableCell style={{ minWidth: 100 }} align='right'>
            <S.Dice
              src={'/assets/dice.png'}
              alt='Dice roll'
              width={25}
              height={25}
              onClick={() =>
                diceRollModal.appear({
                  amount: row.damage,
                })
              }
            />
            {row.damage}
          </TableCell>

          {/* Carga atual */}
          <TableCell style={{ minWidth: 70 }} align='right'>
            {row.current_load}
          </TableCell>

          {/* Capacidade */}
          <TableCell style={{ minWidth: 70 }} align='right'>
            {row.total_load}
          </TableCell>

          {/* Deletar e Editar cadastro */}
          <TableCell style={{ minWidth: 70 }} align='right'>
            <Tooltip title='Remover item de combate'>
              <Button
                variant='outlined'
                onClick={() => {
                  confirmationModal.appear({
                    title: 'Apagar item de combate',
                    text: 'Deseja apagar este item?',
                    data: { id: row.id, type: 'combat' },
                  });
                }}
              >
                <Delete />
              </Button>
            </Tooltip>

            <Tooltip title='Editar indormações do item de combate'>
              <Button
                variant='outlined'
                style={{ marginLeft: '5px' }}
                onClick={() =>
                  combatModal.appear({
                    operation: 'edit',
                    character: props.character.id,
                    data: row,
                  })
                }
              >
                <Edit />
              </Button>
            </Tooltip>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableBody;

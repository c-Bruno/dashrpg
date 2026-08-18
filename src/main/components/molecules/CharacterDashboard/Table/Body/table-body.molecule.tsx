import { toast } from 'react-toastify';

import { Delete, Edit } from '@mui/icons-material';
import { TableRow, TableCell, Button, TableBody as MuiTableBody } from '@mui/material';
import { useModal } from 'common/hooks';
import { api } from 'common/libs';
import { Dice } from 'main/components/atoms';
import { CombatModal, InfoModal, DiceRollModal } from 'main/components/molecules';

const TableBody = ({ character, handleCharacter, rows, rowsPerPage, page }: any) => {
  const diceRollModal = useModal(({ close, custom }) => <DiceRollModal amount={custom.amount} handleClose={close} />);

  const infoModal = useModal(({ close, custom }) => (
    <InfoModal
      title={custom.title}
      text={custom.text}
      data={custom.data}
      handleClose={close}
      onConfirmation={(data) => {
        const { id, type } = data;

        api
          .delete(`/${type}/${id}`)
          .then(() => {
            handleCharacter((prevCharacter) => ({
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
        onSubmit={handleCharacter}
        operation={operation}
        fullCharacter={character}
      />
    );
  });

  return (
    <MuiTableBody>
      {(rowsPerPage > 0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map((row) => (
        <TableRow key={row.id}>
          {/* Descrição da arma */}
          <TableCell component='th' scope='row'>
            {row.weapon}
          </TableCell>

          {/* Tipo */}
          <TableCell>{row.type}</TableCell>

          {/* Dano */}
          <TableCell>
            <Dice
              width={25}
              height={25}
              altText='Dice roll'
              onClick={() => diceRollModal.appear({ amount: row.damage })}
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
            <Button
              variant='outlined'
              onClick={() => {
                infoModal.appear({
                  title: 'Apagar item de combate',
                  text: 'Deseja apagar este item?',
                  data: { id: row.id, type: 'combat' },
                  showConfirm: true,
                });
              }}>
              <Delete />
            </Button>

            <Button
              variant='outlined'
              style={{ marginLeft: '5px' }}
              onClick={() =>
                combatModal.appear({
                  operation: 'edit',
                  character: character.id,
                  data: row,
                })
              }>
              <Edit />
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </MuiTableBody>
  );
};

export default TableBody;

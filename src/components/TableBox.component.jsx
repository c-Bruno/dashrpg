import * as React from 'react';
import { toast } from 'react-toastify';

import { Delete as DeleteIcon, Create as EditIcon } from '@mui/icons-material';
import { Button, Tooltip, styled } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { DiceRollModal, TablePaginationActions } from 'main/components/molecules';

import useModal from '../hooks/useModal.hook';
import { api } from '../utils';
import { CombatModal, ConfirmationModal } from './modals';

const Dice = styled('img')(({ theme }) => ({
  cursor: 'pointer',
  transition: '-webkit-transform .8s ease-in-out',
  transform: 'transform .8s ease-in-out',
  marginRight: '8px',
  '&:hover': {
    transition: 'rotate(360deg)',
    transform: 'rotate(360deg)',
  },
}));

// Cria cada linha da coluna
function createData(id, weapon, type, damage, current_load, total_load) {
  return { id, weapon, type, damage, current_load, total_load };
}

// Definir dados do cabeçalho da tabela
const columns = [
  { id: 'weapon', label: 'ARMA', minWidth: 150 },
  { id: 'type', label: 'TIPO', minWidth: 100, align: 'right' },
  { id: 'damage', label: 'DANO', minWidth: 100, align: 'right' },
  { id: 'current_load', label: 'CARGA ATUAL', minWidth: 70, align: 'right' },
  { id: 'total_load', label: 'CARGA MÁXIMA', minWidth: 70, align: 'right' },
  { id: 'options', label: '', minWidth: 100, align: 'right' },
];

export default function TableBox(props) {
  // Define as linhas da tabela
  var rows = [].sort((a, b) => (a.weapon < b.weapon ? -1 : 1)); // Ordena alfabeticamente

  // Mapeia os itens que vem do banco
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

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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

  // Modal de confirmação
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

  const diceRollModal = useModal(({ close, custom }) => <DiceRollModal amount={custom.amount} handleClose={close} />);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label='custom pagination table' stickyHeader>
        {/* Cabeçalho da tabela */}
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* Caso possua dados do personagem */}
        {/* // Caso não tenha */}
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
                <Dice
                  src={'/assets/dice.png'}
                  alt='Dice roll'
                  width={25}
                  height={25}
                  align={'center'}
                  onClick={() =>
                    diceRollModal.appear({
                      amount: row.damage,
                    })
                  }
                />
                {row.damage}
              </TableCell>

              {/* Carga atual */}
              <TableCell style={{ minWidth: 70 }} align='right' type='number'>
                {row.current_load}
              </TableCell>

              {/* Capacidade */}
              <TableCell style={{ minWidth: 70 }} align='right' type='number'>
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
                    <DeleteIcon />
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
                    <EditIcon />
                  </Button>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={5} />
            </TableRow>
          )}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'Todas', value: -1 }]}
              colSpan={6}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'Linhas por página',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

import * as React from 'react';

import { Paper, Table, TableContainer, TableRow, TableFooter, TablePagination } from '@mui/material';
import { TableBody, TableHead, TablePaginationActions } from 'main/components/molecules';

// Cria cada linha da coluna
function createData(id, weapon, type, damage, current_load, total_load) {
  return { id, weapon, type, damage, current_load, total_load };
}

type CombatItem = {
  combat_id: string;
  combat: {
    weapon: string;
    type: string;
    damage: number;
    current_load: number;
    total_load: number;
  };
};

interface WeaponStatusListProps {
  character: {
    combat: CombatItem[];
    id: string;
    [key: string]: any;
  };
  handleCharacter: (updateFn: (prev: any) => any) => void;
}

const WeaponStatusList: React.FC<WeaponStatusListProps> = ({ character, handleCharacter }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const combatRows = React.useMemo(() => {
    return character.combat
      .map((item) =>
        createData(
          item.combat_id,
          item.combat.weapon,
          item.combat.type,
          item.combat.damage,
          item.combat.current_load,
          item.combat.total_load,
        ),
      )
      .sort((a, b) => (a.weapon < b.weapon ? -1 : 1));
  }, [character.combat]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label='custom pagination table' stickyHeader>
        {/* Cabeçalho da tabela */}
        <TableHead />

        {/* Caso possua dados de combate do personagem */}
        <TableBody
          rows={combatRows}
          page={page}
          character={character}
          rowsPerPage={rowsPerPage}
          handleCharacter={handleCharacter}
        />

        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'Todas', value: -1 }]}
              colSpan={6}
              count={combatRows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{ native: true }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
              labelRowsPerPage='Linhas por página'
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default WeaponStatusList;

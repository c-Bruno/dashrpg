import { ChangeEvent, useMemo, useState } from 'react';

import { Paper, Table, TableContainer, TableRow, TableFooter, TablePagination } from '@mui/material';
import { TableBody, TableHead, TablePaginationActions } from 'main/components/molecules';

// Builds each table row — all nullable fields are typed as string to match the Prisma model
const createData = (
  id: number,
  weapon: string,
  type?: string,
  damage?: string,
  current_load?: string,
  total_load?: string,
) => {
  return { id, weapon, type, damage, current_load, total_load };
};

type CombatItem = {
  combat_id: number;
  combat: {
    weapon: string;
    type?: string;
    damage?: string;
    current_load?: string;
    total_load?: string;
  };
};

interface WeaponStatusListProps {
  character: {
    combat?: CombatItem[];
    id?: number;
    [key: string]: any;
  };
  handleCharacter: (newCharacter: any) => void;
}

const WeaponStatusList = ({ character, handleCharacter }: WeaponStatusListProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const combatRows = useMemo(() => {
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

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10));
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

import { TableCell, TableRow, TableHead as MuiTableHead } from '@mui/material';
import { TABLE_HEADERS } from 'common/constants';

const TableHead = () => {
  return (
    <MuiTableHead>
      <TableRow>
        {TABLE_HEADERS.map((column) => (
          <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </MuiTableHead>
  );
};

export default TableHead;

type TableHeader = {
  id: string;
  label: string;
  minWidth: number;
  align?: 'right' | 'left' | 'center';
};

const TABLE_HEADERS: TableHeader[] = [
  { id: 'weapon', label: 'ARMA', minWidth: 150 },
  { id: 'type', label: 'TIPO', minWidth: 100, align: 'right' },
  { id: 'damage', label: 'DANO', minWidth: 100, align: 'right' },
  { id: 'current_load', label: 'CARGA ATUAL', minWidth: 70, align: 'right' },
  { id: 'total_load', label: 'CARGA MÁXIMA', minWidth: 70, align: 'right' },
  { id: 'options', label: '', minWidth: 100, align: 'right' },
];

export default TABLE_HEADERS;

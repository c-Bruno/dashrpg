import { styled } from '@mui/material';

export const IconTile = styled('span')({
  display: 'grid',
  placeItems: 'center',
  width: 48,
  height: 48,
  flexShrink: 0,
  border: '1px solid rgba(179, 105, 57, 0.35)',
  borderRadius: 6,
  color: '#e17552',
  background: 'rgba(136, 48, 42, 0.18)',
  '&[data-icon="dumbbell"], &[data-icon="bow"]': {
    borderColor: 'rgba(89, 155, 112, 0.3)',
    color: '#8dbd77',
    background: 'rgba(36, 105, 72, 0.16)',
  },
  '&[data-icon="book"], &[data-icon="sparkles"]': {
    borderColor: 'rgba(106, 104, 218, 0.35)',
    color: '#a49aff',
    background: 'rgba(58, 57, 158, 0.2)',
  },
  '& svg': { width: 28, height: 28 },
});

export const AttributeList = styled('div')({
  display: 'grid',
  gap: 9,
  paddingTop: 12,
});

export const AttributeRow = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  minHeight: 68,
  padding: '8px 10px',
  border: '1px solid #27313a',
  borderRadius: 4,
  background: 'rgba(11, 17, 24, 0.48)',
});

export const EntityInfo = styled('div')({
  minWidth: 0,
  flex: 1,
  '& strong': {
    display: 'block',
    color: '#d8dce1',
    fontSize: '1rem',
    fontWeight: 600,
  },
  '& p': {
    overflow: 'hidden',
    margin: '2px 0 0',
    color: '#8995a3',
    fontSize: '1rem',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});

export const RowActions = styled('div')({
  display: 'flex',
  gap: 4,
  '& button': {
    display: 'grid',
    placeItems: 'center',
    width: 30,
    height: 34,
    padding: 0,
    border: 0,
    color: '#aeb7c1',
    background: 'transparent',
    '&:disabled': { opacity: 0.72, cursor: 'not-allowed' },
  },
});

export const EmptyMessage = styled('p')({
  margin: '14px 0 6px',
  color: '#8995a3',
  fontSize: '1rem',
});

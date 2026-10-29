import { styled } from '@mui/material';
import { bodyFont, headingFont } from 'themes/dashboard-visuals.styles';

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

export const SkillControls = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'minmax(150px, 0.78fr) minmax(160px, 1.1fr)',
  gap: 10,
  padding: '12px 0',
  '& select': {
    width: '100%',
    minWidth: 0,
    height: 38,
    padding: '0 10px',
    border: '1px solid #303b47',
    borderRadius: 4,
    outline: 'none',
    color: '#b9c2cf',
    background: '#111922',
    font: `500 1rem ${bodyFont}`,
    '&:focus': { borderColor: '#a9793f' },
  },
  '@media (max-width: 520px)': { gridTemplateColumns: '1fr' },
});

export const SearchField = styled('label')({
  display: 'flex',
  alignItems: 'center',
  gap: 9,
  minWidth: 0,
  height: 38,
  padding: '0 10px',
  border: '1px solid #303b47',
  borderRadius: 4,
  color: '#8d9aaa',
  background: '#111922',
  '&:focus-within': { borderColor: '#a9793f' },
  '& input': {
    width: '100%',
    minWidth: 0,
    height: '100%',
    padding: 0,
    border: 0,
    outline: 'none',
    color: '#b9c2cf',
    background: 'transparent',
    font: `500 1rem ${bodyFont}`,
    '&::placeholder': { color: '#768392' },
  },
});

export const SkillsTable = styled('div')({
  border: '1px solid #27313a',
  borderRadius: 4,
  overflowX: 'auto',
});

export const TableHeader = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'minmax(130px, 0.85fr) minmax(160px, 1.2fr) 66px',
  gap: 10,
  minWidth: 420,
  padding: '9px 12px',
  color: '#b88040',
  background: 'rgba(18, 26, 35, 0.95)',
  fontFamily: headingFont,
  fontSize: '0.9rem',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
});

export const SkillRow = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'minmax(130px, 0.85fr) minmax(160px, 1.2fr) 66px',
  alignItems: 'center',
  gap: 10,
  minWidth: 420,
  minHeight: 44,
  padding: '5px 12px',
  borderTop: '1px solid rgba(45, 56, 67, 0.7)',
});

export const SkillName = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  color: '#c9cfd6',
  fontSize: '1rem',
  '& > svg': { color: '#d79a45' },
});

export const UnlinkedText = styled('span')({
  color: '#788493',
  fontSize: '0.9rem',
});

export const AttributeChips = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 5,
});

export const AttributeChip = styled('span')({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  minHeight: 26,
  padding: '2px 8px',
  border: '1px solid #303b47',
  borderRadius: 4,
  color: '#aab4c1',
  background: '#151e28',
  fontSize: '0.9rem',
  '& svg': { color: '#d89043' },
});

export const EmptyMessage = styled('p')({
  margin: '14px 0 6px',
  color: '#8995a3',
  fontSize: '1rem',
});

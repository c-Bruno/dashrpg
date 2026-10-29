import { styled } from '@mui/material';
import { bodyFont, framedPanel, headingFont } from 'themes/dashboard-visuals.styles';

export const Panel = styled('section')({
  ...framedPanel,
  minWidth: 0,
  padding: '14px 18px 16px',
  '@media (max-width: 500px)': { padding: '12px 12px 14px' },
});

export const SummaryPanel = styled(Panel)({
  marginTop: 18,
});

export const PanelHeader = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  minHeight: 44,
  paddingBottom: 10,
  borderBottom: '1px solid #2b323a',
  '& > svg': { color: '#ce8c3e' },
  '& h3': {
    margin: 0,
    color: '#e6d0a5',
    fontFamily: headingFont,
    fontSize: '1rem',
    fontWeight: 400,
    textTransform: 'uppercase',
  },
  '& button': { marginLeft: 'auto' },
});

export const SummaryHeader = styled(PanelHeader)({
  '& p': {
    margin: '2px 0 0',
    color: '#8995a3',
    fontFamily: bodyFont,
    fontSize: '0.84rem',
  },
});

export const SummaryGrid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: 14,
  paddingTop: 14,
  '@media (max-width: 850px)': {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  },
  '@media (max-width: 520px)': { gridTemplateColumns: 'minmax(0, 1fr)' },
});

export const SummaryCard = styled('article')({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 12,
  minWidth: 0,
  padding: 10,
  border: '1px solid #303b47',
  borderRadius: 4,
  background: 'rgba(11, 17, 24, 0.55)',
});

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

export const SummaryDetails = styled('div')({
  minWidth: 0,
  '& strong': { color: '#d3d8df', fontSize: '0.96rem' },
  '& p': { margin: '1px 0 7px', color: '#b38956', fontSize: '0.82rem' },
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
  fontSize: '0.8rem',
  '& svg': { color: '#d89043' },
});

export const EmptyMessage = styled('p')({
  margin: '14px 0 6px',
  color: '#8995a3',
  fontSize: '0.9rem',
});

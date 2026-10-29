import { styled } from '@mui/material';
import { bodyFont, framedPanel, headingFont } from 'themes/dashboard-visuals.styles';

export const Panel = styled('section')({
  ...framedPanel,
  minWidth: 0,
  padding: '14px 18px 16px',
  '@media (max-width: 500px)': { padding: '12px 12px 14px' },
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

export const AddButton = styled('button')({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 7,
  minHeight: 36,
  padding: '0 12px',
  border: '1px solid #76552f',
  borderRadius: 3,
  color: '#c58c42',
  background: 'rgba(11, 17, 24, 0.7)',
  fontFamily: bodyFont,
  fontSize: '0.9rem',
  fontWeight: 600,
  '&:disabled': { opacity: 0.58, cursor: 'not-allowed' },
  '&:not(:disabled):hover': { background: 'rgba(206,140,62,0.12)' },
});

export const PanelFooter = styled('footer')({
  marginTop: 14,
  paddingTop: 10,
  borderTop: '1px solid #2b323a',
  color: '#8995a3',
  fontSize: '0.88rem',
});

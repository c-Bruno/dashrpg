import { Box, styled } from '@mui/material';
import { framedPanel, headingFont } from 'themes/dashboard-visuals.styles';

export const ModuleCard = styled(Box)({
  ...framedPanel,
  minWidth: 0,
  minHeight: 224,
  overflow: 'hidden',
  '&[data-full-width="true"]': {
    gridColumn: '1 / -1',
    minHeight: 154,
    '& > div:first-of-type': { minHeight: 59, borderBottom: 0 },
    '& > div:last-child': { paddingTop: 0 },
  },
});

export const ModuleTitle = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 18,
  minHeight: 53,
  margin: '0 16px',
  padding: '10px 0',
  borderBottom: '1px solid #2b323a',
  color: '#e6d0a5',
  fontFamily: headingFont,
  fontSize: '1rem',
  fontWeight: 400,
  textTransform: 'uppercase',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -2,
    left: 0,
    width: 3,
    height: 3,
    background: '#b28450',
  },

  '& svg': {
    color: '#ce8c3e',
  },
});

export const ModuleBody = styled(Box)({
  padding: '12px 16px 14px',
  '&:has(> [data-variant="list"])': { paddingTop: 0, paddingBottom: 6 },
});

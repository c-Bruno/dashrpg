import { Box, styled } from '@mui/material';
import { framedPanel, headingFont } from 'themes/dashboard-visuals.styles';

export const SheetContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 18,
  width: '100%',
});

export const OverviewCard = styled(Box)({
  ...framedPanel,
  containerType: 'inline-size',
  containerName: 'character-overview',
  overflow: 'hidden',
});

export const SheetName = styled('h2')({
  margin: 0,
  color: '#f0dfb6',
  fontFamily: headingFont,
  fontSize: '2.25rem',
  fontWeight: 500,
  lineHeight: 1.1,
  overflowWrap: 'anywhere',
});

export const SheetOccupation = styled('span')({
  color: '#df9a3c',
  fontFamily: headingFont,
  fontSize: '1.25rem',
});

export const IdentityDetails = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 12,
  marginTop: 8,
});

export const IdentityDetail = styled('span')({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 10,
  padding: '7px 10px',
  border: '1px solid #2b3540',
  borderRadius: 3,
  boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.025)',
  background: 'linear-gradient(#1b242d, #151d26)',
  color: '#acb7c7',
  fontSize: '1rem',
  lineHeight: 1.2,
  '& svg': { color: '#ca893c' },
  '&[data-kind="gender"] svg': { color: '#d74c8e' },
});



export const ModuleGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.02fr) minmax(0, 1.07fr)',
  alignItems: 'stretch',
  gap: '24px 18px',

  '@media (max-width: 1100px)': {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  },

  '@media (max-width: 680px)': {
    gridTemplateColumns: 'minmax(0, 1fr)',
  },
});

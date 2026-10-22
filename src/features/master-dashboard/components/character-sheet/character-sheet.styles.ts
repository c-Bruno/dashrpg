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

export const OverviewRow = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '250px minmax(0, 1fr) minmax(300px, 40%)',
  alignItems: 'center',
  gap: 30,
  minHeight: 214,
  padding: '20px 18px 20px 14px',

  '@container character-overview (max-width: 850px)': {
    gridTemplateColumns: 'minmax(112px, 144px) minmax(0, 1fr)',
    gap: 18,
    minHeight: 0,
    padding: 16,
  },

  '@container character-overview (max-width: 480px)': {
    gridTemplateColumns: '76px minmax(0, 1fr)',
    gap: 14,
    padding: 12,
  },
});

export const IdentitySection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 8,
  minWidth: 0,
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

export const StatsSection = styled(Box)({
  ...framedPanel,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: 18,
  minWidth: 0,
  padding: '20px 18px',
  minHeight: 134,
  '& [data-slot="icon"] svg': { color: '#e53949' },
  '& > :last-child [data-slot="icon"] svg': { color: '#7e8ddc' },
  '& > :first-of-type .MuiLinearProgress-root': { backgroundColor: '#382028' },
  '& > :first-of-type .MuiLinearProgress-bar': { background: 'linear-gradient(90deg, #b51e30, #e83949)' },
  '& > :last-child .MuiLinearProgress-root': { backgroundColor: '#202a35' },
  '& > :last-child .MuiLinearProgress-bar': { background: 'linear-gradient(90deg, #4c5fa7, #7994e2)' },

  '@container character-overview (max-width: 850px)': {
    gridColumn: '1 / -1',
    padding: '15px 16px',
  },

  '@container character-overview (max-width: 480px)': {
    padding: '13px 10px',
    gap: 13,
  },
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

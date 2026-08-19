import { Chip, styled } from '@mui/material';

export const ResultBox = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '1rem',
  width: '100%',
  gap: '1rem',
});

export const CenteredChip = styled(Chip)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 'auto',
  marginRight: 'auto',
  fontSize: 'medium',
  width: '18%',
}));

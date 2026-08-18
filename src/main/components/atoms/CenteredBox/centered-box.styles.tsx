import { Chip, styled } from '@mui/material';

export const CenteredChip = styled(Chip)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 'auto',
  marginRight: 'auto',
  fontSize: 'medium',
}));

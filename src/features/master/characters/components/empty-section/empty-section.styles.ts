import { styled } from '@mui/material';

export const EmptySectionContainer = styled('span')(({ theme }) => ({
  color: `${theme.palette.grey[600]}`,
  fontSize: '0.75rem',
  fontFamily: '"Inter", "Roboto", sans-serif',
}));

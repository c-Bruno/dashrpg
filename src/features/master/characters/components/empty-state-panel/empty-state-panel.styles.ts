import { Box, styled } from '@mui/material';

export const EmptyStatePanelContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: 'calc(100vh - 200px)',
  color: `${theme.palette.grey[500]}`,
  textAlign: 'center',
  gap: '16px',
}));

export const PanelItem = styled(Box)<{ size: number }>(({ theme, size }) => ({
  fontSize: `${size}rem`,
  opacity: 0.2,
  color: `${theme.palette.grey[500]}`,
}));

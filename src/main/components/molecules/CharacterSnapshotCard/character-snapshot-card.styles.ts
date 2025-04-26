import { Box, Button, styled, Typography } from '@mui/material';

export const CharacterCardContainer = styled('div')(({ theme }) => ({
  gap: '20px',
  width: '100%',
  display: 'flex',
  padding: '15px',
  minHeight: '121px',
  borderRadius: '5px',
  alignItems: 'center',
  background: theme.palette.primary[900],
}));

export const CharacterTitle = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  marginTop: '8px',
  fontWeight: 'bold',
}));

export const HealthStatus = styled(Box)(({ theme }) => ({
  gap: '3px',
  float: 'left',
  display: 'flex',
  color: '#E80A67',
  marginRight: '10px',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const SanityStatus = styled(Box)(({ theme }) => ({
  gap: '3px',
  display: 'flex',
  color: '#1e45b6',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StatusInfo = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
}));

export const CharacterDetails = styled(Box)(({ theme }) => ({
  gap: '10px',
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'center',
  flexDirection: 'column',
}));

export const ActionButton = styled(Button)(({ theme }) => ({
  width: 40,
  height: 40,
  minWidth: 40,
  borderRadius: '5px',
}));

export const ActionButtonsWrapper = styled(Box)(({ theme }) => ({
  gap: '10px',
  display: 'flex',
  marginTop: '10px',
  alignItems: 'center',
  justifyContent: 'center',
}));
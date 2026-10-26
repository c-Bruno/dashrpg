import { styled, Typography } from '@mui/material';

export const SectionContainer = styled('div')(({ theme }) => ({
  height: '100%',
  padding: '15px',
  border: 'solid',
  overflow: 'auto',
  borderRadius: '3px',
  borderWidth: '0.1px',
  borderColor: '#4e4e4e',
  background: theme.palette.primary[600],
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  margin: 0,
  marginTop: '10px',
  marginLeft: 'auto',
  marginBottom: '10px',
  textAlign: 'center',
}));

export const SectionSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  margin: 0,
  marginTop: '10px',
  marginBottom: '10px',
  textAlign: 'center',
}));

export const ContentWrapper = styled('div')(() => ({
  padding: '20px',
}));

export const TopRightButtonWrapper = styled('div')(() => ({
  alignSelf: 'center',
  float: 'right',
}));
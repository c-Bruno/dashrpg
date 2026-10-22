import { styled } from '@mui/material/styles';

export const Content = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(4, 3, 3),
  textAlign: 'center',
}));

export const Divider = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2),
  width: '100%',
  color: theme.palette.primary.main,
  '&::before, &::after': {
    content: '""',
    height: 2,
    flex: 1,
    background: `linear-gradient(90deg, transparent, ${theme.palette.primary.dark})`,
  },
  '&::after': {
    transform: 'rotate(180deg)',
  },
}));

export const WarningMark = styled('svg')(({ theme }) => ({
  display: 'block',
  flexShrink: 0,
  color: theme.palette.primary.main,
}));

export const Message = styled('p')(({ theme }) => ({
  margin: 0,
  color: theme.palette.text.primary,
  fontSize: '1.15rem',
  lineHeight: 1.5,
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
  },
}));

export const Description = styled('p')(({ theme }) => ({
  margin: 0,
  color: theme.palette.primary.light,
  fontSize: '1rem',
  lineHeight: 1.5,
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
  },
}));

import { keyframes, styled } from '@mui/material/styles';

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Wrapper = styled('div')(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(3),
  right: theme.spacing(3),
  zIndex: theme.zIndex.snackbar,
  width: 340,
  maxHeight: 420,
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[8],
  overflow: 'hidden',
}));

export const Header = styled('div')(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  background: theme.palette.grey[900],
}));

export const List = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  padding: theme.spacing(0.5, 0),
}));

export const Row = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(0.75, 2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  animation: `${slideIn} 0.3s ease both`,

  '&:last-of-type': {
    borderBottom: 'none',
  },

  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const CharacterName = styled('p')(({ theme }) => ({
  ...theme.typography.caption,
  fontWeight: 600,
  minWidth: 80,
  maxWidth: 100,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  margin: 0,
  flexShrink: 0,
}));

export const Outcome = styled('p')(({ theme }) => ({
  ...theme.typography.caption,
  margin: 0,
  flex: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

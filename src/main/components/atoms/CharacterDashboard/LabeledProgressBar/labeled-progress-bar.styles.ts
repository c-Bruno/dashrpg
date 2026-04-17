import { LinearProgress, styled } from '@mui/material';

interface StyledProps {
  primaryColor?: string;
  secondaryColor?: string;
  clickable?: boolean;
}

export const StyledLinearProgress = styled(LinearProgress, {
  shouldForwardProp: (prop) => prop !== 'primaryColor' && prop !== 'secondaryColor' && prop !== 'clickable',
})<StyledProps>(({ theme, primaryColor, secondaryColor, clickable }) => ({
  height: '30px',
  borderRadius: '4px',
  cursor: clickable ? 'pointer' : 'default',
  backgroundColor: secondaryColor ?? theme.palette.grey[300],

  '& .MuiLinearProgress-bar': {
    backgroundColor: primaryColor ?? theme.palette.primary.main,
  },
}));

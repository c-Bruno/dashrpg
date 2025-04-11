import { LinearProgress, styled } from '@mui/material';

interface StyledProps {
  primaryColor?: string;
  secondaryColor?: string;
}

export const StyledLinearProgress = styled(LinearProgress, {
  shouldForwardProp: (prop) => prop !== 'primaryColor' && prop !== 'secondaryColor',
})<StyledProps>(({ primaryColor = '#0070f3', secondaryColor = '#eaeaea' }) => ({
  backgroundColor: secondaryColor,
  '& .MuiLinearProgress-bar': {
    backgroundColor: primaryColor,
  },
}));

import { Box, LinearProgress, styled, Typography } from '@mui/material';

type BarStyledProps = {
  barColor: string;
  trackColor: string;
  gradient?: string;
};

export const StatusBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  width: '100%',
  cursor: 'pointer',
});

export const StatusBar = styled(LinearProgress, {
  shouldForwardProp: (prop) => prop !== 'barColor' && prop !== 'trackColor' && prop !== 'gradient',
})<BarStyledProps>(({ barColor, trackColor, gradient }) => ({
  flex: 1,
  height: '25px',
  borderRadius: '15px',

  backgroundColor: trackColor,
  '& .MuiLinearProgress-bar': {
    background: gradient ?? barColor,
    borderRadius: '15px',
  },
}));

export const StatusBarLabel = styled(Typography)(({ theme }) => ({
  fontWeight: '600',
  whiteSpace: 'nowrap',
  color: theme.palette.text.secondary,
}));

import { Box, LinearProgress, styled, Typography } from '@mui/material';

type CardContainerProps = {
  barColor: string;
  trackColor: string;
};

export const StatusBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  width: '100%',
});

export const StatusBar = styled(LinearProgress, {
  shouldForwardProp: (prop) => prop !== 'barColor' && prop !== 'trackColor',
})<CardContainerProps>(({ barColor, trackColor }) => ({
  flex: 1,
  height: '25px',
  borderRadius: '10px',

  backgroundColor: trackColor,
  '& .MuiLinearProgress-bar': {
    backgroundColor: barColor,
    borderRadius: '10px',
  },
}));

export const StatusLabel = styled(Typography)(({ theme }) => ({
  fontSize: '13px',
  fontWeight: '600',
  whiteSpace: 'nowrap',
  color: theme.palette.text.secondary,
  minWidth: '64px',
  textAlign: 'right',
}));

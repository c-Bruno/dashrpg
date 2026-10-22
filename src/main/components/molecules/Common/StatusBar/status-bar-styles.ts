import { Box, LinearProgress, styled, Typography } from '@mui/material';

type BarStyledProps = {
  barColor: string;
  trackColor: string;
  gradient?: string;
  compact: boolean;
};

type StatusBoxProps = {
  compact: boolean;
  withIcon: boolean;
};

export const StatusBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'compact' && prop !== 'withIcon',
})<StatusBoxProps>(({ compact, withIcon }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: compact ? 8 : 10,
  width: '100%',
  cursor: 'pointer',
  '& .MuiTypography-root': {
    fontSize: compact ? '0.72rem' : undefined,
  },
  '& .MuiSvgIcon-root': {
    fontSize: compact ? 20 : undefined,
  },
  '&:focus-visible': { outline: '2px solid #e8b860', outlineOffset: 5 },
  ...(compact && {
    display: 'grid',
    gridTemplateColumns: withIcon ? '26px minmax(0, 1fr) 50px' : 'minmax(0, 1fr) 50px',
    columnGap: 12,
    rowGap: 4,
    '& [data-slot="icon"]': {
      gridColumn: 1,
      gridRow: '1 / 3',
      display: 'flex',
      alignItems: 'center',
    },
    '& [data-slot="label"]': {
      gridColumn: withIcon ? 2 : 1,
      gridRow: 1,
      fontFamily: 'inherit',
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1,
      color: '#a9aeb8',
    },
    '& .MuiLinearProgress-root': { gridColumn: withIcon ? 2 : 1, gridRow: 2 },
    '& [data-slot="value"]': {
      gridColumn: withIcon ? 3 : 2,
      gridRow: 2,
      fontFamily: 'inherit',
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1,
      textAlign: 'right',
      color: '#d0cdc6',
      fontVariantNumeric: 'tabular-nums',
    },
  }),
}));

export const StatusBar = styled(LinearProgress, {
  shouldForwardProp: (prop) =>
    prop !== 'barColor' && prop !== 'trackColor' && prop !== 'gradient' && prop !== 'compact',
})<BarStyledProps>(({ barColor, trackColor, gradient, compact }) => ({
  flex: 1,
  height: compact ? 11 : 25,
  borderRadius: compact ? 6 : 15,

  backgroundColor: trackColor,
  '& .MuiLinearProgress-bar': {
    background: gradient ?? barColor,
    borderRadius: compact ? 6 : 15,
  },
}));

export const StatusBarLabel = styled(Typography)(({ theme }) => ({
  fontWeight: '600',
  whiteSpace: 'nowrap',
  color: theme.palette.text.secondary,
}));

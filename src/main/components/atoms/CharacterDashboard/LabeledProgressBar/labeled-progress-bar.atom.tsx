import { memo, useId } from 'react';

import { Box, Typography } from '@mui/material';

import * as S from './labeled-progress-bar.styles';

interface LabeledProgressBarProps {
  value: number;
  label: string;
  primaryColor?: string;
  secondaryColor?: string;
  onClick?: () => void;
}

/**
 * A reusable component that displays a progress bar with an associated label.
 * The progress bar's color can be customized, and it can optionally be made clickable to trigger an action when clicked.
 */
const LabeledProgressBar = ({ value, label, primaryColor, secondaryColor, onClick }: LabeledProgressBarProps) => {
  const labelId = useId();
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <S.StyledLinearProgress
          variant='determinate'
          value={clampedValue}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          onClick={onClick}
          clickable={!!onClick}
          aria-labelledby={labelId}
          aria-valuenow={clampedValue}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography id={labelId} variant='body1' color='text.secondary' sx={{ userSelect: 'none' }}>
          {label}
        </Typography>
      </Box>
    </Box>
  );
};

export default memo(LabeledProgressBar);

import React from 'react';

import { Box, Grid } from '@mui/material';
import { LabeledProgressBar } from 'main/components/atoms';

import * as S from './status-bar.styles';

interface StatusBarProps {
  max: number;
  label: string;
  title: string;
  current: number;
  onClick?: () => void;
  primaryColor?: string;
  secondaryColor?: string;
}

const StatusBar: React.FC<StatusBarProps> = ({ max, label, title, current, onClick, primaryColor, secondaryColor }) => {
  const normalise = (current, max) => ((current - 0) * 100) / (max - 0);

  return (
    <Grid container item xs={12} marginBottom={2}>
      <S.BarTitle item xs={12}>
        <span>Sanidade</span>
      </S.BarTitle>

      <Grid item xs={12}>
        <Box sx={{ width: '100%' }}>
          <LabeledProgressBar
            value={normalise(current, max)}
            label={label}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            onClick={onClick}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default StatusBar;

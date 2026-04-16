
import {   Box, Grid   } from '@mui/material';
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

const StatusBar = ({ max, label, title, current, onClick, primaryColor, secondaryColor }: StatusBarProps) => {
  const normalise = (current, max) => ((current - 0) * 100) / (max - 0);

  return (
    <Grid container size={12} sx={{ marginBottom: 2 }}>
      <S.BarTitle size={12}>
        <span>Sanidade</span>
      </S.BarTitle>

      <Grid size={12}>
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

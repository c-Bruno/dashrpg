import React from "react";

import { Box, Typography } from "@mui/material";

import * as S from './labeled-progress-bar.styles';

interface LabeledProgressBarProps {
  value: number;
  label: string;
  primaryColor?: string;
  secondaryColor?: string;
  onClick?: () => void;
}

const LabeledProgressBar: React.FC<LabeledProgressBarProps> = ({ value, label, primaryColor, secondaryColor, onClick }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <S.StyledLinearProgress
          variant='determinate'
          value={value}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          onClick={onClick}
          classes={{
            root: 'secondary',
          }}
          style={{ height: '30px', borderRadius: '4px', cursor: 'pointer' }}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant='body1' color='text.secondary' style={{ userSelect: 'none' }}>
          {label}
        </Typography>
      </Box>
    </Box>
  );
}

export default LabeledProgressBar;

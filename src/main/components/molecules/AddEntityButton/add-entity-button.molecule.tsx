// src/components/molecules/AddEntityButton.tsx

import React from 'react';

import AddIcon from '@mui/icons-material/Add';
import { Button, Tooltip } from '@mui/material';

interface AddEntityButtonProps {
  style?: React.CSSProperties;
  onClick: () => void;
  tooltip: string;
}

const AddEntityButton: React.FC<AddEntityButtonProps> = ({ style, onClick, tooltip }) => {
  return (
    <Tooltip title={tooltip}>
      <Button
        variant='outlined'
        style={{
          display: 'flex',
          alignSelf: 'center',
          ...style,
        }}
        onClick={onClick}
      >
        <AddIcon />
      </Button>
    </Tooltip>
  );
};

export default AddEntityButton;

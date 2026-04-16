// src/components/molecules/AddEntityButton.tsx

import { CSSProperties } from 'react';

import AddIcon from '@mui/icons-material/Add';
import { Button, Tooltip } from '@mui/material';

interface AddEntityButtonProps {
  style?: CSSProperties;
  onClick: () => void;
  tooltip: string;
}

const AddEntityButton = ({ style, onClick, tooltip }: AddEntityButtonProps) => {
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

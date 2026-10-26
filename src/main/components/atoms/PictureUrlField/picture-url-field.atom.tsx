import { ChangeEvent } from 'react';

import { CheckCircleOutlined, ErrorOutlined } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';

interface PictureUrlFieldProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isValid: boolean;
}

const PictureUrlField = ({ label, value, onChange, isValid }: PictureUrlFieldProps) => {
  const hasValue = !!value;

  return (
    <TextField
      fullWidth
      label={label}
      variant='standard'
      value={value}
      onChange={onChange}
      error={hasValue && !isValid}
      slotProps={{
        input: {
          endAdornment: hasValue ? (
            <InputAdornment position='end'>
              {isValid ? (
                <CheckCircleOutlined sx={{ fontSize: 18, color: 'success.main' }} />
              ) : (
                <ErrorOutlined sx={{ fontSize: 18, color: 'error.main' }} />
              )}
            </InputAdornment>
          ) : null,
        },
      }}
    />
  );
};

export default PictureUrlField;

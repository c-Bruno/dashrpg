import React from 'react';

import { TextField } from '@mui/material';

interface TextFieldInputProps {
  name: string;
  label: string;
  value: string | number;
  error: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  fullWidth?: boolean;
}

const TextFieldInput: React.FC<TextFieldInputProps> = ({
  name,
  label,
  value,
  error,
  onChange,
  type = 'text',
  fullWidth = true,
}) => {
  return (
    <TextField
      fullWidth={fullWidth}
      name={name}
      label={label}
      variant='standard'
      value={value}
      error={!!error}
      onChange={onChange}
      type={type}
    />
  );
};

export default TextFieldInput;

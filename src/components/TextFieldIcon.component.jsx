import React from 'react';

import {
  FilledInput,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';

const TextFieldIcon = ({ type, Icon, label, variant, fullWidth, onClickIcon, ...props }) => {
  const InputVariant = props => {
    if (!variant) {
      return null;
    }

    switch (variant) {
      case 'outlined':
        return <OutlinedInput {...props} />;
      case 'filled':
        return <FilledInput {...props} />;
      default:
        return <Input {...props} />;
    }
  };

  return (
    <FormControl variant={variant} fullWidth={fullWidth}>
      <InputLabel>{label}</InputLabel>
      <InputVariant
        type={type}
        endAdornment={
          <InputAdornment position='end' onClick={onClickIcon}>
            <IconButton edge='end'>
              <Icon />
            </IconButton>
          </InputAdornment>
        }
        label={label}
        {...props}
      />
    </FormControl>
  );
};

export default TextFieldIcon;

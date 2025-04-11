import React from 'react';

import { FormControl, IconButton, InputAdornment, InputLabel } from '@mui/material';
import { getInputVariant } from 'common/helpers';

const CustomInputWithIcon = ({ type, Icon, label, variant, fullWidth, onClickIcon, ...props }) => {
  const InputVariant = getInputVariant(variant);

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

export default CustomInputWithIcon;

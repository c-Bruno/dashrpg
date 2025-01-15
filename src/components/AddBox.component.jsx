import { Add as AddIcon } from '@mui/icons-material';
import { styled } from '@mui/material';
import React from 'react';

const Root = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  padding: '15px',
  cursor: 'pointer',
  borderRadius: '3px',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  background: theme.palette.primary[900],
}));

const Icon = styled(AddIcon)(({ theme }) => ({
  fontSize: '65px',
  color: theme.palette.primary.main,
}));

const AddBox = ({ ...rest }) => {
  return (
    <Root {...rest}>
      <Icon />
    </Root>
  );
};

export default AddBox;

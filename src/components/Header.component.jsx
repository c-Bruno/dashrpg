import { Grid, styled, Typography } from '@mui/material';
import React from 'react';

const HeaderContainer = styled(Grid)(({ theme }) => ({
  textAlign: 'center',
  fontFamily: 'Lacquer, cursive',
}));

const Title = styled(Typography)(({ theme }) => ({
  title: {
    color: '#FFFFFF',
  },
}));

const Header = ({ title }) => {
  return (
    <HeaderContainer item xs={12} justifyContent='center'>
      <Title variant='h4' marginTop={10}>
        {title}
      </Title>
    </HeaderContainer>
  );
};

export default Header;

import {    Grid, styled, Typography    } from '@mui/material';

export const HeaderContainer = styled(Grid)(({ theme }) => ({
  textAlign: 'center',
  fontFamily: 'Lacquer, cursive',
}));

export const Title = styled(Typography)(({ theme }) => ({
  title: {
    color: 'blue',
  },
}));

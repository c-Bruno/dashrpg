import {    Grid, styled    } from '@mui/material';

export const ScrollableBox = styled(Grid)(() => ({
  overflow: 'auto',
  maxHeight: '300px',
  paddingRight: '10px',
}));

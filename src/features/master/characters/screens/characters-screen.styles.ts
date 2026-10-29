import { styled } from '@mui/material';
import { bodyFont } from 'themes/dashboard-visuals.styles';

export const CharactersScreen = styled('div')({
  minHeight: '100vh',
  background: 'radial-gradient(ellipse at 45% 30%, #141c25 0%, #10151d 72%)',
  color: '#d6d3cc',
  fontFamily: bodyFont,
  fontSize: '1rem',
  '& button, & input': { fontFamily: 'inherit' },
});

export const Layout = styled('div')({
  display: 'grid',
  gridTemplateColumns: '300px minmax(0, 1fr)',
  alignItems: 'stretch',
  gap: 26,
  padding: '20px 14px 24px',
  '@media (max-width: 1100px)': { gridTemplateColumns: '220px minmax(0, 1fr)', gap: 18 },
  '@media (max-width: 800px)': { gridTemplateColumns: 'minmax(0, 1fr)', padding: '16px 12px', gap: 16 },
});

export const Main = styled('main')({
  minWidth: 0,
  paddingTop: 4,
  scrollMarginTop: 60,
  '@media (max-width: 700px)': { scrollMarginTop: 108 },
});

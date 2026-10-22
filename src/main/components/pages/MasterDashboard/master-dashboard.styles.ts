import { styled } from '@mui/material';
import { bodyFont, headingFont } from 'themes/dashboard-visuals.styles';

export const Dashboard = styled('div')({
  minHeight: '100vh',
  background: 'radial-gradient(ellipse at 45% 30%, #141c25 0%, #10151d 72%)',
  color: '#d6d3cc',
  fontFamily: bodyFont,
  fontSize: '1rem',
  '& button, & input': { fontFamily: 'inherit' },
});

export const Header = styled('header')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 16,
  height: 51,
  padding: '0 18px',
  borderBottom: '1px solid #443a30',
  background: 'rgba(10, 15, 22, 0.7)',
  '& h1': {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
    margin: 0,
    color: '#e8d5ac',
    fontFamily: headingFont,
    fontSize: '1rem',
    fontWeight: 500,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
  },
  '& nav': { display: 'flex', alignItems: 'center', gap: 20 },
  '& a': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    minWidth: 32,
    height: 32,
    borderRadius: 3,
    color: '#ce8c3e',
    '&:hover': { background: 'rgba(206,140,62,0.12)' },
    '&:focus-visible': { outline: '2px solid #e8b860', outlineOffset: 3 },
  },
  '& img': { width: 32, height: 32, objectFit: 'cover', border: '1px solid #79532c', borderRadius: 3 },
  '@media (max-width: 600px)': {
    padding: '0 12px',
    '& h1': { gap: 10, fontSize: '0.8rem', letterSpacing: '0.05em' },
    '& nav, & a': { gap: 8 },
  },
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
});

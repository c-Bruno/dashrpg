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
  gap: 0,
  minHeight: 52,
  padding: '0 12px',
  borderBottom: '1px solid #443a30',
  background: 'rgba(10, 15, 22, 0.7)',
  position: 'sticky',
  top: 0,
  zIndex: 2,
  '& h1': {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    flexShrink: 0,
    margin: 0,
    padding: '0 18px 0 4px',
    color: '#d8b779',
    fontFamily: headingFont,
    fontSize: '0.82rem',
    fontWeight: 600,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    '& svg': { color: '#d5a356' },
  },
  '& > nav:last-child': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
    flexShrink: 0,
    marginLeft: 'auto',
    paddingLeft: 8,
    '& a, & button': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 34,
      height: 36,
      padding: 0,
      border: 0,
      borderRadius: 3,
      color: '#ce8c3e',
      background: 'transparent',
      '&:hover': { background: 'rgba(206,140,62,0.12)' },
      '&:focus-visible': { outline: '2px solid #e8b860', outlineOffset: 1 },
    },
  },
  '& img': { width: 32, height: 32, objectFit: 'cover', border: '1px solid #79532c', borderRadius: 3 },
  '@media (max-width: 600px)': {
    flexWrap: 'wrap',
    padding: '0 8px',
    '& h1': { height: 48, gap: 8, padding: '0 8px 0 2px', fontSize: '0.72rem', letterSpacing: '0.04em' },
    '& > nav:last-child': { height: 48, paddingRight: 4 },
  },
  '@media (max-width: 420px)': {
    '& h1': { fontSize: '0.68rem' },
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
  scrollMarginTop: 60,
  '@media (max-width: 700px)': { scrollMarginTop: 108 },
});

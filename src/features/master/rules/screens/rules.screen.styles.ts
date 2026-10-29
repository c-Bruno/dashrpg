import { styled } from '@mui/material';
import { bodyFont, framedPanel, headingFont } from 'themes/dashboard-visuals.styles';

export const Page = styled('div')({
  minHeight: '100vh',
  background: 'radial-gradient(ellipse at 45% 30%, #141c25 0%, #10151d 72%)',
  color: '#d6d3cc',
  fontFamily: bodyFont,
});

export const Content = styled('main')({
  maxWidth: 1560,
  margin: '0 auto',
  padding: '30px 28px 36px',
  '@media (max-width: 700px)': { padding: '22px 14px 28px' },
});

export const Intro = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 18,
  marginBottom: 24,
  '& > svg': { color: '#ce8c3e' },
  '& h2': {
    margin: 0,
    color: '#ead6af',
    fontFamily: headingFont,
    fontSize: '1.55rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
  '& p': { margin: '4px 0 0', color: '#939eac', fontSize: '1rem' },
  '@media (max-width: 500px)': {
    gap: 12,
    '& > svg': { width: 30, height: 30 },
    '& h2': { fontSize: '1.12rem' },
    '& p': { fontSize: '0.9rem' },
  },
});

export const ConfigurationGrid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'minmax(280px, 0.92fr) minmax(0, 1.12fr)',
  gap: 18,
  alignItems: 'stretch',
  '@media (max-width: 900px)': { gridTemplateColumns: 'minmax(0, 1fr)' },
});

export const Panel = styled('section')({
  ...framedPanel,
  minWidth: 0,
  padding: '14px 18px 16px',
  '@media (max-width: 500px)': { padding: '12px 12px 14px' },
});

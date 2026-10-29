import { styled } from '@mui/material';
import Link from 'next/link';
import { bodyFont } from 'themes/dashboard-visuals.styles';

interface NavigationLinkProps {
  isActive: boolean;
}

const tabStyles = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 10,
  minHeight: 50,
  padding: '0 18px',
  border: 0,
  borderBottom: '3px solid transparent',
  background: 'transparent',
  color: '#c5c9ce',
  fontFamily: bodyFont,
  fontSize: '0.95rem',
  fontWeight: 600,
  lineHeight: 1,
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  '& svg': { color: '#d5a356' },
};

export const Navigation = styled('nav')({
  display: 'flex',
  alignItems: 'stretch',
  alignSelf: 'stretch',
  minWidth: 0,
  overflowX: 'auto',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': { display: 'none' },
  '& > * + *': { borderLeft: '1px solid rgba(118, 107, 94, 0.2)' },
  '@media (max-width: 700px)': {
    width: '100%',
    order: 3,
    borderTop: '1px solid rgba(118, 107, 94, 0.25)',
  },
});

export const NavigationLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<NavigationLinkProps>(({ isActive }) => ({
  ...tabStyles,
  borderBottomColor: isActive ? '#d5a356' : 'transparent',
  color: isActive ? '#f0e6d3' : '#a9afb6',
  boxShadow: isActive ? 'inset 0 -5px 12px -12px #d5a356' : 'none',
  '&:hover': { color: '#f0e6d3', background: 'rgba(213, 163, 86, 0.07)' },
  '&:focus-visible': { outline: '2px solid #e8b860', outlineOffset: -3 },
  '@media (max-width: 900px)': { padding: '0 12px', gap: 7, fontSize: '0.88rem' },
  '@media (max-width: 700px)': { minHeight: 44 },
}));

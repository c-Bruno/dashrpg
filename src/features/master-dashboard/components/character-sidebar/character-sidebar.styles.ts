import { styled, Typography } from '@mui/material';
import { bodyFont, framedPanel, headingFont } from 'themes/dashboard-visuals.styles';

interface ItemProps {
  isCritical?: boolean;
  isDead?: boolean;
  isSelected?: boolean;
}

export const SidebarContainer = styled('aside')({
  ...framedPanel,
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  isolation: 'isolate',
  overflow: 'hidden',
  boxSizing: 'border-box',
  minHeight: 'calc(100vh - 95px)',
  '@media (max-width: 800px)': { minHeight: 0, height: 'auto' },
});

export const SidebarHeader = styled('div')({
  padding: '8px 14px 6px',
  minHeight: 45,
  borderBottom: '1px solid #393a37',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 12,
  position: 'relative',
  zIndex: 1,
  '& button': { borderColor: '#94662f', borderRadius: 3, color: '#d9a14d' },
});

export const SidebarTitle = styled(Typography)({
  fontSize: '1rem',
  fontFamily: headingFont,
  fontWeight: 400,
  textTransform: 'uppercase',
  color: '#e8d5ac',
  textShadow: '0 2px 3px rgba(0, 0, 0, 0.6)',
});

export const SidebarList = styled('div')({
  flex: '0 1 auto',
  minHeight: 0,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: '4px 4px 190px',
  position: 'relative',
  zIndex: 1,
  scrollbarWidth: 'thin',
  scrollbarColor: '#484036 transparent',
  '&::-webkit-scrollbar': {
    width: 4,
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#484036',
    borderRadius: 2,
  },
  '@media (max-width: 800px)': {
    flexDirection: 'row',
    overflowX: 'auto',
    padding: '8px',
    '& > button': { width: 200 },
  },
});

export const SidebarBackground = styled('div')({
  position: 'absolute',
  bottom: -1,
  left: 0,
  right: 0,
  height: 300,
  backgroundImage: 'url(/assets/dark-fantasy-pixel-art-background.webp)',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center 65%',
  maskImage: 'linear-gradient(to bottom, transparent, #000 20%)',
  opacity: 0.85,
  pointerEvents: 'none',
  zIndex: 0,
  '@media (max-width: 800px)': { display: 'none' },
});

export const SidebarItem = styled('button', {
  shouldForwardProp: (prop) => prop !== 'isCritical' && prop !== 'isDead' && prop !== 'isSelected',
})<ItemProps>(({ isSelected, isCritical, isDead }) => ({
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
  width: '100%',
  minHeight: 68,
  gap: 14,
  padding: '6px 8px',
  margin: 0,
  fontFamily: bodyFont,
  textAlign: 'left',
  cursor: 'pointer',
  position: 'relative',
  borderRadius: 2,
  border: `1px solid ${isSelected ? '#af7d3d' : 'transparent'}`,
  background: isSelected ? 'linear-gradient(110deg, rgba(137, 98, 48, 0.14), rgba(24, 26, 27, 0.8))' : 'transparent',
  boxShadow: isSelected ? 'inset 0 0 0 2px #13181b, 0 0 8px rgba(0, 0, 0, 0.25)' : 'none',
  opacity: isDead ? 0.5 : 1,
  transition: 'background 0.15s ease, border-color 0.15s ease',
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 3,
    pointerEvents: 'none',
    opacity: isSelected ? 1 : 0,
    background: [
      'linear-gradient(#d5a65f, #d5a65f) left top / 5px 1px',
      'linear-gradient(#d5a65f, #d5a65f) left top / 1px 5px',
      'linear-gradient(#d5a65f, #d5a65f) right top / 5px 1px',
      'linear-gradient(#d5a65f, #d5a65f) right top / 1px 5px',
      'linear-gradient(#d5a65f, #d5a65f) left bottom / 5px 1px',
      'linear-gradient(#d5a65f, #d5a65f) left bottom / 1px 5px',
      'linear-gradient(#d5a65f, #d5a65f) right bottom / 5px 1px',
      'linear-gradient(#d5a65f, #d5a65f) right bottom / 1px 5px',
    ].join(','),
    backgroundRepeat: 'no-repeat',
  },
  '&:hover:not(:disabled)': {
    backgroundColor: 'rgba(172, 131, 69, 0.1)',
    borderColor: isSelected ? '#d5a65f' : 'rgba(175, 125, 61, 0.35)',
  },
  '&:focus-visible': {
    outline: '2px solid #e8b860',
    outlineOffset: -2,
  },
  '& img': {
    filter: isDead ? 'grayscale(1)' : 'none',
    objectFit: 'cover',
    objectPosition: 'center 25%',
  },
  '& > span:first-of-type': {
    border: `1px solid ${isSelected ? '#ac7736' : '#343a40'}`,
    borderRadius: 2,
  },
  '& > span:last-of-type > span:first-of-type': { fontSize: '1rem', color: '#dcd8ce' },
  '& > span:last-of-type > span:last-of-type:not(:first-of-type)': { fontSize: '0.9rem', color: '#8e98a7' },
  ...(isCritical &&
    !isDead && {
      '& img': {
        boxShadow: '0 0 0 1px rgba(204, 81, 66, 0.7)',
      },
    }),
}));

import { styled } from '@mui/material';

const GOLD = '#d49a49';

interface OptionProps {
  isSelected: boolean;
}

export const Grid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  width: '100%',
  gap: 16,
  '@media (max-width: 560px)': {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  },
});

export const Option = styled('button', {
  shouldForwardProp: (prop) => prop !== 'isSelected',
})<OptionProps>(({ isSelected }) => ({
  position: 'relative',
  display: 'block',
  width: '100%',
  aspectRatio: '1',
  padding: 4,
  overflow: 'hidden',
  cursor: 'pointer',
  border: `1px solid ${isSelected ? GOLD : 'rgba(180, 126, 62, 0.48)'}`,
  borderRadius: 2,
  background: '#101820',
  boxShadow: isSelected ? `0 0 0 1px ${GOLD}, 0 0 14px rgba(201, 145, 70, 0.18)` : 'none',
  transition: 'border-color 140ms ease, box-shadow 140ms ease, transform 140ms ease',
  '&:hover': {
    borderColor: GOLD,
    transform: 'translateY(-2px)',
  },
  '&:focus-visible': {
    outline: '2px solid #e8b860',
    outlineOffset: 2,
  },
  '& img': {
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center 25%',
  },
}));

export const SelectedMark = styled('span')({
  position: 'absolute',
  top: 3,
  right: 3,
  width: 20,
  height: 20,
  display: 'grid',
  placeItems: 'center',
  color: '#111820',
  background: '#e7ae5b',
  fontSize: '0.9rem',
  fontWeight: 800,
  lineHeight: 1,
});

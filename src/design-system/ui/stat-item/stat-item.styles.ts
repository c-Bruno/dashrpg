import { styled } from '@mui/material';

export const ItemInfo = styled('span')({
  flex: 1,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 5,
});

export const ItemName = styled('span')<{ fontSize?: string }>(({ fontSize }) => ({
  fontSize: fontSize || '0.85rem',
  fontWeight: 400,
  color: '#f0ede6',
  lineHeight: 1.3,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  textShadow: '0 1px 2px #000',
}));

export const ItemSubtitle = styled('span')({
  color: '#a9adb4',
  lineHeight: 1.3,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

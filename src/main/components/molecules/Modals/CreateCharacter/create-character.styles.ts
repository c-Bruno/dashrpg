import { Typography, styled } from '@mui/material';
import Image from 'next/image';

const GOLD = 'rgba(201, 168, 76, 0.75)';

export const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const PortraitSection = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  padding: '16px 0 8px',
  background: `radial-gradient(ellipse at center, rgba(201, 168, 76, 0.08) 0%, transparent 70%)`,
});

export const PortraitPreview = styled(Image)({
  borderRadius: '50%',
  objectFit: 'cover',
  border: `2px solid ${GOLD}`,
  boxShadow: `0 0 18px rgba(201, 168, 76, 0.2), 0 0 40px rgba(201, 168, 76, 0.06)`,
  transition: 'border-color 0.3s, box-shadow 0.3s',
});
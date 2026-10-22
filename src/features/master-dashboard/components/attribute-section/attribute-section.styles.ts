import { Box, styled } from '@mui/material';

export const AttributeSectionContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  minHeight: 54,
  padding: '8px 10px',
  border: '1px solid rgba(191, 122, 65, 0.2)',
  background: 'linear-gradient(135deg, rgba(129, 77, 46, 0.12), rgba(255, 255, 255, 0.015))',
});

export const AttributeName = styled('span')(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontFamily: 'Georgia, "Times New Roman", serif',
  fontSize: '0.78rem',
}));

export const AttributeValue = styled('span')(({ theme }) => ({
  color: theme.palette.warning.main,
  fontSize: '0.9rem',
  fontWeight: 600,
}));

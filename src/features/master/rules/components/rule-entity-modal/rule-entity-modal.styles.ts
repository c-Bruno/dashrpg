import {
  Button,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormLabel,
  styled,
  TextField,
} from '@mui/material';
import { bodyFont, headingFont } from 'themes/dashboard-visuals.styles';

export const FieldLabel = styled(FormLabel)({
  display: 'block',
  marginBottom: 7,
  color: '#c2c8d0',
  fontSize: '0.9rem',
  fontFamily: 'inherit',
  fontWeight: 400,
  lineHeight: 1.5,
});

export const FieldGroup = styled('div')({
  display: 'grid',
});

export const RulesDialog = styled(Dialog)({
  '& .MuiDialog-paper': {
    width: '100%',
    maxWidth: 560,
    margin: 16,
    border: '1px solid #a76d31',
    borderRadius: 3,
    color: '#d6d3cc',
    background: 'linear-gradient(145deg, #121a22, #0c131a)',
    boxShadow: '0 22px 70px rgba(0,0,0,0.75)',
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 4,
      pointerEvents: 'none',
      border: '1px solid rgba(173, 121, 63, 0.2)',
    },
  },
});

export const DialogHeader = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 14,
  minHeight: 64,
  boxSizing: 'border-box',
  flexShrink: 0,
  padding: '12px 20px',
  borderBottom: '1px solid #2b323a',
  color: '#d9a04d',
  '& .MuiIconButton-root': {
    display: 'grid',
    placeItems: 'center',
    padding: 5,
    border: 0,
    borderRadius: 3,
    color: '#8d98a5',
    background: 'transparent',
    cursor: 'pointer',
    '&:hover': { color: '#e8d5ac', background: 'rgba(255,255,255,0.06)' },
  },
});

export const DialogHeading = styled(DialogTitle)({
  flex: 1,
  margin: 0,
  padding: 0,
  color: '#e8d5ac',
  fontFamily: headingFont,
  fontSize: '1.05rem',
  fontWeight: 'bold',
  lineHeight: 1.5,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
});

export const DialogBody = styled(DialogContent)({
  display: 'grid',
  gap: 16,
  padding: '18px 22px 22px',
});

export const DialogField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    height: 40,
    borderRadius: 4,
    color: '#d6dce3',
    background: '#101821',
    font: `500 0.95rem ${bodyFont}`,
    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#39434e' },
    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#39434e' },
    '&.Mui-focused': {
      boxShadow: '0 0 0 1px #c1843d',
      '& .MuiOutlinedInput-notchedOutline': { borderColor: '#c1843d', borderWidth: 1 },
    },
  },
  '& .MuiInputBase-input': {
    boxSizing: 'border-box',
    height: '100%',
    padding: '0 11px',
    font: 'inherit',
    '&::placeholder': { color: '#687585', opacity: 1 },
  },
  '& .MuiNativeSelect-select': {
    paddingRight: 32,
    '& option': { color: '#d6dce3', background: '#101821' },
  },
});

export const IconHelp = styled('p')({
  margin: '-3px 0 0',
  color: '#83909e',
  fontSize: '0.82rem',
});

export const IconGrid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
  gap: 8,
  '@media (max-width: 420px)': {
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
  },
});

export const IconOption = styled(ButtonBase)({
  position: 'relative',
  display: 'grid',
  placeItems: 'center',
  aspectRatio: '1',
  minWidth: 0,
  padding: 6,
  border: '1px solid #2c3742',
  borderRadius: 4,
  color: '#bdc6d0',
  background: '#111922',
  '&:hover': { borderColor: '#90662f', background: '#17212b' },
  '&[aria-pressed="true"]': {
    borderColor: '#e0a441',
    color: '#f0b552',
    boxShadow: 'inset 0 0 0 1px #e0a441',
    background: '#1d252a',
  },
  '& svg': { width: 32, height: 32 },
  '& > span:not(.MuiTouchRipple-root)': {
    position: 'absolute',
    top: 0,
    right: 0,
    display: 'grid',
    placeItems: 'center',
    width: 20,
    height: 20,
    borderRadius: '0 3px 0 3px',
    color: '#14181b',
    background: '#f0b552',
    fontSize: '0.7rem',
  },
  '&:focus-visible': { outline: '2px solid #e8b860', outlineOffset: 2 },
});

export const DialogFooter = styled(DialogActions)({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 10,
  padding: '14px 20px',
  borderTop: '1px solid #2b323a',
  '& > :not(style) ~ :not(style)': { marginLeft: 0 },
});

export const DialogButton = styled(Button)({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  minWidth: 112,
  minHeight: 40,
  padding: '0 14px',
  border: '1px solid #46515d',
  borderRadius: 3,
  color: '#c1c8d1',
  background: 'transparent',
  fontFamily: bodyFont,
  fontWeight: 600,
  textTransform: 'uppercase',
  '&:hover': { background: 'rgba(255,255,255,0.04)' },
  '&.Mui-disabled': { color: '#c1c8d1', opacity: 0.55, cursor: 'wait' },
  '&[data-variant="primary"]': {
    borderColor: '#e6a641',
    color: '#14181b',
    background: '#e6a641',
    '&:hover': { background: '#f0b550' },
    '&.Mui-disabled': { color: '#14181b', background: '#e6a641' },
  },
});

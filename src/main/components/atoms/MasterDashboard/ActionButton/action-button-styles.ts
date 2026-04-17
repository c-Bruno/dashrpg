import { styled } from '@mui/material';

type ContainerProps = {
  $outline?: 'none' | 'solid' | 'dashed';
  $color?: string;
};

const getBorder = (outline: ContainerProps['$outline'], color: string) => {
  if (!outline || outline === 'none') return 'none';
  return `0.5px ${outline} ${color}`;
};

export const Container = styled('div')<ContainerProps>(({ theme, $outline, $color }) => {
  const borderColor = $color || theme.palette.grey[500];
  const fontColor = $color || theme.palette.text.primary;

  return {
    color: fontColor,
    width: '100%',
    height: '100%',
    display: 'flex',
    padding: theme.spacing(2),
    cursor: 'pointer',
    borderRadius: '8px',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    background: '#242424',
    border: getBorder($outline, borderColor),
  };
});

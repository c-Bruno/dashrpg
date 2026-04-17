import { Favorite, BarcodeReader } from '@mui/icons-material';

import * as S from './status-bar-styles';

type StatusBarProps = {
  withIcon?: boolean;
  total?: string;
  current?: string;
  percent: number;
  variant?: 'life' | 'sanity';
};

type ColorMapType = { label: string; icon?: typeof Favorite; barColor: string; trackColor: string; gradient: string };

const COLOR_MAP: Record<string, ColorMapType> = {
  life: {
    label: 'Vida',
    icon: Favorite,
    barColor: '#8b0000',
    trackColor: 'rgba(100, 1, 1, 0.12)',
    gradient: 'linear-gradient(90deg, #640101, #c41e1e)',
  },
  sanity: {
    label: 'Sanidade',
    icon: BarcodeReader,
    barColor: '#2d5be3',
    trackColor: 'rgba(45, 91, 227, 0.10)',
    gradient: 'linear-gradient(90deg, #1a3bbf, #4a78ff)',
  },
} as const;

/**
 * A reusable component that displays a status bar (like HP or Sanity)
 * with a label showing current and total values.
 */
const StatusBar = ({ percent, variant = 'life', total, current, withIcon = false }: StatusBarProps) => {
  const { barColor, trackColor, gradient, icon: Icon, label } = COLOR_MAP[variant];

  return (
    <S.StatusBox>
      {withIcon && Icon && (
        <>
          <Icon sx={{ color: barColor, flexShrink: 0 }} />
          <S.StatNameLabel>{label}</S.StatNameLabel>
        </>
      )}
      <S.StatusBar
        variant='determinate'
        value={percent}
        barColor={barColor}
        trackColor={trackColor}
        gradient={gradient}
      />
      <S.StatusLabel>
        {current}/{total}
      </S.StatusLabel>
    </S.StatusBox>
  );
};

export default StatusBar;

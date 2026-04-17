import { Favorite, BarcodeReader } from '@mui/icons-material';

import * as S from './status-bar-styles';

type StatusBarProps = {
  withIcon?: boolean;
  total?: string;
  current?: string;
  percent: number;
  variant?: 'life' | 'sanity';
};

type ColorMapType = { icon?: typeof Favorite; barColor: string; trackColor: string };

const COLOR_MAP: Record<string, ColorMapType> = {
  life: { icon: Favorite, barColor: '#E80A67', trackColor: 'rgba(232, 10, 103, 0.15)' },
  sanity: { icon: BarcodeReader, barColor: '#1e45b6', trackColor: 'rgba(30, 69, 182, 0.15)' },
} as const;

/**
 * A reusable component that displays a status bar (like HP or Sanity)
 * with a label showing current and total values.
 */
const StatusBar = ({ percent, variant = 'life', total, current, withIcon = false }: StatusBarProps) => {
  const { barColor, trackColor, icon: Icon } = COLOR_MAP[variant];

  return (
    <S.StatusBox>
      {withIcon && Icon && <Icon sx={{ color: barColor, flexShrink: 0 }} />}
      <S.StatusBar variant='determinate' value={percent} barColor={barColor} trackColor={trackColor} />
      <S.StatusLabel>
        {current}/{total}
      </S.StatusLabel>
    </S.StatusBox>
  );
};

export default StatusBar;

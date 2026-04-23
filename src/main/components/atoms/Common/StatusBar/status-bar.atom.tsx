import * as S from './status-bar-styles';
import { COLOR_MAP } from './status-bar.content';

type StatusBarProps = {
  withIcon?: boolean;
  total?: string;
  current?: string;
  percent: number;
  variant?: 'life' | 'sanity';
  onClick?: () => void;
};

/**
 * A reusable component that displays a status bar (like HP or Sanity)
 * with a label showing current and total values.
 */
const StatusBar = ({ percent, variant = 'life', total, current, withIcon = false, onClick }: StatusBarProps) => {
  const { barColor, trackColor, gradient, icon: Icon, label } = COLOR_MAP[variant];

  return (
    <S.StatusBox onClick={onClick}>
      {withIcon && Icon && <Icon sx={{ color: barColor, flexShrink: 0 }} />}
      <S.StatNameLabel>{label}</S.StatNameLabel>

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

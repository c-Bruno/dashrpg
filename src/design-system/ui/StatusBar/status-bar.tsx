import type { ReactNode } from 'react';
import React from 'react';

import * as S from './status-bar-styles';

type Interactivity = {
  /** ARIA role — ex: "button" */
  role: string;
  tabIndex: number;
  ariaLabel: string;
  onClick: () => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
};

type StatusBarProps = {
  value: number;
  label: string;
  barColor: string;
  trackColor: string;
  gradient?: string;
  icon?: ReactNode;
  compact?: boolean;
  withIcon?: boolean;
  formattedValue?: string;
  interactive?: Interactivity;
};

const StatusBar = ({
  value,
  label,
  barColor,
  trackColor,
  gradient,
  icon,
  compact = false,
  withIcon = false,
  formattedValue,
  interactive,
}: StatusBarProps) => (
  <S.StatusBox
    compact={compact}
    withIcon={withIcon}
    role={interactive?.role}
    tabIndex={interactive?.tabIndex}
    aria-label={interactive?.ariaLabel}
    onKeyDown={interactive?.onKeyDown}
    onClick={interactive?.onClick}>
    {withIcon && icon && (
      <span data-slot='icon' style={{ color: barColor }}>
        {icon}
      </span>
    )}

    <S.StatusBarLabel data-slot='label'>{label}</S.StatusBarLabel>

    <S.StatusBar
      variant='determinate'
      value={value}
      barColor={barColor}
      trackColor={trackColor}
      gradient={gradient}
      compact={compact}
      aria-label={label}
    />

    {formattedValue && <S.StatusBarLabel data-slot='value'>{formattedValue}</S.StatusBarLabel>}
  </S.StatusBox>
);

export default StatusBar;

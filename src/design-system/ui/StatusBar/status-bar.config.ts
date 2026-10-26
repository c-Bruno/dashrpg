import type { ComponentType } from 'react';

import { Favorite, BarcodeReader } from '@mui/icons-material';
import { SvgIconProps } from '@mui/material';
import { StatusBarEnum } from 'common/enums';

export type StatusBarConfig = {
  label: string;
  icon: ComponentType<SvgIconProps>;
  barColor: string;
  trackColor: string;
  gradient: string;
};

const CONFIG_MAP: Record<StatusBarEnum, StatusBarConfig> = {
  [StatusBarEnum.Life]: {
    label: 'Vida',
    icon: Favorite,
    barColor: '#d44',
    trackColor: 'rgba(200, 60, 60, 0.10)',
    gradient: 'linear-gradient(90deg, #a22, #d44)',
  },
  [StatusBarEnum.Sanity]: {
    label: 'Sanidade',
    icon: BarcodeReader,
    barColor: '#6b8fc4',
    trackColor: 'rgba(107, 143, 196, 0.10)',
    gradient: 'linear-gradient(90deg, #4a6a94, #6b8fc4)',
  },
} as const;

/** Retorna a config visual para uma variante de status bar */
export const statusBarConfig = (variant: StatusBarEnum): StatusBarConfig => CONFIG_MAP[variant];

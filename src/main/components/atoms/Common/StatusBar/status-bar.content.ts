import { Favorite, BarcodeReader } from '@mui/icons-material';

type ColorMapType = { label: string; icon?: typeof Favorite; barColor: string; trackColor: string; gradient: string };

export const COLOR_MAP: Record<string, ColorMapType> = {
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

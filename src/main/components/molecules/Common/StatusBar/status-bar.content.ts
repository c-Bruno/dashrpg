import { Favorite, BarcodeReader } from '@mui/icons-material';

type ColorMapType = { label: string; icon?: typeof Favorite; barColor: string; trackColor: string; gradient: string };

export const COLOR_MAP: Record<string, ColorMapType> = {
  life: {
    label: 'Vida',
    icon: Favorite,
    barColor: '#d44',
    trackColor: 'rgba(200, 60, 60, 0.10)',
    gradient: 'linear-gradient(90deg, #a22, #d44)',
  },
  sanity: {
    label: 'Sanidade',
    icon: BarcodeReader,
    barColor: '#6b8fc4',
    trackColor: 'rgba(107, 143, 196, 0.10)',
    gradient: 'linear-gradient(90deg, #4a6a94, #6b8fc4)',
  },
} as const;

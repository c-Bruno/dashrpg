import { Box } from '@mui/material';
import type { ChipPropsVariantOverrides } from '@mui/material/Chip';
import type { OverridableStringUnion } from '@mui/types';

import * as S from './centered-box.styles';

interface CenteredBoxProps {
  label?: string;
  color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  variant?: OverridableStringUnion<'filled' | 'outlined', ChipPropsVariantOverrides>;
}

/**
 * CenteredBox component is a reusable UI element that displays a label centered within a box.
 * The component uses Material-UI's Box and Chip components for styling and layout.
 */
const CenteredBox = ({ label, color = 'default', variant = 'outlined' }: CenteredBoxProps) => (
  <Box sx={{ width: 500 }}>
    <S.CenteredChip label={label} color={color} size='medium' style={{ width: '50%' }} variant={variant} />
  </Box>
);

export default CenteredBox;

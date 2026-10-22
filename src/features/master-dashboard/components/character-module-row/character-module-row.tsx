import type { ReactNode } from 'react';

import { Box } from '@mui/material';
import { DashboardIcon } from 'design-system/ui';

import * as S from './character-module-row.styles';

type ValueTone = 'default' | 'accent' | 'danger';

interface CharacterModuleRowProps {
  name: string;
  value?: string | number;
  detail?: string;
  valueTone?: ValueTone;
  icon?: ReactNode;
  variant?: 'list' | 'framed' | 'combat';
}

const CharacterModuleRow = ({
  name,
  value,
  detail,
  valueTone = 'default',
  icon,
  variant = 'list',
}: CharacterModuleRowProps) => (
  <S.Row data-variant={variant}>
    {icon && <S.Icon>{icon}</S.Icon>}

    <Box sx={{ minWidth: 0, flex: 1 }}>
      <S.Name>{name}</S.Name>
      {detail && <S.Detail>{detail}</S.Detail>}
    </Box>

    {value !== undefined && (
      <S.Value data-tone={valueTone}>
        {variant === 'combat' && <DashboardIcon name='dice' size={28} />}
        {value}
      </S.Value>
    )}
  </S.Row>
);

export default CharacterModuleRow;

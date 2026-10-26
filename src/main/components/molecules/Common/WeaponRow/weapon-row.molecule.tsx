import { Delete, Edit, GpsFixed } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

import { DEFAULT_TYPE, TYPE_CONFIG } from './weapon-row.styles';
import * as S from './weapon-row.styles';

export interface WeaponRowData {
  id: number;
  weapon: string;
  type?: string;
  damage?: string;
  current_load?: string;
  total_load?: string;
  inventory_id?: number | null;
}

interface WeaponRowProps {
  row: WeaponRowData;
  onRollDice: () => void;
  onShoot: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const getAmmoColor = (percent: number) => {
  if (percent > 50) return 'rgba(80, 200, 100, 0.7)';
  if (percent > 20) return 'rgba(220, 180, 50, 0.8)';
  return 'rgba(220, 60, 60, 0.75)';
};

const WeaponRow = ({ row, onRollDice, onShoot, onEdit, onDelete }: WeaponRowProps) => {
  const typeConfig = (row.type && TYPE_CONFIG[row.type]) || DEFAULT_TYPE;
  const isFirearm = row.type === 'Balistico';

  const current = Number(row.current_load ?? 0);
  const total = Number(row.total_load ?? 0);
  const ammoPercent = total > 0 ? (current / total) * 100 : 0;
  const hasAmmo = current > 0;

  return (
    <S.Row>
      <S.TypeIcon>{typeConfig.icon}</S.TypeIcon>

      <S.Identity>
        <S.WeaponName>{row.weapon}</S.WeaponName>
        {row.type && (
          <S.TypeBadge
            label={row.type.toUpperCase()}
            size='small'
            typeColor={typeConfig.color}
            typeBg={typeConfig.bg}
            typeBorder={typeConfig.border}
          />
        )}
      </S.Identity>

      {row.damage && (
        <S.DamagePill onClick={onRollDice}>
          <S.DiceEmoji>🎲</S.DiceEmoji>
          {row.damage}
        </S.DamagePill>
      )}

      {isFirearm && (
        <S.AmmoSection>
          <S.AmmoBar variant='determinate' value={Math.min(ammoPercent, 100)} fillColor={getAmmoColor(ammoPercent)} />
          <S.AmmoText>
            {current}/{total}
          </S.AmmoText>
          <Tooltip title={hasAmmo ? 'Atirar' : 'Sem munição'}>
            <span>
              <IconButton size='small' color='error' disabled={!hasAmmo} onClick={onShoot}>
                <GpsFixed sx={{ fontSize: 18 }} />
              </IconButton>
            </span>
          </Tooltip>
        </S.AmmoSection>
      )}

      <S.Actions>
        <Tooltip title='Editar'>
          <IconButton size='small' onClick={onEdit}>
            <Edit sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title='Remover'>
          <IconButton size='small' color='error' onClick={onDelete}>
            <Delete sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
      </S.Actions>
    </S.Row>
  );
};

export type { WeaponRowData };
export default WeaponRow;

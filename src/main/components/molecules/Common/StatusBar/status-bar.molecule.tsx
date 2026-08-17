import { toast } from 'react-toastify';

import { StatusBarEnum } from 'common/enums';
import { ProgressBarHelper } from 'common/helpers';
import { useFetchMutation, useModal } from 'common/hooks';
import { socket } from 'common/libs';
import { CharacterService } from 'core/services';
import { StatusBarModal } from 'main/components/molecules';

import * as S from './status-bar-styles';
import { COLOR_MAP } from './status-bar.content';

type StatusBarProps = {
  characterId?: number;
  withIcon?: boolean;
  total?: number;
  current?: number;
  variant?: StatusBarEnum;
  setCharacter?: any;
};

/**
 * A reusable component that displays a status bar (like HP or Sanity)
 * with a label showing current and total values.
 */
const StatusBar = ({
  characterId,
  variant = StatusBarEnum.Life,
  total,
  current,
  withIcon = false,
  setCharacter,
}: StatusBarProps) => {
  const isHP = variant === StatusBarEnum.Life; // Determine if this is the HP bar or the Sanity bar based on the variant
  const { barColor, trackColor, gradient, icon: Icon, label } = COLOR_MAP[variant];

  const { trigger } = useFetchMutation(CharacterService.updateCharacter, {
    onSuccess: (_data, params) => {
      const { ...updateData } = params;
      setCharacter((prev) => (prev ? { ...prev, ...updateData } : prev));

      socket.emit(isHP ? 'update_hit_points' : 'update_sanity_points', {
        character_id: params.character_id,
        current: isHP ? updateData.current_hit_points : updateData.current_sanity_points,
        max: isHP ? updateData.max_hit_points : updateData.max_sanity_points,
      });
    },
    onError: () => toast.error('Erro ao atualizar o personagem!'),
  });

  // Function to handle the update of HP or Sanity points when the modal form is submitted
  const updatePoints = async (newData: { current: string; max: string }) => {
    const data = {
      [isHP ? 'current_hit_points' : 'current_sanity_points']: Number(newData.current),
      [isHP ? 'max_hit_points' : 'max_sanity_points']: Number(newData.max),
    };

    trigger({ character_id: characterId, ...data }); // This will call the API to update the character on the server
  };

  const percent = ProgressBarHelper.Percentage(current, total);

  const updateStatusbarModal = useModal(({ close }) => (
    <StatusBarModal
      type={variant}
      onSubmit={async (newData) => {
        await updatePoints(newData);
        close();
      }}
      handleClose={close}
      data={{ current, max: total }}
    />
  ));

  return (
    <S.StatusBox onClick={characterId ? () => updateStatusbarModal.appear() : undefined}>
      {withIcon && Icon && <Icon sx={{ color: barColor, flexShrink: 0 }} />}
      <S.StatusBarLabel>{label}</S.StatusBarLabel>

      <S.StatusBar
        variant='determinate'
        value={percent}
        barColor={barColor}
        trackColor={trackColor}
        gradient={gradient}
      />
      <S.StatusBarLabel>
        {current}/{total}
      </S.StatusBarLabel>
    </S.StatusBox>
  );
};

export default StatusBar;

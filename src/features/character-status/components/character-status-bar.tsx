import type { ComponentProps } from 'react';

import { StatusBarEnum } from 'common/enums';
import { ProgressBarHelper } from 'common/helpers';
import { useFetchMutation, useModal } from 'common/hooks';
import { socket } from 'common/libs';
import type { Character } from 'common/types';
import { CharacterService } from 'core/services';
import { StatusBar, statusBarConfig } from 'design-system/ui';

import StatusBarModal from './status-bar-modal';

type StatusUpdates = Pick<
  Character,
  'current_hit_points' | 'max_hit_points' | 'current_sanity_points' | 'max_sanity_points'
>;

type CharacterStatusBarProps = Pick<ComponentProps<typeof StatusBar>, 'compact' | 'withIcon' | 'icon'> & {
  character: Character;
  variant?: StatusBarEnum;
  onCharacterUpdate: (updates: StatusUpdates) => void;
};

type CharacterStatusEditorProps = Pick<CharacterStatusBarProps, 'onCharacterUpdate'> & {
  characterId: number;
  variant: StatusBarEnum;
  data: { current: number; max: number };
  handleClose: () => void;
};

const CharacterStatusEditor = ({
  characterId,
  variant,
  data,
  onCharacterUpdate,
  handleClose,
}: CharacterStatusEditorProps) => {
  const isLife = variant === StatusBarEnum.Life;
  const { trigger, errors } = useFetchMutation(
    (updates: StatusUpdates) => CharacterService.updateCharacter({ character_id: characterId, ...updates }),
    {
      onSuccess: (_data, updates) => {
        onCharacterUpdate(updates);
        socket.emit(isLife ? 'update_hit_points' : 'update_sanity_points', {
          character_id: characterId,
          current: isLife ? updates.current_hit_points : updates.current_sanity_points,
          max: isLife ? updates.max_hit_points : updates.max_sanity_points,
        });
        handleClose();
      },
    },
  );

  return (
    <StatusBarModal
      type={variant}
      data={data}
      handleClose={handleClose}
      errorMessage={errors ? 'Erro ao atualizar o personagem! Tente novamente.' : undefined}
      onSubmit={({ current, max }) =>
        trigger(
          isLife
            ? { current_hit_points: current, max_hit_points: max }
            : { current_sanity_points: current, max_sanity_points: max },
        )
      }
    />
  );
};

const CharacterStatusBar = ({
  character,
  variant = StatusBarEnum.Life,
  onCharacterUpdate,
  icon,
  ...visualProps
}: CharacterStatusBarProps) => {
  const isLife = variant === StatusBarEnum.Life;
  const current = isLife ? character.current_hit_points : character.current_sanity_points;
  const max = isLife ? character.max_hit_points : character.max_sanity_points;
  const { icon: Icon, ...config } = statusBarConfig(variant);

  const editModal = useModal(({ close }: { close: () => void }) => (
    <CharacterStatusEditor
      characterId={character.id}
      variant={variant}
      data={{ current, max }}
      handleClose={close}
      onCharacterUpdate={onCharacterUpdate}
    />
  ));

  return (
    <StatusBar
      {...config}
      {...visualProps}
      icon={icon ?? <Icon />}
      value={ProgressBarHelper.Percentage(current, max)}
      formattedValue={`${current}/${max}`}
      interactive={
        character.id != null
          ? {
              role: 'button',
              tabIndex: 0,
              ariaLabel: `Editar ${config.label}: ${current}/${max}`,
              onClick: () => editModal.appear(),
              onKeyDown: (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  editModal.appear();
                }
              },
            }
          : undefined
      }
    />
  );
};

export default CharacterStatusBar;

import { ComponentProps } from 'react';

import { StatusBarEnum } from 'common/enums';
import type { Character } from 'common/types';
import { StatusBar } from 'design-system/ui';

export type StatusUpdates = Pick<
  Character,
  'current_hit_points' | 'max_hit_points' | 'current_sanity_points' | 'max_sanity_points'
>;

export type CharacterStatusBarProps = Pick<ComponentProps<typeof StatusBar>, 'compact' | 'withIcon' | 'icon'> & {
  character: Character;
  variant?: StatusBarEnum;
};

export type CharacterStatusEditorProps = {
  characterId: number;
  variant: StatusBarEnum;
  data: { current: number; max: number };
  handleClose: () => void;
};

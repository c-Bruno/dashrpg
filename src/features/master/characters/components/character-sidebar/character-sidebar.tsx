import { characterPicture, ProgressBarHelper } from 'common/helpers';
import { useModal } from 'common/hooks';
import type { Character } from 'common/types';
import { Avatar, Button, StatItem } from 'design-system/ui';
import { AddCharacterModal } from 'features/master/characters/components';

import * as S from './character-sidebar.styles';

interface CharacterSidebarProps {
  characters: Character[];
  selectedCharacterId: number | null;
  onSelectCharacter: (id: number) => void;
  onCharacterCreated: () => void;
}

const CharacterSidebar = ({
  characters,
  selectedCharacterId,
  onSelectCharacter,
  onCharacterCreated,
}: CharacterSidebarProps) => {
  const createCharacterModal = useModal(({ close }) => (
    <AddCharacterModal
      handleClose={() => {
        close();
        setTimeout(() => onCharacterCreated?.(), 100);
      }}
    />
  ));

  return (
    <S.SidebarContainer id='personagens' aria-label='Personagens'>
      <S.SidebarHeader>
        <S.SidebarTitle variant='h2'>Personagens</S.SidebarTitle>
        <Button onClick={() => createCharacterModal.appear()} />
      </S.SidebarHeader>

      <S.SidebarList>
        {characters.map((character) => {
          const isCritical =
            (character.current_hit_points ?? 0) > 0 &&
            ProgressBarHelper.Percentage(character.current_hit_points, character.max_hit_points) <= 25;
          const isDead = character.current_hit_points === 0;
          const isSelected = selectedCharacterId === character.id;

          return (
            <S.SidebarItem
              key={character.id}
              type='button'
              isCritical={isCritical}
              isDead={isDead}
              isSelected={isSelected}
              aria-pressed={isSelected}
              title={isDead ? `${character.name} (morto)` : character.name}
              onClick={() => onSelectCharacter(character.id)}>
              <Avatar src={characterPicture.getCharacterPictureURL(character)} size={70} />
              <StatItem label={character.name} description={character.occupation} />
            </S.SidebarItem>
          );
        })}
      </S.SidebarList>

      <S.SidebarBackground aria-hidden='true' />
    </S.SidebarContainer>
  );
};

export default CharacterSidebar;

import { StatusBarEnum } from 'common/enums';
import { characterPicture } from 'common/helpers';
import type { Character } from 'common/types';
import { Avatar, SectionPanel, DashboardIcon } from 'design-system/ui';
import { CharacterStatusBar } from 'features/character-status';
import {
  AttributeSection,
  CombatSection,
  InventorySection,
  SkillsSection,
} from 'features/master/characters/detail/components';

import * as S from './character-sheet.styles';

interface CharacterSheetProps {
  character: Character;
  onCharacterUpdate: (updates: Partial<Character>) => void;
}

const CharacterSheet = ({ character, onCharacterUpdate }: CharacterSheetProps) => {
  const pictureUrl = characterPicture.getCharacterPictureURL(character);
  const identityDetails = [
    { kind: 'gender', icon: 'gender', label: character.gender },
    { kind: 'age', icon: 'calendar', label: character.age != null ? `${character.age} anos` : undefined },
    { kind: 'birthplace', icon: 'pin', label: character.birthplace },
    { kind: 'player', icon: 'sheet', label: character.player_name ? `Jogador: ${character.player_name}` : undefined },
  ] as const;

  return (
    <S.SheetContainer>
      <S.OverviewCard>
        <S.OverviewRow>
          <Avatar src={pictureUrl} size={168} variant='square' avatarFrame />

          <S.IdentitySection>
            <S.SheetName>{character.name.charAt(0).toUpperCase() + character.name.slice(1)}</S.SheetName>
            {character.occupation && <S.SheetOccupation>{character.occupation}</S.SheetOccupation>}
            <S.IdentityDetails>
              {identityDetails
                .filter((detail) => detail.label)
                .map((detail) => (
                  <S.IdentityDetail key={detail.kind} data-kind={detail.kind}>
                    <DashboardIcon name={detail.icon} size={18} />
                    {detail.label}
                  </S.IdentityDetail>
                ))}
            </S.IdentityDetails>
          </S.IdentitySection>

          <S.StatsSection>
            <CharacterStatusBar
              character={character}
              onCharacterUpdate={onCharacterUpdate}
              icon={<DashboardIcon name='heart' />}
              withIcon
              compact
            />
            <CharacterStatusBar
              character={character}
              variant={StatusBarEnum.Sanity}
              onCharacterUpdate={onCharacterUpdate}
              icon={<DashboardIcon name='brain' />}
              withIcon
              compact
            />
          </S.StatsSection>
        </S.OverviewRow>
      </S.OverviewCard>

      <S.ModuleGrid>
        <SectionPanel title='Atributos' icon={<DashboardIcon name='strength' />}>
          <AttributeSection character={character} />
        </SectionPanel>

        <SectionPanel title='Perícias' icon={<DashboardIcon name='sparkles' />}>
          <SkillsSection character={character} />
        </SectionPanel>

        <SectionPanel title='Inventário' icon={<DashboardIcon name='bag' />}>
          <InventorySection character={character} />
        </SectionPanel>

        <SectionPanel title='Combate' icon={<DashboardIcon name='swords' size={32} />} fullWidth>
          <CombatSection character={character} />
        </SectionPanel>
      </S.ModuleGrid>
    </S.SheetContainer>
  );
};

export default CharacterSheet;

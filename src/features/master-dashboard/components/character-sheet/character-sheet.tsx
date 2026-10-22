import type { SetStateAction } from 'react';

import { StatusBarEnum } from 'common/enums';
import { characterPicture } from 'common/helpers';
import type { Character } from 'common/types';
import { Avatar, SectionPanel, DashboardIcon } from 'design-system/ui';
import { StatusBar } from 'main/components/molecules';

import AttributeSection from '../attribute-section/attribute-section';
import CombatSection from '../combat-section/combat-section';
import InventorySection from '../inventory-section/inventory-section';
import SkillsSection from '../skills-section/skills-section';
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

  const handleCharacterChange = (updater: SetStateAction<Character | null>) => {
    const updatedCharacter = typeof updater === 'function' ? updater(character) : updater;
    if (updatedCharacter) onCharacterUpdate(updatedCharacter);
  };

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
            <StatusBar
              total={character.max_hit_points}
              current={character.current_hit_points}
              variant={StatusBarEnum.Life}
              withIcon
              icon={<DashboardIcon name='heart' />}
              compact
              characterId={character.id}
              setCharacter={handleCharacterChange}
            />
            <StatusBar
              total={character.max_sanity_points}
              current={character.current_sanity_points}
              variant={StatusBarEnum.Sanity}
              withIcon
              icon={<DashboardIcon name='brain' />}
              compact
              characterId={character.id}
              setCharacter={handleCharacterChange}
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

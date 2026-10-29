import { SectionPanel } from 'design-system/ui';
import { CharacterModuleRow, StatsSection } from 'features/master/characters/detail/components';
import { useDashboardStore } from 'main/store';

import * as S from './character-sheet.styles';

const CharacterSheet = () => {
  const { selectedCharacterData: character } = useDashboardStore();

  return (
    <S.SheetContainer>
      <S.OverviewCard>
        <StatsSection character={character} />
      </S.OverviewCard>

      <S.ModuleGrid>
        <SectionPanel title='Atributos' icon='strength-outline'>
          {character?.attributes?.map(({ attribute_id, attribute: { name, icon_key }, value }) => (
            <CharacterModuleRow key={attribute_id} name={name} value={value} valueTone='accent' icon={icon_key} />
          ))}
        </SectionPanel>

        <SectionPanel title='Perícias' icon='sparkles'>
          {character?.skills?.map(({ skill_id, skill: { name, icon_key }, value }) => (
            <CharacterModuleRow key={skill_id} name={name} value={value} valueTone='accent' icon={icon_key} />
          ))}
        </SectionPanel>

        <SectionPanel title='Inventário' icon='bag'>
          {character?.inventory?.map(({ inventory_id, inventory: { description, weight } }) => (
            <CharacterModuleRow key={inventory_id} name={description} value={`${weight}kg`} />
          ))}
        </SectionPanel>

        <SectionPanel title='Combate' icon='swords' fullWidth>
          {character?.combat?.map(({ combat_id, combat: { weapon, type, damage } }) => (
            <CharacterModuleRow
              key={combat_id}
              name={weapon}
              detail={type}
              value={damage ?? '-'}
              valueTone='danger'
              variant='combat'
              icon={/arco|bal[ií]stic/i.test(`${weapon} ${type}`) ? 'bow' : 'swords'}
            />
          ))}
        </SectionPanel>
      </S.ModuleGrid>
    </S.SheetContainer>
  );
};

export default CharacterSheet;

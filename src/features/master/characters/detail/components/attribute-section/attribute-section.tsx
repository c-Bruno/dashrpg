import type { Character } from 'common/types';
import { RuleIcon } from 'design-system/ui';
import { CharacterModuleRow } from 'features/master/characters/detail/components';

import EmptySection from '../empty-section/empty-section';

interface AttributeSectionProps {
  character: Character;
}

const AttributeSection = ({ character }: AttributeSectionProps) => {
  const attrs = character.attributes ?? [];
  if (attrs.length === 0) return <EmptySection />;

  return (
    <>
      {attrs.map(({ attribute_id, attribute, value }) => (
        <CharacterModuleRow
          key={attribute_id}
          name={attribute?.name ?? 'Atributo sem nome'}
          value={value ?? '-'}
          valueTone='accent'
          icon={<RuleIcon iconKey={attribute?.icon_key ?? 'dumbbell'} size={30} />}
          variant='framed'
        />
      ))}
    </>
  );
};

export default AttributeSection;

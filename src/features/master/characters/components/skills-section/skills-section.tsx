import type { Character } from 'common/types';
import { DashboardIcon } from 'design-system/ui';
import { CharacterModuleRow, EmptySection } from 'features/master/characters/components';

interface SkillsSectionProps {
  character: Character;
}

const SkillsSection = ({ character }: SkillsSectionProps) => {
  const skills = character.skills ?? [];
  if (skills.length === 0) return <EmptySection />;

  return (
    <>
      {skills.map(({ skill_id, skill, value }) => (
        <CharacterModuleRow
          key={skill_id}
          name={skill?.name ?? 'Perícia sem nome'}
          value={value ?? '-'}
          valueTone='accent'
          icon={<DashboardIcon name='fist' size={30} />}
          variant='framed'
        />
      ))}
    </>
  );
};

export default SkillsSection;

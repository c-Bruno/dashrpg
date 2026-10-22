import type { Character } from 'common/types';
import { DashboardIcon } from 'design-system/ui';
import { CharacterModuleRow, EmptySection } from 'features/master-dashboard/components';

interface CombatSectionProps {
  character: Character;
}

const CombatSection = ({ character }: CombatSectionProps) => {
  const weapons = character.combat ?? [];
  if (weapons.length === 0) return <EmptySection />;

  return (
    <>
      {weapons.map(({ combat_id, combat }) => (
        <CharacterModuleRow
          key={combat_id}
          name={combat?.weapon ?? 'Arma sem nome'}
          detail={combat?.type}
          value={combat?.damage ?? '-'}
          valueTone='danger'
          variant='combat'
          icon={
            <DashboardIcon
              name={/arco|bal[ií]stic/i.test(`${combat?.weapon} ${combat?.type}`) ? 'bow' : 'swords'}
              size={48}
            />
          }
        />
      ))}
    </>
  );
};

export default CombatSection;

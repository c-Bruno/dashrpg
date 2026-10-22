import type { Character } from 'common/types';
import { DashboardIcon } from 'design-system/ui';
import type { DashboardIconName } from 'design-system/ui/dashboard-icon/dashboard-icon';
import { CharacterModuleRow, EmptySection } from 'features/master-dashboard/components';

interface InventorySectionProps {
  character: Character;
}

const itemIcons: Record<string, DashboardIconName> = { arco: 'bow', escudo: 'shield', elixir: 'potion', gema: 'gem' };

const InventorySection = ({ character }: InventorySectionProps) => {
  const items = character.inventory ?? [];
  if (items.length === 0) return <EmptySection />;

  return (
    <>
      {items.map(({ inventory_id, inventory }) => (
        <CharacterModuleRow
          key={inventory_id}
          name={inventory.description ?? 'Item sem nome'}
          value={inventory.weight != null ? `${inventory.weight}kg` : undefined}
          icon={<DashboardIcon name={itemIcons[inventory.description?.trim().toLowerCase()] ?? 'bag'} />}
        />
      ))}
    </>
  );
};

export default InventorySection;

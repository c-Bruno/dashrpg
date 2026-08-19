import { calcSpaceInventory } from 'common/helpers';
import { InventoryRow } from 'main/components/molecules';

import * as S from './inventory-list.styles';

interface InventoryListProps {
  character: any;
  inventoryModal: any;
  confirmationModal: any;
}

const InventoryList = ({ character, inventoryModal, confirmationModal }: InventoryListProps) => {
  const freeSpace = calcSpaceInventory(character);
  const usedSpace = character.inventory.reduce(
    (acc: number, item: any) => acc + Number(item.inventory?.weight || 0),
    0,
  );
  const totalSpace = usedSpace + freeSpace;
  const fillPercent = totalSpace > 0 ? Math.min((usedSpace / totalSpace) * 100, 100) : 0;

  return (
    <>
      <S.CapacityRow>
        <S.CapacityLabel>Carga</S.CapacityLabel>
        <S.CapacityBar variant='determinate' value={fillPercent} />
        <S.SpaceInfo>
          {usedSpace}/{totalSpace} ({freeSpace} livre)
        </S.SpaceInfo>
      </S.CapacityRow>

      <S.ScrollableList>
        {character.inventory.length === 0 ? (
          <S.EmptyState>Nenhum item carregado</S.EmptyState>
        ) : (
          character.inventory.map((item: any, index: number) => {
            const linkedCombat = character.combat?.find((c: any) => {
              // primary: FK link set by the inventory modal weapon toggle
              if (c.combat?.inventory_id != null) return c.combat.inventory_id === item.inventory_id;
              // fallback: name match for combat records created before the inventory link existed
              return c.combat?.weapon?.toLowerCase().trim() === item.inventory?.description?.toLowerCase().trim();
            });

            return (
              <InventoryRow
                key={item.inventory_id ?? index}
                item={item}
                isWeapon={!!linkedCombat}
                onEdit={() =>
                  inventoryModal.appear({
                    operation: 'edit',
                    data: linkedCombat ? { ...item, combat: linkedCombat.combat } : item,
                    space: freeSpace,
                  })
                }
                onDelete={() =>
                  confirmationModal.appear({
                    title: 'Apagar item do inventário',
                    text: 'Deseja apagar este item?',
                    data: { id: item.inventory_id, type: 'inventory' },
                  })
                }
              />
            );
          })
        )}
      </S.ScrollableList>
    </>
  );
};

export default InventoryList;

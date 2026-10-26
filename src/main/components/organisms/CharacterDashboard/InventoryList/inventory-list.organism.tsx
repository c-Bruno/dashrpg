import { useState } from 'react';

import { Apps, Science, Shield, SportsMartialArts } from '@mui/icons-material';
import { calcSpaceInventory } from 'common/helpers';
import { InventoryRow } from 'main/components/molecules';

import * as S from './inventory-list.styles';

interface InventoryListProps {
  character: any;
  inventoryModal: any;
  confirmationModal: any;
}

const normalizeItemName = (name?: string | null) => {
  if (!name) return '';
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
};

const findLinkedCombat = (combatItems: any[] | undefined, item: any) => {
  const itemId = item.inventory_id;
  const itemName = normalizeItemName(item.inventory?.description);

  return combatItems?.find((combatItem: any) => {
    const linkedItemId = combatItem.combat?.inventory_id;
    if (linkedItemId != null) return linkedItemId === itemId;

    const weaponName = normalizeItemName(combatItem.combat?.weapon);
    return itemName !== '' && weaponName === itemName;
  });
};

const isPotionItem = (description?: string | null) => /\b(pocao|frasco|elixir)\b/.test(normalizeItemName(description));

const InventoryList = ({ character, inventoryModal, confirmationModal }: InventoryListProps) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'weapons' | 'potions' | 'other'>('all');
  const freeSpace = calcSpaceInventory(character);
  const usedSpace = character.inventory.reduce(
    (acc: number, item: any) => acc + Number(item.inventory?.weight || 0),
    0,
  );
  const totalSpace = usedSpace + freeSpace;
  const fillPercent = totalSpace > 0 ? Math.min((usedSpace / totalSpace) * 100, 100) : 0;
  const items = character.inventory.map((item: any, index: number) => {
    const linkedCombat = findLinkedCombat(character.combat, item);

    return {
      item,
      index,
      isWeapon: !!linkedCombat,
      isPotion: isPotionItem(item.inventory?.description),
      linkedCombat,
    };
  });
  const filters = [
    { value: 'all' as const, label: 'Todos', Icon: Apps },
    { value: 'weapons' as const, label: 'Armas', Icon: SportsMartialArts },
    { value: 'potions' as const, label: 'Poções', Icon: Science },
    { value: 'other' as const, label: 'Outros', Icon: Shield },
  ];
  const filteredItems = items.filter(({ isWeapon, isPotion }) => {
    if (activeFilter === 'weapons') return isWeapon;
    if (activeFilter === 'potions') return isPotion;
    if (activeFilter === 'other') return !isWeapon && !isPotion;
    return true;
  });

  return (
    <>
      <S.CapacityRow>
        <S.CapacityInfo>
          <S.CapacityLabel>CAPACIDADE</S.CapacityLabel>
          <S.SpaceInfo>
            {usedSpace} / {totalSpace} kg
          </S.SpaceInfo>
        </S.CapacityInfo>
        <S.CapacityBar variant='determinate' value={fillPercent} />
      </S.CapacityRow>

      <S.FilterBar aria-label='Filtrar itens do inventário'>
        {filters.map(({ value, label, Icon }) => (
          <S.FilterButton
            key={value}
            type='button'
            aria-pressed={activeFilter === value}
            $active={activeFilter === value}
            onClick={() => setActiveFilter(value)}>
            <Icon fontSize='small' />
            <span>{label}</span>
          </S.FilterButton>
        ))}
      </S.FilterBar>

      <S.ScrollableList>
        {character.inventory.length === 0 && <S.EmptyState>Nenhum item carregado</S.EmptyState>}
        {character.inventory.length > 0 && filteredItems.length === 0 && (
          <S.EmptyState>Nenhum item nesta categoria</S.EmptyState>
        )}
        {filteredItems.map(({ item, index, linkedCombat }) => (
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
        ))}
      </S.ScrollableList>
    </>
  );
};

export default InventoryList;

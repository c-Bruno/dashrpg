import { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useFetchMutation } from 'common/hooks';
import { api } from 'common/libs';

import {
  buildEmptyCombat,
  buildEmptyInventory,
  CombatPayload,
  CreatePayload,
  CreateResult,
  InventoryPayload,
  toCombatPayload,
  UpdatePayload,
  UseInventorySubmitProps,
} from './inventory.helper';

const useInventorySubmit = ({
  data,
  operation,
  character,
  totalSpace,
  handleClose,
  onSubmit,
  fullCharacter,
}: UseInventorySubmitProps) => {
  const [inventory, setInventory] = useState<InventoryPayload>(() =>
    data
      ? { description: data.inventory.description, weight: data.inventory.weight, character_id: character }
      : buildEmptyInventory(character),
  );
  const [isWeapon, setIsWeapon] = useState(() => Boolean(data?.combat));
  const [combat, setCombat] = useState<CombatPayload>(() =>
    data?.combat ? toCombatPayload(data.combat, character) : buildEmptyCombat(character),
  );

  useEffect(() => {
    if (!data) return;
    setInventory({ description: data.inventory.description, weight: data.inventory.weight, character_id: character });
    setIsWeapon(Boolean(data.combat));
    setCombat(data.combat ? toCombatPayload(data.combat, character) : buildEmptyCombat(character));
  }, [data, character]);

  // Uses POST response id directly — no extra GET needed
  const createMutation = useFetchMutation<CreatePayload, CreateResult>(
    async (payload?) => {
      const invRes = await api.post<{ id: number }>('/inventory', payload!.inventory);
      const newInventoryId = invRes.data.id;

      if (payload!.combat) {
        const combatRes = await api.post<{ id: number }>('/combat', {
          ...payload!.combat,
          inventory_id: newInventoryId,
        });
        return { data: { newInventoryId, newCombatId: combatRes.data.id }, status: 201, statusText: 'Created' };
      }

      return { data: { newInventoryId, newCombatId: null }, status: 201, statusText: 'Created' };
    },
    {
      onSuccess: ({ newInventoryId, newCombatId }, params) => {
        const updated = {
          ...fullCharacter,
          inventory: [...fullCharacter.inventory, { inventory_id: newInventoryId, inventory: params!.inventory }],
          ...(newCombatId !== null && {
            combat: [
              ...fullCharacter.combat,
              { combat_id: newCombatId, combat: { ...params!.combat, id: newCombatId, inventory_id: newInventoryId } },
            ],
          }),
        };
        onSubmit(updated);
        handleClose();
      },
      onError: () => toast.error('Erro ao criar o item!'),
    },
  );

  const updateMutation = useFetchMutation<UpdatePayload, { newCombatId?: number }>(
    async (payload?) => {
      await api.put(`/inventory/${payload!.inventoryId}`, payload!.inventory);

      if (payload!.combat) {
        if (payload!.combatId) {
          await api.put(`/combat/${payload!.combatId}`, payload!.combat);
          return { data: {}, status: 200, statusText: 'OK' };
        } else {
          const combatRes = await api.post<{ id: number }>('/combat', {
            ...payload!.combat,
            inventory_id: payload!.inventoryId,
          });
          return { data: { newCombatId: combatRes.data.id }, status: 200, statusText: 'OK' };
        }
      }

      return { data: {}, status: 200, statusText: 'OK' };
    },
    {
      onSuccess: ({ newCombatId }, params) => {
        const updatedInventory = fullCharacter.inventory.map((item) =>
          item.inventory_id === params!.inventoryId ? { ...item, inventory: params!.inventory } : item,
        );

        let updatedCombat = fullCharacter.combat;
        if (params!.combatId && params!.combat) {
          // preserve existing combat id so subsequent edits still find combatId
          updatedCombat = fullCharacter.combat.map((item) =>
            item.combat_id === params!.combatId
              ? { ...item, combat: { ...item.combat, ...params!.combat, inventory_id: params!.inventoryId } }
              : item,
          );
        } else if (newCombatId && params!.combat) {
          updatedCombat = [
            ...fullCharacter.combat,
            {
              combat_id: newCombatId,
              combat: { ...params!.combat, id: newCombatId, inventory_id: params!.inventoryId },
            },
          ];
        }

        onSubmit({ ...fullCharacter, inventory: updatedInventory, combat: updatedCombat });
        handleClose();
      },
      onError: () => toast.error('Erro ao editar o item!'),
    },
  );

  const updateInventoryField =
    (field: keyof Omit<InventoryPayload, 'character_id'>) => (e: ChangeEvent<HTMLInputElement>) =>
      setInventory((prev) => ({ ...prev, [field]: field === 'weight' ? Number(e.target.value) : e.target.value }));

  const updateCombatField = (field: keyof Omit<CombatPayload, 'character_id'>) => (e: ChangeEvent<HTMLInputElement>) =>
    setCombat((prev) => ({ ...prev, [field]: e.target.value }));

  const submit = () => {
    if (!inventory.description || !inventory.weight) {
      toast.error('Preencha todos os campos');
      return;
    }
    if (inventory.weight > totalSpace) {
      toast.error('Este item não cabe no seu inventário');
      return;
    }
    if (isWeapon && !combat.weapon) {
      toast.error('Informe o nome da arma');
      return;
    }

    if (operation === 'create') {
      createMutation.trigger({ inventory, combat: isWeapon ? combat : null });
    } else {
      updateMutation.trigger({
        inventoryId: data!.inventory_id,
        inventory,
        combatId: data?.combat?.id,
        combat: isWeapon ? combat : null,
      });
    }
  };

  return {
    inventory,
    isWeapon,
    setIsWeapon,
    combat,
    updateInventoryField,
    updateCombatField,
    submit,
    isLoading: createMutation.isLoading || updateMutation.isLoading,
  };
};

export default useInventorySubmit;

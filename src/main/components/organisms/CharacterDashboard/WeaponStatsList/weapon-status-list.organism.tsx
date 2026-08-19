import { useMemo } from 'react';
import { toast } from 'react-toastify';

import { useModal } from 'common/hooks';
import { api } from 'common/libs';
import { CombatModal, DiceRollModal, InfoModal } from 'main/components/molecules';
import WeaponRow, { WeaponRowData } from 'main/components/molecules/Common/WeaponRow/weapon-row.molecule';

import * as S from './weapon-status-list.styles';

type CombatItem = {
  combat_id: number;
  combat: {
    weapon: string;
    type?: string;
    damage?: string;
    current_load?: string;
    total_load?: string;
    inventory_id?: number | null;
  };
};

interface WeaponStatusListProps {
  character: {
    combat?: CombatItem[];
    id?: number;
    [key: string]: any;
  };
  handleCharacter: (newCharacter: any) => void;
}

const removeCombatWithCascade = (prev: any, id: number, linkedInventoryId?: number | null) => {
  const updated = { ...prev, combat: prev.combat.filter((c: any) => c.combat_id !== id) };
  if (!linkedInventoryId) return updated;
  return { ...updated, inventory: updated.inventory.filter((i: any) => i.inventory_id !== linkedInventoryId) };
};

const WeaponStatusList = ({ character, handleCharacter }: WeaponStatusListProps) => {
  const diceRollModal = useModal(({ close, custom }) => <DiceRollModal amount={custom.amount} handleClose={close} />);

  const infoModal = useModal(({ close, custom }) => (
    <InfoModal
      showConfirm
      title={custom.title}
      text={custom.text}
      data={custom.data}
      handleClose={close}
      onConfirmation={(data) => {
        const { id, type } = data;
        api
          .delete(`/${type}/${id}`)
          .then((response) => {
            handleCharacter((prev: any) => removeCombatWithCascade(prev, id, response.data?.linkedInventoryId));
          })
          .catch(() => toast.error(`Erro ao apagar: ${type}`));
      }}
    />
  ));

  const combatModal = useModal(({ close, custom }) => (
    <CombatModal
      handleClose={close}
      data={custom.data || null}
      character={custom.character || custom.data?.character_id}
      onSubmit={handleCharacter}
      operation={custom.operation}
      fullCharacter={character}
    />
  ));

  const handleShoot = (row: WeaponRowData) => {
    const remaining = Math.max(0, Number(row.current_load) - 1);
    api
      .put(`/combat/${row.id}`, { current_load: String(remaining) })
      .then(() => {
        handleCharacter((prev: any) => ({
          ...prev,
          combat: prev.combat.map((c: any) =>
            c.combat_id === row.id ? { ...c, combat: { ...c.combat, current_load: String(remaining) } } : c,
          ),
        }));
        if (remaining === 0) toast.warn('Sem munição!');
      })
      .catch(() => toast.error('Erro ao registrar disparo.'));
  };

  const combatRows = useMemo(
    () =>
      (character.combat ?? [])
        .map((item) => ({
          id: item.combat_id,
          weapon: item.combat.weapon,
          type: item.combat.type,
          damage: item.combat.damage,
          current_load: item.combat.current_load,
          total_load: item.combat.total_load,
          inventory_id: item.combat.inventory_id,
        }))
        .sort((a, b) => (a.weapon < b.weapon ? -1 : 1)),
    [character.combat],
  );

  return (
    <S.ListWrapper>
      <S.ScrollableList>
        {combatRows.length === 0 ? (
          <S.EmptyState>Nenhuma arma cadastrada</S.EmptyState>
        ) : (
          combatRows.map((row) => (
            <WeaponRow
              key={row.id}
              row={row}
              onRollDice={() => diceRollModal.appear({ amount: row.damage })}
              onShoot={() => handleShoot(row)}
              onEdit={() => combatModal.appear({ operation: 'edit', character: character.id, data: row })}
              onDelete={() =>
                infoModal.appear({
                  title: 'Apagar item de combate',
                  text: 'Deseja apagar este item?',
                  data: { id: row.id, type: 'combat' },
                })
              }
            />
          ))
        )}
      </S.ScrollableList>
    </S.ListWrapper>
  );
};

export default WeaponStatusList;

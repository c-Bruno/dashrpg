export interface InventoryPayload {
  description: string;
  weight: number;
  character_id: number;
}

export interface CombatPayload {
  weapon: string;
  type: string;
  damage: string;
  current_load: string;
  total_load: string;
  character_id: number;
}

export interface InventoryData {
  inventory_id: number;
  inventory: { description: string; weight: number };
  combat?: {
    id?: number;
    weapon: string;
    type: string;
    damage: string;
    current_load: string;
    total_load: string;
  } | null;
}

export interface UseInventorySubmitProps {
  data: InventoryData | null;
  operation: 'create' | 'edit';
  character: number;
  totalSpace: number;
  handleClose: () => void;
  onSubmit: (character: unknown) => void;
  fullCharacter: any;
}

export interface CreatePayload {
  inventory: InventoryPayload;
  combat: CombatPayload | null;
}

export interface CreateResult {
  newInventoryId: number;
  newCombatId: number | null;
}

export interface UpdatePayload {
  inventoryId: number;
  inventory: InventoryPayload;
  combatId?: number;
  combat: CombatPayload | null;
}

export const buildEmptyInventory = (characterId: number): InventoryPayload => ({
  description: '',
  weight: 0,
  character_id: characterId,
});

export const buildEmptyCombat = (characterId: number): CombatPayload => ({
  weapon: '',
  type: '',
  damage: '',
  current_load: '',
  total_load: '',
  character_id: characterId,
});

// Strip `id` and attach `character_id` before using as a payload
export const toCombatPayload = (
  source: { weapon: string; type: string; damage: string; current_load: string; total_load: string },
  characterId: number,
): CombatPayload => ({
  weapon: source.weapon,
  type: source.type,
  damage: source.damage,
  current_load: source.current_load,
  total_load: source.total_load,
  character_id: characterId,
});

export const WEAPON_TYPES = [
  { value: 'Balistico', label: 'Balístico', icon: '🔫' },
  { value: 'Fisico', label: 'Físico', icon: '🗡️' },
  { value: 'Fogo', label: 'Fogo', icon: '🔥' },
  { value: 'Item', label: 'Item', icon: '🎒​' },
];

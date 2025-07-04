export interface Character {
  id?: number;
  name: string;
  age?: number;
  gender?: string;
  player_name?: string;
  weight?: string;
  occupation?: string;
  birth?: string;
  birthplace?: string;
  fear?: string;
  armor?: number;
  current_hit_points?: number;
  max_hit_points?: number;
  current_sanity_points?: number;
  max_sanity_points?: number;
  current_picture?: number;
  is_dead?: boolean;
  is_creazy?: boolean;
  standard_character_picture_url?: string;
  injured_character_picture_url?: string;
  specialItem?: string;
  created_at?: string; // Date as ISO string

  attributes?: CharacterAttribute[];
  inventory?: CharacterInventory[];
  combat?: CharacterCombat[];
  skills?: CharacterSkill[];
  rolls?: Roll[];
}

export interface CharacterAttribute {
  character_id: number;
  attribute_id: number;
  value?: string;
  attribute: Attribute;
}

export interface CharacterInventory {
  character_id: number;
  inventory_id: number;
  value?: string;
  inventory: Inventory;
}

export interface CharacterCombat {
  character_id: number;
  combat_id: number;
  value?: string;
  combat: Combat;
}

export interface CharacterSkill {
  character_id: number;
  skill_id: number;
  value?: string;
  skill: Skill;
}

export interface Attribute {
  id: number;
  name: string;
  description?: string;
  skill_id?: number;
}

export interface Inventory {
  id: number;
  description?: string;
  weight?: number;
  character_id: number;
}

export interface Combat {
  id: number;
  weapon: string;
  type?: string;
  damage?: string;
  current_load?: string;
  total_load?: string;
  character_id: number;
}

export interface Skill {
  id: number;
  name: string;
  description?: string;
}

export interface Roll {
  id: number;
  max_number: number;
  rolled_number: number;
  character_id: number;
  rolled_at: string; // Date as ISO string
}

export interface Config {
  id: number;
  name: string;
  value?: string;
}

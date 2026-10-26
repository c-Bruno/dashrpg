import { Character, Attribute, Skill } from 'common/types';
import { create } from 'zustand';

type useDashboardStoreType = {
  characters: Character[];
  attributes: Attribute[];
  skills: Skill[];
  config: any;

  setCharacters: (c: Character[]) => void;
  addCharacter: (c: Character) => void;
  removeCharacter: (id: number) => void;

  setAttributes: (a: Attribute[]) => void;
  removeAttribute: (id: number) => void;
  addAttribute: (a: Attribute) => void;

  setSkills: (s: Skill[]) => void;
  removeSkill: (id: number) => void;

  setConfig: (c: any) => void;
};

const useDashboardStore = create<useDashboardStoreType>((set) => ({
  characters: [],
  attributes: [],
  skills: [],
  config: { DICE_ON_SCREEN_TIMEOUT_IN_MS: null, TIME_BETWEEN_DICES_IN_MS: null },

  // Characters in the master dashboard
  setCharacters: (data) => set({ characters: data }),
  addCharacter: (newCharacter) =>
    set((state) => ({
      characters: [...state.characters, newCharacter],
    })),
  removeCharacter: (id) =>
    set((state) => ({
      characters: state.characters.filter((c) => c.id !== id),
    })),

  // Attributes config in the master dashboard
  setAttributes: (data) => set({ attributes: data }),
  removeAttribute: (id) =>
    set((state) => ({
      attributes: state.attributes.filter((a) => a.id !== id),
    })),
  addAttribute: (newAttribute) =>
    set((state) => ({
      attributes: [...state.attributes, newAttribute],
    })),

  // Skills config in the master dashboard
  setSkills: (data) => set({ skills: data }),
  removeSkill: (id) =>
    set((state) => ({
      skills: state.skills.filter((s) => s.id !== id),
    })),

  setConfig: (data) => set({ config: data }),
}));

export default useDashboardStore;

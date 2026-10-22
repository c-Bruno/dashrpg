import { Character, Attribute, Skill } from 'common/types';
import { create } from 'zustand';

type useDashboardStoreType = {
  characters: Character[];
  attributes: Attribute[];
  skills: Skill[];
  config: any;

  // Personagem selecionado na sidebar
  selectedCharacterId: number | null;
  selectedCharacterData: Character | null;
  isFetchingCharacter: boolean;

  setCharacters: (c: Character[]) => void;
  addCharacter: (c: Character) => void;
  removeCharacter: (id: number) => void;

  setAttributes: (a: Attribute[]) => void;
  removeAttribute: (id: number) => void;
  addAttribute: (a: Attribute) => void;

  setSkills: (s: Skill[]) => void;
  removeSkill: (id: number) => void;

  setConfig: (c: any) => void;

  // Ações de seleção
  selectCharacter: (id: number | null) => void;
  setSelectedCharacterData: (data: Character | null) => void;
  setFetchingCharacter: (loading: boolean) => void;
  updateSelectedCharacter: (updates: Partial<Character>) => void;
};

const useDashboardStore = create<useDashboardStoreType>((set) => ({
  characters: [],
  attributes: [],
  skills: [],
  config: { DICE_ON_SCREEN_TIMEOUT_IN_MS: null, TIME_BETWEEN_DICES_IN_MS: null },

  selectedCharacterId: null,
  selectedCharacterData: null,
  isFetchingCharacter: false,

  // Characters in the master dashboard
  setCharacters: (data) => set({ characters: data }),
  addCharacter: (newCharacter) =>
    set((state) => ({
      characters: [...state.characters, newCharacter],
    })),
  removeCharacter: (id) =>
    set((state) => {
      const removesSelectedCharacter = state.selectedCharacterId === id || state.selectedCharacterData?.id === id;

      return {
        characters: state.characters.filter((c) => c.id !== id),
        ...(removesSelectedCharacter
          ? { selectedCharacterId: null, selectedCharacterData: null, isFetchingCharacter: false }
          : {}),
      };
    }),

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

  // Personagem selecionado na sidebar
  selectCharacter: (id) =>
    set({
      selectedCharacterId: id,
      selectedCharacterData: id === null ? null : undefined, // limpa dados se desselecionar
    }),
  setSelectedCharacterData: (data) => set({ selectedCharacterData: data, isFetchingCharacter: false }),
  setFetchingCharacter: (loading) => set({ isFetchingCharacter: loading }),
  updateSelectedCharacter: (updates) =>
    set((state) => ({
      selectedCharacterData: state.selectedCharacterData
        ? { ...state.selectedCharacterData, ...updates }
        : state.selectedCharacterData,
    })),
}));

export default useDashboardStore;

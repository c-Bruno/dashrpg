import { useCallback } from 'react';

import { api } from 'common/libs';
import type { Character } from 'common/types';
import { useDashboardStore } from 'main/store';

/**
 * Hook que gerencia a seleção de um personagem na sidebar do dashboard do mestre.
 * Ao selecionar, busca os detalhes completos (com relations) via API.
 */
const useCharacterSelection = () => {
  const {
    selectedCharacterId,
    selectedCharacterData,
    isFetchingCharacter,
    selectCharacter,
    setSelectedCharacterData,
    setFetchingCharacter,
    updateSelectedCharacter,
  } = useDashboardStore();

  const fetchCharacterDetails = useCallback(
    async (characterId: number) => {
      selectCharacter(characterId);
      setFetchingCharacter(true);

      try {
        const response = await api.get<Character>(`/character/${characterId}`);
        setSelectedCharacterData(response.data);
      } catch (error) {
        console.error('[useCharacterSelection] Erro ao buscar personagem:', error);
        setSelectedCharacterData(null);
      }
    },
    [selectCharacter, setFetchingCharacter, setSelectedCharacterData],
  );

  const clearSelection = useCallback(() => {
    selectCharacter(null);
  }, [selectCharacter]);

  return {
    selectedCharacterId,
    selectedCharacterData,
    isFetchingCharacter,
    fetchCharacterDetails,
    clearSelection,
    updateSelectedCharacter,
  };
};

export default useCharacterSelection;

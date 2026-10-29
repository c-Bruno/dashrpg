import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { Button } from '@mui/material';
import { useCharacterSelection, useModal } from 'common/hooks';
import { api } from 'common/libs';
import type { Attribute, Character, Config, Skill } from 'common/types';
import type { RemoveItemResponse } from 'core/services/Master/dashboard.interface';
import { ConfirmationDialog, DashboardIcon } from 'design-system/ui';
import { CharacterSidebar, EmptyStatePanel } from 'features/master/characters/creation/components';
import { CharacterSheet } from 'features/master/characters/detail/components';
import { MasterHeader } from 'features/master/navigation/components';
import { CoverTitle } from 'main/components/atoms';
import { DiceRollFeed } from 'main/components/molecules';
import { useDashboardStore } from 'main/store';
import Link from 'next/link';

import { runInitialSetup } from './characters-screen.helper';
import * as S from './characters-screen.styles';

interface CharactersScreenProps {
  configs: Config[];
  initialSkills: Skill[];
  initialCharacters: Character[];
  initialAttributes: Attribute[];
}

const CharactersScreen = ({ configs, initialSkills, initialCharacters, initialAttributes }: CharactersScreenProps) => {
  const { characters, setCharacters, setAttributes, setSkills, setConfig, removeCharacter } = useDashboardStore();

  const { selectedCharacterData, fetchCharacterDetails } = useCharacterSelection();

  // Inicializa dados da store com SSR
  useEffect(() => {
    setSkills(initialSkills);
    setCharacters(initialCharacters);
    setAttributes(initialAttributes);

    configs.forEach((config: any) => {
      setConfig((prevState: any) => ({
        ...prevState,
        [config.name]: config.value,
      }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCharacters, initialAttributes, initialSkills, configs]);

  const handleSelectCharacter = (id: number) => {
    void fetchCharacterDetails(id);
  };

  const deleteCharacterModal = useModal(({ close, custom }) => (
    <ConfirmationDialog
      title='Apagar personagem'
      message='Tem certeza que deseja apagar o personagem?'
      description='Esta ação não poderá ser desfeita.'
      closeLabel='Fechar'
      confirmLabel='Confirmar'
      onClose={close}
      onConfirm={async () => {
        try {
          const response = await api.delete<RemoveItemResponse>(`/character/${custom.characterId}`);
          if (!response.data.success || response.data.id !== custom.characterId) {
            throw new Error('A API retornou uma resposta inesperada ao apagar o personagem.');
          }

          removeCharacter(custom.characterId);
          close();
        } catch {
          console.error('[MasterCharactersScreen] Erro ao apagar personagem.');
          toast.error('Não foi possível apagar o personagem. Tente novamente.');
        }
      }}
    />
  ));

  return (
    <S.CharactersScreen>
      <CoverTitle title='Mestre' />
      <MasterHeader
        actions={
          <>
            {selectedCharacterData?.id != null && (
              <>
                <Link
                  href={`/sheet/${selectedCharacterData.id}`}
                  target='_blank'
                  aria-label='Abrir ficha do personagem'
                  title='Abrir ficha do personagem'>
                  <DashboardIcon name='sheet' size={22} />
                </Link>
                <Button
                  aria-label='Excluir personagem'
                  title='Excluir personagem'
                  onClick={() => {
                    deleteCharacterModal.appear({ characterId: selectedCharacterData.id });
                  }}>
                  <DashboardIcon name='trash' size={22} />
                </Button>
              </>
            )}
          </>
        }
      />

      {configs.length > 0 ? (
        <S.Layout>
          <CharacterSidebar onSelectCharacter={handleSelectCharacter} />
          <S.Main>
            {selectedCharacterData && <CharacterSheet />}
            {!selectedCharacterData && <EmptyStatePanel />}
          </S.Main>
        </S.Layout>
      ) : (
        <S.Main sx={{ padding: '24px', textAlign: 'center' }}>
          <Button variant='contained' onClick={runInitialSetup} fullWidth>
            REALIZAR CONFIGURAÇÃO INICIAL
          </Button>
        </S.Main>
      )}

      {/* Feed de rolagens dos jogadores (flutuante) */}
      <DiceRollFeed characterIds={characters.map(({ id }) => id)} />
    </S.CharactersScreen>
  );
};

export default CharactersScreen;

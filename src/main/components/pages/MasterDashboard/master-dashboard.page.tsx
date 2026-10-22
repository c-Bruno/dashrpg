import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { Button } from '@mui/material';
import { useCharacterSelection, useModal } from 'common/hooks';
import { api } from 'common/libs';
import type { Attribute, Character, Config, Skill } from 'common/types';
import type { RemoveItemResponse } from 'core/services/Master/dashboard.interface';
import { ConfirmationDialog, DashboardIcon } from 'design-system/ui';
import { CharacterSheet, CharacterSidebar, EmptyStatePanel } from 'features/master-dashboard/components';
import { CoverTitle } from 'main/components/atoms';
import { DiceRollFeed } from 'main/components/molecules';
import { useDashboardStore } from 'main/store';
import Link from 'next/link';

import { runInitialSetup } from './master-dashboard.helper';
import * as S from './master-dashboard.styles';

interface DashboardProps {
  configs: Config[];
  initialSkills: Skill[];
  initialCharacters: Character[];
  initialAttributes: Attribute[];
}

const Dashboard = ({ configs, initialSkills, initialCharacters, initialAttributes }: DashboardProps) => {
  const { characters, setCharacters, setAttributes, setSkills, setConfig, removeCharacter } = useDashboardStore();

  const { selectedCharacterId, selectedCharacterData, fetchCharacterDetails, updateSelectedCharacter } =
    useCharacterSelection();

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

  const handleCharacterUpdate = (updates: Partial<Character>) => {
    updateSelectedCharacter(updates);
  };

  const handleCharacterCreated = () => {
    window.location.reload();
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
          console.error('[MasterDashboard] Erro ao apagar personagem.');
          toast.error('Não foi possível apagar o personagem. Tente novamente.');
        }
      }}
    />
  ));

  return (
    <S.Dashboard>
      <CoverTitle title='Mestre' />
      <S.Header>
        <h1>
          <DashboardIcon name='swords' size={32} />
          Dashboard do Mestre
        </h1>
        <nav aria-label='Atalhos do mestre'>
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
        </nav>
      </S.Header>

      {configs.length > 0 ? (
        <S.Layout>
          <CharacterSidebar
            characters={characters}
            selectedCharacterId={selectedCharacterId}
            onSelectCharacter={handleSelectCharacter}
            onCharacterCreated={handleCharacterCreated}
          />
          <S.Main>
            {selectedCharacterData && (
              <CharacterSheet character={selectedCharacterData} onCharacterUpdate={handleCharacterUpdate} />
            )}
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
    </S.Dashboard>
  );
};

export default Dashboard;

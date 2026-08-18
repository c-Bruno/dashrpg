import { useState } from 'react';

import { TextField } from '@mui/material';
import { useFetchMutation } from 'common/hooks';
import { api } from 'common/libs';
import { Character } from 'common/types';
import { DefaultImageSelector } from 'main/components/molecules';
import { ModalTemplate } from 'main/components/templates';
import { useDashboardStore } from 'main/store';

import * as S from './create-character.styles';

interface CreateCharacterModalProps {
  handleClose: () => void;
}

const CreateCharacterModal = ({ handleClose }: CreateCharacterModalProps) => {
  const { addCharacter } = useDashboardStore();

  const [name, setName] = useState('');
  const [pictureURLs, setPictureURLs] = useState({
    standard_character_picture_url: '',
    injured_character_picture_url: '',
  });

  const { trigger, isLoading } = useFetchMutation(
    (payload: { name: string; standard_character_picture_url?: string; injured_character_picture_url?: string }) =>
      api.post<Character>('/character', payload),
    {
      onSuccess: (data: Character) => {
        addCharacter(data);
        handleClose();
      },
    },
  );

  const handleCreate = () =>
    trigger({
      name: name.trim(),
      ...(pictureURLs.standard_character_picture_url && pictureURLs.injured_character_picture_url ? pictureURLs : {}),
    });

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCreate();
    }
  };

  return (
    <ModalTemplate
      title='⚔ Criar aventureiro'
      onClose={handleClose}
      onConfirm={handleCreate}
      disableConfirm={!name.trim()}
      disableClose={isLoading}>
      <S.Container>
        <TextField
          autoFocus
          label='Nome do aventureiro'
          value={name}
          variant='standard'
          onKeyUp={handleKeyPress}
          helperText='Nome é obrigatório!'
          onChange={(e) => setName(e.target.value)}
        />

        <S.SectionDivider>
          <S.SectionLabel>Retrato do personagem</S.SectionLabel>
        </S.SectionDivider>

        <DefaultImageSelector
          isNewCharacter
          onSelect={(standard, injured) =>
            setPictureURLs({ standard_character_picture_url: standard, injured_character_picture_url: injured })
          }
        />
      </S.Container>
    </ModalTemplate>
  );
};

export default CreateCharacterModal;

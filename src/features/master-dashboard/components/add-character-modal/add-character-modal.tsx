import { useState } from 'react';
import type { KeyboardEvent } from 'react';

import { TextField } from '@mui/material';
import { CHARACTER_PORTRAITS } from 'common/constants';
import { useFetchMutation } from 'common/hooks';
import { api } from 'common/libs';
import type { Character } from 'common/types';
import { DashboardIcon, ImagePicker, ModalDialog, NumberStepper } from 'design-system/ui';
import { useDashboardStore } from 'main/store';

import * as S from './add-character-modal.styles';

const DEFAULT_HIT_POINTS = 20;
const DEFAULT_SANITY_POINTS = 80;

const portraitOptions = CHARACTER_PORTRAITS.map(({ id, name, standardImageUrl }) => ({
  id,
  src: standardImageUrl,
  alt: `Selecionar retrato: ${name}`,
}));

interface AddCharacterModalProps {
  handleClose: () => void;
}

const AddCharacterModal = ({ handleClose }: AddCharacterModalProps) => {
  const { addCharacter } = useDashboardStore();
  const [name, setName] = useState('');
  const [selectedPortraitId, setSelectedPortraitId] = useState<string | null>(null);
  const [initialHitPoints, setInitialHitPoints] = useState(DEFAULT_HIT_POINTS);
  const [initialSanityPoints, setInitialSanityPoints] = useState(DEFAULT_SANITY_POINTS);

  const { trigger, isLoading } = useFetchMutation(
    (payload: Partial<Character> & Pick<Character, 'name'>) => api.post<Character>('/character', payload),
    {
      onSuccess: (data: Character) => {
        addCharacter(data);
        handleClose();
      },
    },
  );

  const handleCreate = () => {
    const selectedPortrait = CHARACTER_PORTRAITS.find(({ id }) => id === selectedPortraitId);

    return trigger({
      name: name.trim(),
      current_hit_points: initialHitPoints,
      max_hit_points: initialHitPoints,
      current_sanity_points: initialSanityPoints,
      max_sanity_points: initialSanityPoints,
      ...(selectedPortrait && {
        standard_character_picture_url: selectedPortrait.standardImageUrl,
        injured_character_picture_url: selectedPortrait.injuredImageUrl,
      }),
    });
  };

  const handleNameKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleCreate();
    }
  };

  return (
    <ModalDialog
      title='Criar aventureiro'
      titleIcon={<DashboardIcon name='person' size={28} />}
      onClose={handleClose}
      onConfirm={handleCreate}
      disableConfirm={!name.trim() || isLoading}
      disableClose={isLoading}
      closeLabel='Cancelar'
      confirmLabel='Criar personagem'
      showCloseButton
      showConfirmIcon
      maxWidth='sm'
      paperSx={S.paperSx}
      contentSx={S.contentSx}
      actionsSx={S.actionsSx}>
      <S.Content>
        <S.FieldGroup>
          <S.FieldLabel htmlFor='character-name'>Nome do aventureiro</S.FieldLabel>
          <TextField
            autoFocus
            fullWidth
            id='character-name'
            value={name}
            placeholder='Ex.: Kaori'
            variant='outlined'
            autoComplete='off'
            onKeyDown={handleNameKeyDown}
            onChange={(event) => setName(event.target.value)}
            slotProps={{
              htmlInput: { 'aria-describedby': 'character-name-hint' },
            }}
            sx={S.nameFieldSx}
          />
          <S.FieldHint id='character-name-hint'>Escolha um nome para identificar o personagem.</S.FieldHint>
        </S.FieldGroup>

        <S.PointsGrid>
          <NumberStepper
            label='Vida inicial'
            description='Quantidade de pontos de vida do personagem.'
            icon={
              <span style={{ color: '#f04452' }}>
                <DashboardIcon name='heart' size={24} />
              </span>
            }
            value={initialHitPoints}
            onChange={setInitialHitPoints}
          />
          <NumberStepper
            label='Sanidade inicial'
            description='Quantidade de pontos de sanidade do personagem.'
            icon={
              <span style={{ color: '#8c93f7' }}>
                <DashboardIcon name='brain' size={24} />
              </span>
            }
            value={initialSanityPoints}
            onChange={setInitialSanityPoints}
          />
        </S.PointsGrid>

        <S.PortraitSection>
          <S.PortraitDivider>Escolha um retrato</S.PortraitDivider>
          <ImagePicker
            label='Retrato do personagem'
            options={portraitOptions}
            value={selectedPortraitId}
            onChange={setSelectedPortraitId}
          />
        </S.PortraitSection>
      </S.Content>
    </ModalDialog>
  );
};

export default AddCharacterModal;

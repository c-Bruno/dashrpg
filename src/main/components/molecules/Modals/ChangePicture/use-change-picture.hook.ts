import { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { characterPicture } from 'common/helpers';
import { useFetchMutation } from 'common/hooks';
import { api } from 'common/libs';

export interface PictureURLs {
  standard_character_picture_url: string;
  injured_character_picture_url: string;
}

interface UseChangePictureProps {
  character: any;
  handleClose: () => void;
  onPictureChange: () => void;
}

const useChangePicture = ({ character, handleClose, onPictureChange }: UseChangePictureProps) => {
  const [pictureURLs, setPictureURLs] = useState<PictureURLs>({
    standard_character_picture_url: character.standard_character_picture_url ?? '',
    injured_character_picture_url: character.injured_character_picture_url ?? '',
  });

  useEffect(() => {
    setPictureURLs({
      standard_character_picture_url: character.standard_character_picture_url ?? '',
      injured_character_picture_url: character.injured_character_picture_url ?? '',
    });
  }, [character]);

  const isStandardValid = characterPicture.validateImageURL(pictureURLs.standard_character_picture_url);
  const isInjuredValid = characterPicture.validateImageURL(pictureURLs.injured_character_picture_url);

  const { trigger, isLoading } = useFetchMutation<PictureURLs, null>(
    async (payload?) => {
      await api.put(`/character/${character.id}`, payload!);
      return { data: null, status: 200, statusText: 'OK' };
    },
    {
      onSuccess: () => {
        toast.success('Imagens alteradas com sucesso!');
        onPictureChange();
        handleClose();
      },
      onError: () => toast.error('Erro ao salvar!'),
    },
  );

  const submit = () => {
    const { standard_character_picture_url, injured_character_picture_url } = pictureURLs;

    if (!standard_character_picture_url || !injured_character_picture_url) {
      toast.error('Preencha as duas artes!');
      return;
    }

    if (!isStandardValid || !isInjuredValid) {
      toast.error('As imagens devem ser PNGs hospedadas no Discord ou Imgur.');
      return;
    }

    trigger(pictureURLs);
  };

  const handleChange = (field: keyof PictureURLs) => (e: ChangeEvent<HTMLInputElement>) =>
    setPictureURLs((prev) => ({ ...prev, [field]: e.target.value }));

  const handleDefaultImageSelect = (standard: string, injured: string) =>
    setPictureURLs({ standard_character_picture_url: standard, injured_character_picture_url: injured });

  return {
    pictureURLs,
    isStandardValid,
    isInjuredValid,
    isLoading,
    submit,
    handleChange,
    handleDefaultImageSelect,
  };
};

export default useChangePicture;

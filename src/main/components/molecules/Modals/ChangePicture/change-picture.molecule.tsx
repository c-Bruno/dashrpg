import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import {   Grid, Link, TextField, Typography   } from '@mui/material';
import { characterPicture } from 'common/helpers';
import { api } from 'common/libs';
import { DefaultImageSelector } from 'main/components/molecules';
import { ModalTemplate } from 'main/components/templates';

interface ChangePictureModalProps {
  character: any;
  handleClose: () => void;
  onPictureChange: () => void;
}

const ChangePictureModal = ({ character, handleClose, onPictureChange }: ChangePictureModalProps) => {
  const [pictureURLs, setPictureURLs] = useState({
    standard_character_picture_url: '',
    injured_character_picture_url: '',
  });

  useEffect(() => {
    setPictureURLs({
      standard_character_picture_url: character.standard_character_picture_url,
      injured_character_picture_url: character.injured_character_picture_url,
    });
  }, [character]);

  const submit = () => {
    const { standard_character_picture_url, injured_character_picture_url } = pictureURLs;

    if (!standard_character_picture_url || !injured_character_picture_url) {
      toast.error('Preencha as duas artes!');
      return;
    }

    if (
      !characterPicture.validateImageURL(standard_character_picture_url) ||
      !characterPicture.validateImageURL(injured_character_picture_url)
    ) {
      toast.error('As imagens devem ser PNGs hospedadas no Discord ou Imgur.');
      return;
    }

    api
      .put(`/character/${character.id}`, pictureURLs)
      .then(() => {
        toast.success('Imagens alteradas com sucesso!');
        onPictureChange();
        handleClose();
      })
      .catch(() => {
        toast.error('Erro ao salvar!');
      });
  };

  const handleDefaultImageSelect = (standard_character_picture_url: string, injured_character_picture_url: string) => {
    setPictureURLs({
      standard_character_picture_url,
      injured_character_picture_url,
    });
  };

  return (
    <ModalTemplate title='👤 Alterar imagens do personagem' onClose={handleClose} onConfirm={submit}>
      <Grid container spacing={3}>
        <Grid size={12}>
          <Typography variant='body2'>
            Utilize imagens no tamanho <strong>420x600</strong> em formato <strong>PNG</strong>. Apenas links de imagens
            hospedadas no
            <Link href='https://imgur.com/' target='_blank' rel='noopener noreferrer' underline='hover'>
              {' '}
              Imgur
            </Link>{' '}
            ou Discord são aceitos.
          </Typography>
        </Grid>

        <Grid size={11}>
          <TextField
            fullWidth
            name='standard_character_picture_url'
            label='Imagem padrão'
            variant='standard'
            value={pictureURLs.standard_character_picture_url}
            // onChange={(e) => onPictureChange(e.target.value)}
          />
        </Grid>

        <Grid size={11}>
          <TextField
            fullWidth
            name='injured_character_picture_url'
            label='Imagem machucada'
            variant='standard'
            value={pictureURLs.injured_character_picture_url}
            // onChange={(e) => onPictureChange(e.target.value)}
          />
        </Grid>

        <Grid size={12}>
          <DefaultImageSelector onSelect={handleDefaultImageSelect} />
        </Grid>
      </Grid>
    </ModalTemplate>
  );
};

export default ChangePictureModal;

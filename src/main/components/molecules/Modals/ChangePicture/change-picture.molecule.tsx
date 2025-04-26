import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { api } from 'common/libs';
import { DefaultImageSelector } from 'main/components/molecules';

function ChangePictureModal({ character, handleClose, onPictureChange }) {
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

  const validateImageURL = (url: string) => {
    const allowedDomains = ['discord', 'imgur'];
    const isValidDomain = allowedDomains.some((domain) => url.includes(domain));
    const isPng = url.endsWith('.png');
    return isValidDomain && isPng;
  };

  const submit = () => {
    const { standard_character_picture_url, injured_character_picture_url } = pictureURLs;

    if (!standard_character_picture_url || !injured_character_picture_url) {
      toast.error('Preencha as duas artes!');
      return;
    }

    if (!validateImageURL(standard_character_picture_url) || !validateImageURL(injured_character_picture_url)) {
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

  const handleDefaultImageSelect = (url: string) => {
    setPictureURLs((prev) => ({
      ...prev,
      standard_character_picture_url: url,
    }));
  };

  return (
    <Dialog open={true} onClose={handleClose} maxWidth='sm' fullWidth>
      <DialogTitle>👤 Alterar imagens do personagem</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='body2'>
              Utilize imagens no tamanho <strong>420x600</strong> em formato <strong>PNG</strong>. Apenas links de
              imagens hospedadas no
              <Link href='https://imgur.com/' target='_blank' rel='noopener noreferrer' underline='hover'>
                {' '}
                Imgur
              </Link>{' '}
              ou Discord são aceitos.
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              name='standard_character_picture_url'
              label='Imagem padrão'
              variant='standard'
              value={pictureURLs.standard_character_picture_url}
              onChange={(e) => onPictureChange(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              name='injured_character_picture_url'
              label='Imagem machucada'
              variant='standard'
              value={pictureURLs.injured_character_picture_url}
              onChange={(e) => onPictureChange(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <DefaultImageSelector onSelect={handleDefaultImageSelect} />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color='secondary'>
          Cancelar
        </Button>
        <Button onClick={submit} variant='contained'>
          Alterar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ChangePictureModal;

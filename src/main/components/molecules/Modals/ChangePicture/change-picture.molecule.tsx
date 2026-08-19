import { Grid, Link } from '@mui/material';
import { PictureUrlField } from 'main/components/atoms';
import { DefaultImageSelector } from 'main/components/molecules';
import { ModalTemplate } from 'main/components/templates';

import * as S from './change-picture.styles';
import useChangePicture from './use-change-picture.hook';

interface ChangePictureModalProps {
  character: any;
  handleClose: () => void;
  onPictureChange: () => void;
}

const ChangePictureModal = ({ character, handleClose, onPictureChange }: ChangePictureModalProps) => {
  const { pictureURLs, isStandardValid, isInjuredValid, isLoading, submit, handleChange, handleDefaultImageSelect } =
    useChangePicture({ character, handleClose, onPictureChange });

  return (
    <ModalTemplate
      title='👤 Alterar imagens do personagem'
      onClose={handleClose}
      onConfirm={submit}
      disableConfirm={isLoading}>
      <Grid container spacing={3}>
        <Grid size={12}>
          <S.Hint>
            Utilize imagens no tamanho <strong>420x600</strong> em formato <strong>PNG</strong>. Apenas links de imagens
            hospedadas no{' '}
            <Link href='https://imgur.com/' target='_blank' rel='noopener noreferrer' underline='hover'>
              Imgur
            </Link>{' '}
            ou Discord são aceitos.
          </S.Hint>
        </Grid>

        <Grid size={12}>
          <S.PreviewRow>
            <S.PreviewCard>
              <S.PreviewLabel>Padrão</S.PreviewLabel>
              {pictureURLs.standard_character_picture_url ? (
                <S.PreviewImage src={pictureURLs.standard_character_picture_url} alt='Padrão' />
              ) : (
                <S.PreviewPlaceholder>🧍</S.PreviewPlaceholder>
              )}
            </S.PreviewCard>

            <S.PreviewCard>
              <S.PreviewLabel>Machucado</S.PreviewLabel>
              {pictureURLs.injured_character_picture_url ? (
                <S.PreviewImage src={pictureURLs.injured_character_picture_url} alt='Machucado' />
              ) : (
                <S.PreviewPlaceholder>🩸</S.PreviewPlaceholder>
              )}
            </S.PreviewCard>
          </S.PreviewRow>
        </Grid>

        <Grid size={12}>
          <PictureUrlField
            label='Imagem padrão'
            value={pictureURLs.standard_character_picture_url}
            onChange={handleChange('standard_character_picture_url')}
            isValid={isStandardValid}
          />
        </Grid>

        <Grid size={12}>
          <PictureUrlField
            label='Imagem machucada'
            value={pictureURLs.injured_character_picture_url}
            onChange={handleChange('injured_character_picture_url')}
            isValid={isInjuredValid}
          />
        </Grid>

        <DefaultImageSelector onSelect={handleDefaultImageSelect} />
      </Grid>
    </ModalTemplate>
  );
};

export default ChangePictureModal;

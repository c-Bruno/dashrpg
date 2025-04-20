import React from 'react';

import { Button, Grid } from '@mui/material';
import { CharacterInfoSchema } from 'core/validations';
import { Form, Formik } from 'formik';
import { Loader } from 'main/components/atoms';
import CharacterFormSection from 'main/components/molecules/CharacterFormSection/character-form-section.molecule';

interface CharacterInfoFormProps {
  initialValues: any;
  onSubmit: (values: any) => Promise<void>;
}

const CharacterInfoForm: React.FC<CharacterInfoFormProps> = ({ initialValues, onSubmit }) => (
  <Formik
    initialValues={{
      age: initialValues.age ?? null,
      name: initialValues.name ?? '',
      fear: initialValues.fear ?? '',
      birth: initialValues.birth ?? '',
      weight: initialValues.weight ?? '',
      gender: initialValues.gender ?? '',
      birthplace: initialValues.birthplace ?? '',
      // background: initialValues.background ?? '',
      occupation: initialValues.occupation ?? '',
      player_name: initialValues.player_name ?? '',
    }}
    onSubmit={(values, { setSubmitting }) => {
      onSubmit(values).then(() => setSubmitting(false));
    }}
    validationSchema={CharacterInfoSchema}
  >
    {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
      // Formulario contendo os dados da ficha de um jogador
      <Form onSubmit={handleSubmit} autoComplete='off'>
        <Grid container item xs={12} spacing={3}>
          <CharacterFormSection
            label='Nome do jogador(a)'
            name='player_name'
            value={values.player_name}
            error={Boolean(errors.player_name)}
            onChange={handleChange}
          />

          <CharacterFormSection
            label='Nome do personagem'
            name='name'
            value={values.name}
            error={Boolean(errors.name)}
            onChange={handleChange}
          />

          <CharacterFormSection
            xs={6}
            label='Idade'
            name='age'
            value={values.age}
            error={Boolean(errors.age)}
            onChange={handleChange}
            type='number'
          />

          <CharacterFormSection
            xs={6}
            label='Gênero'
            name='gender'
            value={values.gender}
            error={Boolean(errors.gender)}
            onChange={handleChange}
          />

          <CharacterFormSection
            xs={6}
            label='Peso'
            name='weight'
            value={values.weight}
            error={Boolean(errors.weight)}
            onChange={handleChange}
            type='number'
          />

          <CharacterFormSection
            xs={6}
            label='Profissão'
            name='occupation'
            value={values.occupation}
            error={Boolean(errors.occupation)}
            onChange={handleChange}
          />

          <CharacterFormSection
            xs={6}
            label='Quando nasceu'
            name='birth'
            value={values.birth}
            error={Boolean(errors.birth)}
            onChange={handleChange}
          />

          <CharacterFormSection
            xs={6}
            label='Onde nasceu'
            name='birthplace'
            value={values.birthplace}
            error={Boolean(errors.birthplace)}
            onChange={handleChange}
          />

          <CharacterFormSection
            label='Maior medo'
            name='fear'
            value={values.fear}
            error={Boolean(errors.fear)}
            onChange={handleChange}
          />

          {/* <CharacterFormSection
            label='Sobre o personagem'
            name='background'
            value={values.background}
            error={Boolean(errors.background)}
            onChange={handleChange}
            type='text'
          /> */}

          <Grid item xs={12}>
            <div className='save-button'>
              {isSubmitting && <Loader className='loader-save-button' size={20} />}
              <Button variant='contained' type='submit' disabled={isSubmitting}>
                Salvar
              </Button>
            </div>
          </Grid>
        </Grid>
      </Form>
    )}
  </Formik>
);

export default CharacterInfoForm;

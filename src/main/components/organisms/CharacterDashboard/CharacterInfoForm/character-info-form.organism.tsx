import React from 'react';

import { Button, Grid, TextField } from '@mui/material';
import { CHARACTER_FORM_FIELDS } from 'common/constants';
import { CharacterInfoSchema } from 'core/validations';
import { Form, Formik } from 'formik';
import { Loader } from 'main/components/atoms';

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
          {CHARACTER_FORM_FIELDS.map(({ id, label, name, xs, type }) => (
            <Grid key={`${id}-${name}`} item xs={xs}>
              <TextField
                fullWidth
                type={type}
                name={name}
                label={label}
                value={values[name]}
                error={Boolean(errors[name])}
                variant='standard'
                onChange={handleChange}
              />
            </Grid>
          ))}

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

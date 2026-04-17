import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, CircularProgress, Grid, TextField } from '@mui/material';
import { CHARACTER_FORM_FIELDS } from 'common/constants';
import { CharacterInfoSchema } from 'core/validations';

interface CharacterInfoFormProps {
  initialValues: any;
  onSubmit: (values: any) => Promise<void>;
}

/**
 * Character info form — driven by React Hook Form + Zod validation.
 *
 * Uses `Controller` to bridge RHF's uncontrolled approach with MUI's
 * controlled `TextField`, giving us type-safe field registration and
 * validation without the render-prop overhead of Formik.
 */
const CharacterInfoForm = ({ initialValues, onSubmit }: CharacterInfoFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      age: initialValues.age ?? null,
      name: initialValues.name ?? '',
      fear: initialValues.fear ?? '',
      birth: initialValues.birth ?? '',
      weight: initialValues.weight ?? '',
      gender: initialValues.gender ?? '',
      birthplace: initialValues.birthplace ?? '',
      occupation: initialValues.occupation ?? '',
      player_name: initialValues.player_name ?? '',
    },
    resolver: zodResolver(CharacterInfoSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
      <Grid container spacing={3} size={12}>
        {CHARACTER_FORM_FIELDS.map(({ id, label, name, xs, type }) => (
          <Grid key={`${id}-${name}`} size={{ xs: xs }}>
            <Controller
              name={name as any}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type={type}
                  label={label}
                  // Coerce null/undefined to empty string so MUI never treats
                  // the field as uncontrolled
                  value={field.value ?? ''}
                  error={Boolean(errors[name as keyof typeof errors])}
                  variant='standard'
                />
              )}
            />
          </Grid>
        ))}

        <Grid size={12}>
          <div className='save-button'>
            {isSubmitting && <CircularProgress className='loader-save-button' size={20} />}
            <Button variant='contained' type='submit' disabled={isSubmitting}>
              Salvar
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
};

export default CharacterInfoForm;

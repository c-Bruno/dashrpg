import { KeyboardEvent, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import { Grid, TextField } from '@mui/material';
import { api } from 'common/libs';

interface SpecialItemProps {
  character: any;
}

const SpecialItem = ({ character }: SpecialItemProps) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleUpdate = (event: KeyboardEvent<HTMLDivElement>) => {
    const value = (event.target as HTMLInputElement).value;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      api
        .put(`/character/${character.id}`, { specialItem: value })
        .then(() => {})
        .catch(() => {
          toast.error('Erro ao atualizar o item especial!');
        });
    }, 3000);
  };

  // Limpeza do timeout ao desmontar o componente
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <Grid item xs={12}>
      <TextField
        rows={6}
        name='specialItem'
        variant='standard'
        onKeyUp={handleUpdate}
        fullWidth
        multiline
        defaultValue={character.specialItem}
        placeholder='Descreva aqui o item especial do personagem...'
      />
    </Grid>
  );
};

export default SpecialItem;

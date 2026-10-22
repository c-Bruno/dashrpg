import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton, TextField } from '@mui/material';

import * as S from './number-stepper.styles';

interface NumberStepperProps {
  label: string;
  description: string;
  icon: ReactNode;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

const NumberStepper = ({
  label,
  description,
  icon,
  value,
  onChange,
  min = 0,
  max = 2_147_483_647,
}: NumberStepperProps) => {
  const [inputValue, setInputValue] = useState(String(value));

  useEffect(() => {
    setInputValue(String(value));
  }, [value]);

  const handleInputChange = (nextValue: string) => {
    setInputValue(nextValue);
    if (nextValue === '') return;

    const parsedValue = Number(nextValue);
    if (Number.isSafeInteger(parsedValue) && parsedValue >= min && parsedValue <= max) {
      onChange(parsedValue);
    }
  };

  const handleBlur = () => {
    if (inputValue === '') {
      onChange(min);
      setInputValue(String(min));
      return;
    }

    const parsedValue = Number(inputValue);
    if (!Number.isSafeInteger(parsedValue) || parsedValue < min || parsedValue > max) {
      setInputValue(String(value));
    }
  };

  return (
    <S.Container>
      <S.Heading>
        <S.Icon aria-hidden='true'>{icon}</S.Icon>
        <S.Label>{label}</S.Label>
      </S.Heading>
      <S.Controls>
        <IconButton
          aria-label={`Diminuir ${label.toLowerCase()}`}
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          size='small'>
          <RemoveIcon fontSize='small' />
        </IconButton>
        <TextField
          type='number'
          autoComplete='off'
          inputMode='numeric'
          value={inputValue}
          onChange={(event) => handleInputChange(event.target.value)}
          onBlur={handleBlur}
          slotProps={{ htmlInput: { min, max, step: 1, 'aria-label': label } }}
          size='small'
        />
        <IconButton
          aria-label={`Aumentar ${label.toLowerCase()}`}
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          size='small'>
          <AddIcon fontSize='small' />
        </IconButton>
      </S.Controls>
      <S.Description>{description}</S.Description>
    </S.Container>
  );
};

export default NumberStepper;

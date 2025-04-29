import { FilledInput, Input, OutlinedInput } from '@mui/material';

const getInputVariant = (variant: string) => {
  switch (variant) {
    case 'outlined':
      return OutlinedInput;
    case 'filled':
      return FilledInput;
    default:
      return Input;
  }
};

export default getInputVariant;

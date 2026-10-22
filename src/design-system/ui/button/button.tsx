import AddIcon from '@mui/icons-material/Add';

import * as S from './button.styles';

type ButtonProps = { onClick: () => void };

const Button = ({ onClick }: ButtonProps) => {
  return (
    <S.Button type='button' aria-label='Criar personagem' title='Criar personagem' onClick={onClick}>
      <AddIcon fontSize='small' />
    </S.Button>
  );
};

export default Button;

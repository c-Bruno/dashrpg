
import * as S from './add-button-box.styles';

interface AddButtonBoxProps {
  onClick?: () => void;
}

const AddBox = ({ onClick }: AddButtonBoxProps) => {
  return (
    <S.Container onClick={onClick}>
      <S.AddIcon />
    </S.Container>
  );
};

export default AddBox;

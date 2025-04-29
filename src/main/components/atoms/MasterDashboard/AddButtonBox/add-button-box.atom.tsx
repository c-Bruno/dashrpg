import React from 'react';

import * as S from './add-button-box.styles';

interface AddButtonBoxProps {
  onClick?: () => void;
}

const AddBox: React.FC<AddButtonBoxProps> = ({ onClick }) => {
  return (
    <S.Container onClick={onClick}>
      <S.AddIcon />
    </S.Container>
  );
};

export default AddBox;

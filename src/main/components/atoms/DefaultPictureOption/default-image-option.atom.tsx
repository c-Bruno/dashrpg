import React from 'react';

import * as S from './default-image-option.styles';

interface DefaultImageOptionProps {
  src: string;
  onClick: () => void;
}

const DefaultImageOption: React.FC<DefaultImageOptionProps> = ({ src, onClick }) => {
  return (
    <S.ImageButton onClick={onClick}>
      <S.ImageWrapper src={src} alt='Default Option' width={150} height={150} />
    </S.ImageButton>
  );
};

export default DefaultImageOption;

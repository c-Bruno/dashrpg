import React from 'react';

import * as S from './dice.styles';

interface DiceProps {
  width: number;
  height: number;
  image?: string;
  onClick: () => void;
  altText?: string;
}

const Dice: React.FC<DiceProps> = ({ width, height, image = '/assets/dice.png', onClick, altText }) => {
  return <S.Dice width={width} height={height} src={image} alt={altText || 'Dice roll'} onClick={onClick} />;
};

export default React.memo(Dice);

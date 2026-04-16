import { memo } from 'react';

import * as S from './dice.styles';

interface DiceProps {
  width: number;
  height: number;
  image?: string;
  onClick: () => void;
  altText?: string;
}

const Dice = ({ width, height, image = '/assets/dice.png', onClick, altText }: DiceProps) => {
  return <S.Dice width={width} height={height} src={image} alt={altText || 'Dice roll'} onClick={onClick} />;
};

export default memo(Dice);

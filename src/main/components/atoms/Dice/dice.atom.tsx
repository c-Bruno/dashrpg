import { memo } from 'react';

import * as S from './dice.styles';

interface DiceProps {
  width?: number;
  height?: number;
  image?: string;
  onClick?: () => void;
  stopRotation?: boolean;
}

const Dice = ({ width = 80, height = 80, image = '/assets/dice.png', onClick, stopRotation }: DiceProps) => {
  return (
    <S.Dice
      width={width}
      height={height}
      src={image}
      alt={'Dice roll image'}
      onClick={onClick}
      stopRotation={stopRotation}
    />
  );
};

export default memo(Dice);

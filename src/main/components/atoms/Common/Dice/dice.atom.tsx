import { memo } from 'react';

import * as S from './dice.styles';

interface DiceProps {
  width: number;
  height: number;
  image?: string;
  onClick: () => void;
  altText?: string;
}

/**
 * A reusable component that displays a dice image which can be clicked to trigger an action, such as rolling the dice.
 * The image source and alternative text can be customized, and the component is memoized for performance optimization.
 */
const Dice = ({ width, height, image = '/assets/dice.png', onClick, altText }: DiceProps) => {
  return <S.Dice width={width} height={height} src={image} alt={altText || 'Dice roll'} onClick={onClick} />;
};

export default memo(Dice);

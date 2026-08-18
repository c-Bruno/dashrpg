import * as S from './rounded-image.tyles';

interface DefaultImageOptionProps {
  src: string;
  width?: number;
  height?: number;
  altText?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
  selected?: boolean;
}

const RoundedImage = ({
  src,
  width,
  height,
  onClick,
  altText = 'Player image',
  hoverEffect = false,
  selected = false,
}: DefaultImageOptionProps) => {
  return (
    <S.ImageWrappe width={width} height={height}>
      <S.ImageButton onClick={onClick} hoverEffect={hoverEffect} selected={selected}>
        <S.ImageWrapper src={src} alt={altText} width={width ?? 100} height={height ?? 100} />
      </S.ImageButton>
    </S.ImageWrappe>
  );
};

export default RoundedImage;

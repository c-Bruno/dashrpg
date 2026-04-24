import * as S from './rounded-image.tyles';

interface DefaultImageOptionProps {
  src: string;
  width?: number;
  height?: number;
  altText?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

/**
 * A component that displays a rounded image with optional click functionality and hover effect.
 * If the hoverEffect prop is set to true, the image will have a visual effect when hovered over.
 */
const RoundedImage = ({ src, width, height, onClick, altText, hoverEffect = false }: DefaultImageOptionProps) => {
  return (
    <S.ImageWrappe width={width} height={height}>
      <S.ImageButton onClick={onClick} hoverEffect={hoverEffect}>
        <S.ImageWrapper src={src} alt={altText} width={width ?? 100} height={height ?? 100} />
      </S.ImageButton>
    </S.ImageWrappe>
  );
};

export default RoundedImage;

import * as S from './rounded-image.tyles';

interface DefaultImageOptionProps {
  src: string;
  width?: number;
  height?: number;
  altText?: string;
  onClick?: () => void;
}

const RoundedImage = ({
  src,
  width = 100,
  height = 100,
  onClick,
  altText = 'Default Option',
}: DefaultImageOptionProps) => {
  return (
    <S.ImageButton onClick={onClick}>
      <S.ImageWrapper src={src} alt={altText} width={width} height={height} />
    </S.ImageButton>
  );
};

export default RoundedImage;

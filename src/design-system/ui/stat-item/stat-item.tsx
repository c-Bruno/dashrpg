import * as S from './stat-item.styles';

type StatItemProps = {
  label: string;
  description: string;
  size?: string;
};

const StatItem = ({ label, description, size }: StatItemProps) => {
  return (
    <S.ItemInfo>
      <S.ItemName fontSize={size}>{label.charAt(0).toUpperCase() + label.slice(1)}</S.ItemName>
      {description && <S.ItemSubtitle>{description}</S.ItemSubtitle>}
    </S.ItemInfo>
  );
};

export default StatItem;

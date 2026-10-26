import * as S from './skill-attribute-list.styles';

interface SkillAttributeListProps {
  title: string;
  items: string[];
}

/**
 * A component that displays a list of skill attributes with a title and a counter.
 * If there are no items, it shows an empty state message.
 */
const SkillAttibuteList = ({ title, items }: SkillAttributeListProps) => {
  const itemCount = items?.length || 0;

  return (
    <S.CardContainer>
      <S.Header>
        <S.Title>{title}</S.Title>
        <S.Counter>{itemCount}</S.Counter>
      </S.Header>

      {itemCount === 0 && <S.EmptyState>Nenhum atributo cadastrado</S.EmptyState>}

      {itemCount > 0 && (
        <S.List>
          {items.map((value, index) => (
            <S.ListItem key={`${value}-${index}`}>{value}</S.ListItem>
          ))}
        </S.List>
      )}
    </S.CardContainer>
  );
};

export default SkillAttibuteList;

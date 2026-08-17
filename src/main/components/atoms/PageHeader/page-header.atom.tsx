import * as S from './page-header.styles';

interface HeaderProps {
  title: string;
}

/**
 * A reusable component that displays a page header with a given title.
 * The header is styled to be centered and visually distinct, making it suitable for use at the top of various pages within the application.
 */
const Header = ({ title }: HeaderProps) => {
  return (
    <S.HeaderContainer size={12}>
      <S.Title variant='h4'>{title}</S.Title>
    </S.HeaderContainer>
  );
};

export default Header;

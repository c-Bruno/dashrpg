
import * as S from './page-header.styles';

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <S.HeaderContainer item xs={12} justifyContent='center'>
      <S.Title variant='h4' marginTop={10}>
        {title}
      </S.Title>
    </S.HeaderContainer>
  );
};

export default Header;

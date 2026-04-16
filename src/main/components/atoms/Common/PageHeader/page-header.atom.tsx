
import * as S from './page-header.styles';

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <S.HeaderContainer size={12} sx={{ justifyContent: 'center' }}>
      <S.Title variant='h4' sx={{ marginTop: 10 }}>
        {title}
      </S.Title>
    </S.HeaderContainer>
  );
};

export default Header;

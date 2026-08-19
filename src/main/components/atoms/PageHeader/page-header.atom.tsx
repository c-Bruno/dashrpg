import * as S from './page-header.styles';

interface PageHeaderProps {
  title: string;
}

const PageHeader = ({ title }: PageHeaderProps) => {
  return (
    <S.HeaderContainer size={12}>
      <S.Title variant='h4'>{title}</S.Title>
    </S.HeaderContainer>
  );
};

export default PageHeader;

import React, { useEffect, useState } from "react";
import Image from 'next/image';

import * as S from './section.styles';

interface SectionProps {
  image?: string;
  title?: string;
  subtitle?: string;
  children: JSX.Element;
  renderButton?: () => JSX.Element;
}

const Section: React.FC<SectionProps> = ({ image, title, children, subtitle, renderButton }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <S.SectionContainer>
      <div>
        <div>
          <S.SectionTitle variant='h5'>
            {title}
            {image && (
              <Image src={image} alt='Character Portrait' width={30} height={30}></Image>
            )}

            {isClient && renderButton && <S.TopRightButtonWrapper>{renderButton()}</S.TopRightButtonWrapper>}
          </S.SectionTitle>

          <S.SectionSubtitle variant='subtitle1'>{subtitle}</S.SectionSubtitle>
        </div>
      </div>

      <S.ContentWrapper>{children}</S.ContentWrapper>
    </S.SectionContainer>
  );
};

export default Section;

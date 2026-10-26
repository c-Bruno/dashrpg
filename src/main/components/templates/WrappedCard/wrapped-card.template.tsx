import { ReactNode, useEffect, useMemo, useState } from 'react';

import { Grid } from '@mui/material';
import { ENTITY_CONFIG } from 'common/constants';
import { EntityTypeEnum } from 'common/enums';
import { calcSpaceInventory } from 'common/helpers';
import { ActionButton } from 'main/components/molecules';
import Image from 'next/image';

import * as S from './wrapped-card.styles';

interface WrappedCardProps {
  size?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
  character?: any;
  modal?: any;
  children: ReactNode;
  entityType: EntityTypeEnum;
}

const WrappedCard = ({ character = null, modal, children, entityType, size = 12 }: WrappedCardProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const config = useMemo(() => ENTITY_CONFIG[entityType], [entityType]);
  if (!config) return null;

  const { title, subtitle, image, onClick } = config({ character, modal, calcSpace: calcSpaceInventory }) as {
    title?: string;
    subtitle?: string;
    image?: string;
    onClick?: () => void;
  };

  return (
    <Grid size={size}>
      <S.SectionContainer>
        <S.SectionTitle variant='h5'>
          {title}
          {image && <Image src={image} alt='Character Portrait' width={30} height={30}></Image>}

          {isClient && onClick && (
            <S.TopRightButtonWrapper>
              <ActionButton onClick={onClick} fontSize='small' />
            </S.TopRightButtonWrapper>
          )}
        </S.SectionTitle>

        <S.SectionSubtitle variant='subtitle1'>{subtitle}</S.SectionSubtitle>

        <S.ContentWrapper>{children}</S.ContentWrapper>
      </S.SectionContainer>
    </Grid>
  );
};

export default WrappedCard;

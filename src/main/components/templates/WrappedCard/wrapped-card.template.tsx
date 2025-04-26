import React, { useEffect, useMemo, useState } from 'react';

import { ENTITY_CONFIG } from 'common/constants';
import { calcSpaceInventory } from 'common/helpers';
import { AddEntityButton } from 'main/components/molecules';
import Image from 'next/image';

import * as S from './wrapped-card.styles';

interface WrappedCardProps {
  character: any | null;
  modal?: any;
  children: React.ReactNode;
  entityType: 'combat' | 'inventory' | 'skill' | 'attribute' | 'dices';
}

const WrappedCard: React.FC<WrappedCardProps> = ({ character, modal, children, entityType }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const config = useMemo(() => ENTITY_CONFIG[entityType], [entityType]);
  if (!config) return null;

  const { title, subtitle, image, onClick, tooltip } = config({ character, modal, calcSpace: calcSpaceInventory });

  return (
    <S.SectionContainer>
      <div>
        <div>
          <S.SectionTitle variant='h5'>
            {title}
            {image && <Image src={image} alt='Character Portrait' width={30} height={30}></Image>}

            {isClient && onClick && (
              <S.TopRightButtonWrapper>
                {<AddEntityButton tooltip={tooltip} onClick={onClick} />}
              </S.TopRightButtonWrapper>
            )}
          </S.SectionTitle>

          <S.SectionSubtitle variant='subtitle1'>{subtitle}</S.SectionSubtitle>
        </div>
      </div>

      <S.ContentWrapper>{children}</S.ContentWrapper>
    </S.SectionContainer>
  );
};

export default WrappedCard;

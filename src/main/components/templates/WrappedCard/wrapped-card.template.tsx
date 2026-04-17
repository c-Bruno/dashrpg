import { ReactNode, useEffect, useMemo, useState } from 'react';

import { ENTITY_CONFIG } from 'common/constants';
import { calcSpaceInventory } from 'common/helpers';
import { ActionButton } from 'main/components/atoms';
import Image from 'next/image';

import * as S from './wrapped-card.styles';

interface WrappedCardProps {
  character: any;
  modal?: any;
  children: ReactNode;
  entityType:
    | 'combat'
    | 'inventory'
    | 'skills'
    | 'attribute'
    | 'dices'
    | 'avaliableCharacters'
    | 'attributesList'
    | 'skillsList'
    | 'characterOverview'
    | 'characterInfoForm'
    | 'SpecialItem';
}

const WrappedCard = ({ character, modal, children, entityType }: WrappedCardProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const config = useMemo(() => ENTITY_CONFIG[entityType], [entityType]);
  if (!config) return null;

  const { title, subtitle, image, onClick, tooltip } = config({ character, modal, calcSpace: calcSpaceInventory }) as {
    title?: string;
    subtitle?: string;
    image?: string;
    onClick?: () => void;
    tooltip?: string;
  };

  return (
    <S.SectionContainer>
      <div>
        <div>
          <S.SectionTitle variant='h5'>
            {title}
            {image && <Image src={image} alt='Character Portrait' width={30} height={30}></Image>}

            {isClient && onClick && (
              <S.TopRightButtonWrapper>
                <ActionButton tooltip={tooltip} onClick={onClick} fontSize='small' />
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

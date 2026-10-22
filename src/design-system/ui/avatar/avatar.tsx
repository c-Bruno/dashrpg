import React from 'react';

import Image from 'next/image';

import * as S from './avatar.styles';

type AvatarProps = { src: string; size?: number; variant?: 'round' | 'square'; avatarFrame?: boolean };

const Avatar = ({ src, size = 40, variant = 'square', avatarFrame = false }: AvatarProps) => {
  const Wrapper = avatarFrame ? S.AvatarFrame : React.Fragment;

  return (
    <Wrapper>
      <S.AvatarContainer size={size} variant={variant}>
        <Image src={src} alt='avatar' width={size} height={size} />
      </S.AvatarContainer>
    </Wrapper>
  );
};

export default Avatar;

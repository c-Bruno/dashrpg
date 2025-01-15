import React, { useEffect, useState } from 'react';

import { styled, Typography } from '@mui/material';
import Image from 'next/image';

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  padding: '15px',
  border: 'solid',
  overflow: 'auto',
  borderRadius: '3px',
  borderWidth: '0.1px',
  borderColor: '#4e4e4e',
  background: theme.palette.primary[600],
}));

const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  margin: 0,
  marginTop: '10px',
  marginLeft: 'auto',
  marginBottom: '10px',
  textAlign: 'center',
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  margin: 0,
  marginTop: '10px',
  marginBottom: '10px',
  textAlign: 'center',
}));

const PaddingBox = styled('div')(() => ({
  padding: '20px',
}));

const SectionButton = styled('div')(() => ({
  alignSelf: 'center',
  float: 'right',
}));

const Section = ({ image, title, children, subtitle, renderButton }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Root>
      <div>
        <div>
          <Title variant='h5'>
            {title}
            {image ? (
              <Image src={image} alt='Character Portrait' width={30} height={30}></Image>
            ) : (
              image
            )}

            {isClient && renderButton && <SectionButton>{renderButton()}</SectionButton>}
          </Title>

          <Subtitle variant='subtitle1'>{subtitle}</Subtitle>
        </div>
      </div>

      <PaddingBox>{children}</PaddingBox>
    </Root>
  );
};

export default Section;

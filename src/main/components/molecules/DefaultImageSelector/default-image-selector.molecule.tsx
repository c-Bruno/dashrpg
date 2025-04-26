import React from 'react';

import { Box, Typography } from '@mui/material';
import { IMAGE_PLACEHOLDERS } from 'common/constants';
import { RoundedImage } from 'main/components/atoms';

interface DefaultImageSelectorProps {
  onSelect: (url: string) => void;
}

const DefaultImageSelector: React.FC<DefaultImageSelectorProps> = ({ onSelect }) => {
  return (
    <Box mt={3}>
      <Typography variant='subtitle1' gutterBottom>
        Ou escolha uma imagem padrão:
      </Typography>
      <Box mt={2.5} mb={2.5} display='flex' gap={3} flexWrap='wrap'>
        {IMAGE_PLACEHOLDERS.map((img, idx) => (
          <RoundedImage key={idx} src={img} altText='Default Option' onClick={() => onSelect(img)} />
        ))}
      </Box>
    </Box>
  );
};

export default DefaultImageSelector;

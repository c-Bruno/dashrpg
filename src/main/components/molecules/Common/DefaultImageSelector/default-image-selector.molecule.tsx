import React from 'react';

import { Box, Typography } from '@mui/material';
import { IMAGE_PLACEHOLDERS } from 'common/constants';
import { RoundedImage } from 'main/components/atoms';

interface DefaultImageSelectorProps {
  onSelect: (standard_character_picture_url: string, injured_character_picture_url: string) => void;
}

const DefaultImageSelector: React.FC<DefaultImageSelectorProps> = ({ onSelect }) => {
  return (
    <Box mt={3}>
      <Typography variant='subtitle1' gutterBottom>
        Ou escolha uma imagem padrão:
      </Typography>
      <Box mt={2.5} mb={2.5} display='flex' gap={3} flexWrap='wrap'>
        {IMAGE_PLACEHOLDERS.map(({ standard_character_picture_url, injured_character_picture_url }, idx) => (
          <RoundedImage
            key={idx}
            src={standard_character_picture_url}
            altText='Default Option'
            onClick={() => onSelect(standard_character_picture_url, injured_character_picture_url)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default DefaultImageSelector;

import { useState } from 'react';

import { Box } from '@mui/material';
import { IMAGE_PLACEHOLDERS } from 'common/constants';
import { RoundedImage, SectionDivider } from 'main/components/atoms';

interface DefaultImageSelectorProps {
  onSelect: (standard_character_picture_url: string, injured_character_picture_url: string) => void;
}

const DefaultImageSelector = ({ onSelect }: DefaultImageSelectorProps) => {
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);

  const handleSelect = (standard: string, injured: string) => {
    setSelectedUrl(standard);
    onSelect(standard, injured);
  };

  return (
    <Box sx={{ mt: 3 }}>
      <SectionDivider label='Ou escolha uma imagem padrão' />
      <Box sx={{ mt: 2.5, mb: 2.5, display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        {IMAGE_PLACEHOLDERS.map(({ standard_character_picture_url, injured_character_picture_url }) => (
          <RoundedImage
            key={standard_character_picture_url}
            src={standard_character_picture_url}
            selected={selectedUrl === standard_character_picture_url}
            onClick={() => handleSelect(standard_character_picture_url, injured_character_picture_url)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default DefaultImageSelector;

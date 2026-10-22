import Image from 'next/image';

import * as S from './image-picker.styles';

export interface ImagePickerOption {
  id: string;
  src: string;
  alt: string;
}

interface ImagePickerProps {
  label: string;
  options: readonly ImagePickerOption[];
  value: string | null;
  onChange: (value: string) => void;
}

const ImagePicker = ({ label, options, value, onChange }: ImagePickerProps) => (
  <S.Grid role='group' aria-label={label}>
    {options.map(({ id, src, alt }) => {
      const isSelected = value === id;

      return (
        <S.Option
          key={id}
          type='button'
          aria-label={alt}
          aria-pressed={isSelected}
          isSelected={isSelected}
          onClick={() => onChange(id)}>
          <Image src={src} alt={alt} width={112} height={112} />
          {isSelected && <S.SelectedMark aria-hidden='true'>✓</S.SelectedMark>}
        </S.Option>
      );
    })}
  </S.Grid>
);

export default ImagePicker;

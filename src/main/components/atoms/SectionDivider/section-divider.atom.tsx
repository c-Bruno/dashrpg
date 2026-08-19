import { Grid } from '@mui/material';

type SectionDividerProps = {
  label?: string;
};

import * as S from './section-divider.styles';

const SectionDivider = ({ label }: SectionDividerProps) => {
  return (
    <Grid size={12}>
      <S.SectionDivider>
        <S.SectionLabel>{label}</S.SectionLabel>
      </S.SectionDivider>
    </Grid>
  );
};

export default SectionDivider;

import { Box } from '@mui/material';

import * as S from './empty-state-panel.styles';

const EmptyStatePanel = () => {
  return (
    <S.EmptyStatePanelContainer>
      <S.PanelItem size={2.5}>⚔️</S.PanelItem>
      <Box sx={(theme) => ({ fontSize: '0.9rem', color: theme.palette.text.secondary })}>
        Selecione um personagem na barra lateral
      </Box>
      <Box sx={(theme) => ({ fontSize: '0.75rem', color: theme.palette.grey[500] })}>
        ou crie um novo para começar
      </Box>{' '}
    </S.EmptyStatePanelContainer>
  );
};

export default EmptyStatePanel;

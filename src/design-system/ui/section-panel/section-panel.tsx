import type { ReactNode } from 'react';

import * as S from './section-panel.styles';

interface SectionPanelProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  fullWidth?: boolean;
}

const SectionPanel = ({ title, icon, children, fullWidth = false }: SectionPanelProps) => (
  <S.ModuleCard data-full-width={fullWidth}>
    <S.ModuleTitle>
      {icon}
      <h3>{title}</h3>
    </S.ModuleTitle>
    <S.ModuleBody>{children}</S.ModuleBody>
  </S.ModuleCard>
);

export default SectionPanel;

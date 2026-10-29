import type { ReactNode } from 'react';

import { DashboardIcon } from 'design-system/ui';
import { DashboardIconName } from 'design-system/ui/dashboard-icon/dashboard-icon';

import * as S from './section-panel.styles';

interface SectionPanelProps {
  title: string;
  icon: DashboardIconName;
  children: ReactNode;
  fullWidth?: boolean;
}

const SectionPanel = ({ title, icon, children, fullWidth = false }: SectionPanelProps) => (
  <S.ModuleCard data-full-width={fullWidth}>
    <S.ModuleTitle>
      <DashboardIcon name={icon} />
      <h3>{title}</h3>
    </S.ModuleTitle>
    <S.ModuleBody>{children}</S.ModuleBody>
  </S.ModuleCard>
);

export default SectionPanel;

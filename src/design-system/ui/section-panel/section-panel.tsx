import type { ReactNode } from 'react';

import { RuleIcon } from 'design-system/ui';
import type { RuleIconName } from 'design-system/ui';

import * as S from './section-panel.styles';

interface SectionPanelProps {
  title: string;
  icon: RuleIconName;
  children: ReactNode;
  fullWidth?: boolean;
}

const SectionPanel = ({ title, icon, children, fullWidth = false }: SectionPanelProps) => (
  <S.ModuleCard data-full-width={fullWidth}>
    <S.ModuleTitle>
      <RuleIcon iconKey={icon} size={24} />
      <h3>{title}</h3>
    </S.ModuleTitle>
    <S.ModuleBody>{children}</S.ModuleBody>
  </S.ModuleCard>
);

export default SectionPanel;

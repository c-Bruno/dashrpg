import type { ReactNode } from 'react';

import { DashboardIcon } from 'design-system/ui';

import MasterNavigation from '../master-navigation/master-navigation';
import * as S from './master-header.styles';

interface MasterHeaderProps {
  actions?: ReactNode;
}

const MasterHeader = ({ actions }: MasterHeaderProps) => (
  <S.Header>
    <h1>
      <DashboardIcon name='swords' size={32} />
      Dashboard do Mestre
    </h1>
    <MasterNavigation />
    {actions && <S.Actions aria-label='Ações da página'>{actions}</S.Actions>}
  </S.Header>
);

export default MasterHeader;

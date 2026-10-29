import { DashboardIcon } from 'design-system/ui';
import { useRouter } from 'next/router';

import * as S from './master-navigation.styles';

const availableSections = [
  { id: 'characters', label: 'Personagens', href: '/dashboard/characters', icon: 'group' },
  { id: 'rules', label: 'Regras', href: '/dashboard/rules', icon: 'book' },
] as const;

const upcomingSections = [
  { label: 'Conteúdo', icon: 'content' },
  { label: 'Sessões', icon: 'calendar' },
] as const;

const MasterNavigation = () => {
  const { pathname } = useRouter();

  return (
    <S.Navigation aria-label='Navegação do mestre'>
      {availableSections.map(({ id, label, href, icon }) => (
        <S.NavigationLink
          key={id}
          href={href}
          aria-current={pathname === href ? 'page' : undefined}
          isActive={pathname === href}>
          <DashboardIcon name={icon} size={20} />
          <span>{label}</span>
        </S.NavigationLink>
      ))}
      {upcomingSections.map(({ label, icon }) => (
        <S.UpcomingSection key={label} aria-disabled='true' title={`${label} — Em breve`}>
          <DashboardIcon name={icon} size={20} />
          <span>{label}</span>
          <S.UpcomingLabel>Em breve</S.UpcomingLabel>
        </S.UpcomingSection>
      ))}
    </S.Navigation>
  );
};

export default MasterNavigation;

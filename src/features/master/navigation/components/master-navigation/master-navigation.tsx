import { RuleIcon } from 'design-system/ui';
import { useRouter } from 'next/router';

import * as S from './master-navigation.styles';

const availableSections = [
  { id: 'characters', label: 'Personagens', href: '/dashboard/characters', icon: 'group' },
  { id: 'rules', label: 'Regras', href: '/dashboard/rules', icon: 'book' },
  { id: 'content', label: 'Conteúdo', href: '', icon: 'content' },
  { id: 'sections', label: 'Sessões', href: '', icon: 'calendar' },
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
          <RuleIcon iconKey={icon} size={20} />
          <span>{label}</span>
        </S.NavigationLink>
      ))}
    </S.Navigation>
  );
};

export default MasterNavigation;

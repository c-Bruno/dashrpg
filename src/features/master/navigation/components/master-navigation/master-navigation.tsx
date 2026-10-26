import { useEffect, useState } from 'react';

import { DashboardIcon } from 'design-system/ui';

import * as S from './master-navigation.styles';

const availableSections = [
  { id: 'overview', label: 'Visão Geral', href: '#visao-geral', icon: 'home' },
  { id: 'characters', label: 'Personagens', href: '#personagens', icon: 'group' },
  { id: 'rules', label: 'Regras', href: '#regras', icon: 'book' },
  { id: 'content', label: 'Conteúdo', href: '#conteudo', icon: 'content' },
  { id: 'sessions', label: 'Sessões', href: '#sessoes', icon: 'calendar' },
] as const;

const MasterNavigation = () => {
  const [activeSection, setActiveSection] = useState<'overview' | 'characters' | 'rules' | 'content' | 'sessions'>(
    'characters',
  );

  useEffect(() => {
    const syncActiveSection = () => {
      setActiveSection(window.location.hash === '#visao-geral' ? 'overview' : 'characters');
    };

    syncActiveSection();
    window.addEventListener('hashchange', syncActiveSection);
    return () => window.removeEventListener('hashchange', syncActiveSection);
  }, []);

  return (
    <S.Navigation aria-label='Navegação do mestre'>
      {availableSections.map(({ id, label, href, icon }) => (
        <S.NavigationLink
          key={id}
          href={href}
          aria-current={activeSection === id ? 'page' : undefined}
          isActive={activeSection === id}
          onClick={() => setActiveSection(id)}>
          <DashboardIcon name={icon} size={20} />
          <span>{label}</span>
        </S.NavigationLink>
      ))}
    </S.Navigation>
  );
};

export default MasterNavigation;

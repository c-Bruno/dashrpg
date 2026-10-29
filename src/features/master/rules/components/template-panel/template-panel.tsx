import React from 'react';

import { RuleIcon } from 'design-system/ui';
import type { RuleIconName } from 'design-system/ui';

import * as S from './template-panel.styles';

type TemplatePanelProps = {
  icon: RuleIconName;
  title: string;
  listLength?: number;
  onCreate: () => void;
  children?: React.ReactNode;
};

const TemplatePanel = ({ icon, title, listLength, onCreate, children }: TemplatePanelProps) => {
  return (
    <S.Panel aria-labelledby='rules-title'>
      <S.PanelHeader>
        <RuleIcon iconKey={icon} size={24} />
        <h3 id='rules-title'>{title.charAt(0).toUpperCase() + title.slice(1) + 's'}</h3>

        <S.AddButton type='button' onClick={onCreate}>
          <RuleIcon iconKey='plus' size={16} />
          Novo {title}
        </S.AddButton>
      </S.PanelHeader>

      {children}

      <S.PanelFooter>
        {listLength} {listLength === 1 ? title : title + 's'}
      </S.PanelFooter>
    </S.Panel>
  );
};

export default TemplatePanel;

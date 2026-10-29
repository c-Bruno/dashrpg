import type { Attribute } from 'common/types';
import { RuleIcon } from 'design-system/ui';

import TemplatePanel from '../template-panel/template-panel';
import * as S from './attribute-panel.styles';

interface AttributePanelProps {
  attributes: Attribute[];
  onCreate: () => void;
  onEdit: (attribute: Attribute) => void;
  onDelete: (attribute: Attribute) => void;
}

const AttributePanel = ({ attributes, onCreate, onEdit, onDelete }: AttributePanelProps) => (
  <TemplatePanel icon='strength-outline' title='atributo' listLength={attributes.length} onCreate={onCreate}>
    <S.AttributeList>
      {attributes.map((attribute) => (
        <S.AttributeRow key={attribute.id}>
          <S.IconTile data-icon={attribute.icon_key}>
            <RuleIcon iconKey={attribute.icon_key} size={26} />
          </S.IconTile>
          <S.EntityInfo>
            <strong>{attribute.name}</strong>
            <p>{attribute.description || '--'}</p>
          </S.EntityInfo>

          <S.RowActions>
            <button
              type='button'
              aria-label={`Editar ${attribute.name}`}
              title={`Editar ${attribute.name}`}
              onClick={() => onEdit(attribute)}>
              <RuleIcon iconKey='edit' size={17} />
            </button>
            <button
              type='button'
              aria-label={`Excluir ${attribute.name}`}
              title={`Excluir ${attribute.name}`}
              onClick={() => onDelete(attribute)}>
              <RuleIcon iconKey='trash' size={17} />
            </button>
          </S.RowActions>
        </S.AttributeRow>
      ))}

      {attributes.length === 0 && <S.EmptyMessage>Nenhum atributo cadastrado.</S.EmptyMessage>}
    </S.AttributeList>
  </TemplatePanel>
);

export default AttributePanel;

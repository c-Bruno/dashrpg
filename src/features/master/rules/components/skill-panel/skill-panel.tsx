import { useMemo, useState } from 'react';

import type { Attribute, Skill } from 'common/types';
import { DashboardIcon, RuleIcon } from 'design-system/ui';
import { TemplatePanel } from 'features/master/rules/components';

import * as S from './skill-panel.styles';

interface SkillPanelProps {
  attributes: Attribute[];
  skills: Skill[];
  onCreate: () => void;
  onEdit: (skill: Skill) => void;
  onDelete: (skill: Skill) => void;
}

const SkillPanel = ({ attributes, skills, onCreate, onEdit, onDelete }: SkillPanelProps) => {
  const [selectedAttribute, setSelectedAttribute] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const visibleSkills = useMemo(
    () =>
      skills.filter((skill) => {
        const matchesSearch = skill.name.toLocaleLowerCase().includes(searchTerm.trim().toLocaleLowerCase());
        const matchesAttribute =
          selectedAttribute === 'all' ||
          attributes.some((attribute) => attribute.skill_id === skill.id && attribute.id === Number(selectedAttribute));

        return matchesSearch && matchesAttribute;
      }),
    [attributes, searchTerm, selectedAttribute, skills],
  );

  return (
    <TemplatePanel icon='sparkles' title='perícia' listLength={visibleSkills.length} onCreate={onCreate}>
      <S.SkillControls>
        <select
          aria-label='Filtrar perícias por atributo'
          value={selectedAttribute}
          onChange={(event) => setSelectedAttribute(event.target.value)}>
          <option value='all'>Todos os atributos</option>
          {attributes.map((attribute) => (
            <option key={attribute.id} value={attribute.id}>
              {attribute.name}
            </option>
          ))}
        </select>
        <S.SearchField>
          <DashboardIcon name='search' size={18} />
          <input
            type='search'
            aria-label='Buscar perícia'
            placeholder='Buscar perícia...'
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </S.SearchField>
      </S.SkillControls>

      <S.SkillsTable role='table' aria-label='Perícias da campanha'>
        <S.TableHeader role='row'>
          <span role='columnheader'>Perícia</span>
          <span role='columnheader'>Atributos vinculados</span>
          <span role='columnheader'>Ações</span>
        </S.TableHeader>
        {visibleSkills.map((skill) => {
          const linkedAttributes = attributes.filter((attribute) => attribute.skill_id === skill.id);

          return (
            <S.SkillRow role='row' key={skill.id}>
              <S.SkillName role='cell'>
                <RuleIcon iconKey={skill.icon_key} />
                {skill.name}
              </S.SkillName>
              <S.AttributeChips role='cell'>
                {linkedAttributes.length ? (
                  linkedAttributes.map((attribute) => (
                    <S.AttributeChip key={attribute.id}>
                      <RuleIcon iconKey={attribute.icon_key} size={16} />
                      {attribute.name}
                    </S.AttributeChip>
                  ))
                ) : (
                  <S.UnlinkedText aria-label='Sem atributo vinculado'>Sem vínculo</S.UnlinkedText>
                )}
              </S.AttributeChips>
              <S.RowActions role='cell'>
                <button
                  type='button'
                  aria-label={`Editar ${skill.name}`}
                  title={`Editar ${skill.name}`}
                  onClick={() => onEdit(skill)}>
                  <DashboardIcon name='edit' size={17} />
                </button>
                <button
                  type='button'
                  aria-label={`Excluir ${skill.name}`}
                  title={`Excluir ${skill.name}`}
                  onClick={() => onDelete(skill)}>
                  <DashboardIcon name='trash' size={17} />
                </button>
              </S.RowActions>
            </S.SkillRow>
          );
        })}
        {visibleSkills.length === 0 && (
          <S.EmptyMessage role='row'>Nenhuma perícia corresponde ao filtro.</S.EmptyMessage>
        )}
      </S.SkillsTable>
    </TemplatePanel>
  );
};

export default SkillPanel;

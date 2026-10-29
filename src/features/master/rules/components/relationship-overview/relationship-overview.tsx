import type { Attribute, Skill } from 'common/types';
import { RuleIcon } from 'design-system/ui';

import * as S from './relationship-overview.styles';

interface RelationshipOverviewProps {
  attributes: Attribute[];
  skills: Skill[];
}

const RelationshipOverview = ({ attributes, skills }: RelationshipOverviewProps) => (
  <S.SummaryPanel aria-labelledby='rules-relationships-title'>
    <S.SummaryHeader>
      <RuleIcon iconKey='link' size={24} />
      <div>
        <h3 id='rules-relationships-title'>Visão geral dos vínculos</h3>
        <p>Veja quais atributos estão associados a cada perícia.</p>
      </div>
    </S.SummaryHeader>
    <S.SummaryGrid>
      {skills.map((skill) => {
        const linkedAttributes = attributes.filter((attribute) => attribute.skill_id === skill.id);

        return (
          <S.SummaryCard key={skill.id}>
            <S.IconTile data-icon={skill.icon_key}>
              <RuleIcon iconKey={skill.icon_key} size={26} />
            </S.IconTile>
            <S.SummaryDetails>
              <strong>{skill.name}</strong>
              <p>
                {linkedAttributes.length}{' '}
                {linkedAttributes.length === 1 ? 'atributo vinculado' : 'atributos vinculados'}
              </p>
              <S.AttributeChips>
                {linkedAttributes.map((attribute) => (
                  <S.AttributeChip key={attribute.id}>
                    <RuleIcon iconKey={attribute.icon_key} size={15} />
                    {attribute.name}
                  </S.AttributeChip>
                ))}
              </S.AttributeChips>
            </S.SummaryDetails>
          </S.SummaryCard>
        );
      })}
      {skills.length === 0 && <S.EmptyMessage>Nenhuma perícia para resumir.</S.EmptyMessage>}
    </S.SummaryGrid>
  </S.SummaryPanel>
);

export default RelationshipOverview;

import React from 'react';

import * as S from './skill-attribute-list.styles';

interface SkillAttributeListProps {
  title: string;
  items: string[];
}

const SkillAttibuteList: React.FC<SkillAttributeListProps> = ({ title, items }) => (
  <S.CardContainer>
    <S.Header sx={{ px: 2, py: 1 }} title={title} subheader={`${items.length} no total`} />
    <S.DividerLine />
    <S.List>
      {items.map((value) => {
        const labelId = `transfer-list-all-item-${value}-label`;

        return (
          <S.ListItem key={value}>
            <span id={labelId}>{value}</span>
          </S.ListItem>
        );
      })}
      <li />
    </S.List>
  </S.CardContainer>
);

export default SkillAttibuteList;

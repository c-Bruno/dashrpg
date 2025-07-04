import * as React from 'react';

import { Grid } from '@mui/material';
import { SkillAttributeList } from 'main/components/molecules';

interface Attribute {
  name: string;
  skill_id?: number;
}

interface Skill {
  id: number;
  name: string;
}

interface AttributesBySkillProps {
  skills: Skill[];
  attributes: Attribute[];
}

const AttributesBySkill: React.FC<AttributesBySkillProps> = ({ skills, attributes }) => {
  // Pré-processa os atributos agrupando por skill_id
  const attributesBySkillId = React.useMemo(() => {
    return attributes.reduce<Record<number, string[]>>((acc, attr) => {
      if (!acc[attr.skill_id]) {
        acc[attr.skill_id] = [];
      }
      acc[attr.skill_id].push(attr.name);
      return acc;
    }, {});
  }, [attributes]);

  return (
    <Grid item container xs={12} spacing={2}>
      <Grid container spacing={2} justifyContent='center' alignItems='center'>
        {skills.map((skill) => (
          <Grid item key={skill.id}>
            <SkillAttributeList title={skill.name} items={attributesBySkillId[skill.id] || []} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default AttributesBySkill;

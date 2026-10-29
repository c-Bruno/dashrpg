import { prisma } from 'common/libs/prisma.lib';

const fetchRulesInitialData = async () => {
  const [attributes, skills] = await Promise.all([
    prisma.attribute.findMany({ orderBy: { name: 'asc' } }),
    prisma.skill.findMany({ orderBy: { name: 'asc' } }),
  ]);

  return {
    attributes: JSON.parse(JSON.stringify(attributes)),
    skills: JSON.parse(JSON.stringify(skills)),
  };
};

export default { fetchRulesInitialData };

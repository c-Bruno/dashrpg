import { prisma } from 'common/libs/prisma.lib';

const parseConfigs = (configs: { name: string; value: string }[]) => {
  return configs.map((config) => {
    if (config.name === 'DICE_ON_SCREEN_TIMEOUT_IN_MS' || config.name === 'TIME_BETWEEN_DICES_IN_MS') {
      return {
        ...config,
        value: (parseInt(config.value) / 1000).toString(),
      };
    }
    return config;
  });
};

const fetchDashboardInitialData = async () => {
  const characters = await prisma.character.findMany({ orderBy: { name: 'asc' } }); // Fetch all avaliable characters ordered by name
  const attributes = await prisma.attribute.findMany({ orderBy: { name: 'asc' } }); // Fetch all avaliable attributes ordered by name
  const skills = await prisma.skill.findMany({ orderBy: { name: 'asc' } }); // Fetch all avaliable skills ordered by name
  const configs = await prisma.config.findMany(); // Fetch all avaliable configs

  return {
    initialCharacters: JSON.parse(JSON.stringify(characters)),
    initialAttributes: JSON.parse(JSON.stringify(attributes)),
    initialSkills: JSON.parse(JSON.stringify(skills)),
    configs: JSON.parse(JSON.stringify(parseConfigs(configs))),
  };
};

export default { fetchDashboardInitialData };

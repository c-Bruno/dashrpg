const ENTITY_CONFIG = {
  avaliableCharacters: () => ({
    title: 'Fichas de personagem   ',
    image: '/assets/sectionIcons/avaliable-characters-list.png',
  }),

  characterOverview: () => ({
    title: '',
  }),

  characterInfoForm: () => ({
    title: 'Ficha de personagem   ',
  }),

  inventory: ({ character, modal, calcSpace }) => ({
    title: 'Inventário   ',
    image: '/assets/sectionIcons/inventory.png',
    onClick: () =>
      modal.appear({
        operation: 'create',
        character: character.id,
        space: calcSpace(character),
      }),
    tooltip: 'Criar item de inventário',
  }),

  attribute: () => ({
    title: 'Atributos   ',
    image: '/assets/sectionIcons/attributes.png',
  }),

  attributesList: ({ modal }) => ({
    title: 'Lista de atributos   ',
    image: '/assets/sectionIcons/attributes.png',
    onClick: () =>
      modal.appear({
        operation: 'create',
      }),
    tooltip: 'Criar uma pericias para os personagens',
  }),

  combat: ({ character, modal }) => ({
    title: 'Combate   ',
    image: '/assets/sectionIcons/combat.png',
    onClick: () =>
      modal.appear({
        operation: 'create',
        character: character.id,
      }),
    tooltip: 'Criar ação de combate',
  }),

  SpecialItem: () => ({
    title: 'Item especial   ',
    image: '/assets/sectionIcons/special-item.png',
  }),

  skills: () => ({
    title: 'Perícias   ',
    image: '/assets/sectionIcons/skills.png',
  }),

  skillsList: ({ modal }) => ({
    title: 'Lista de pericias   ',
    image: '/assets/sectionIcons/skills.png',
    onClick: () =>
      modal.appear({
        operation: 'create',
      }),
    tooltip: 'Criar uma pericias para os personagens',
  }),

  dices: () => ({
    title: 'Dados   ',
    image: '/assets/diceImages/fire.png',
  }),
};

export default ENTITY_CONFIG;

const ENTITY_CONFIG = {
  avaliableCharacters: () => ({
    title: 'Fichas de personagem   ',
    image: '/assets/characters.png',
  }),

  characterOverview: () => ({
    title: '',
  }),

  characterInfoForm: () => ({
    title: 'Ficha de personagem   ',
  }),

  inventory: ({ character, modal, calcSpace }) => ({
    title: 'Inventário   ',
    image: '/assets/Inventory.png',
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
    image: '/assets/atributes.png',
  }),

  attributesList: ({ modal }) => ({
    title: 'Lista de atributos   ',
    image: '/assets/atributes.png',
    onClick: () =>
      modal.appear({
        operation: 'create',
      }),
    tooltip: 'Criar uma pericias para os personagens',
  }),

  combat: ({ character, modal }) => ({
    title: 'Combate   ',
    image: '/assets/slash.png',
    onClick: () =>
      modal.appear({
        operation: 'create',
        character: character.id,
      }),
    tooltip: 'Criar ação de combate',
  }),

  SpecialItem: () => ({
    title: 'Item especial   ',
    image: '/assets/specialItem.png',
  }),

  skills: () => ({
    title: 'Perícias   ',
    image: '/assets/expertise.png',
  }),

  skillsList: ({ modal }) => ({
    title: 'Lista de pericias   ',
    image: '/assets/expertise.png',
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

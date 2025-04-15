const ENTITY_CONFIG = {
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
};

export default ENTITY_CONFIG;

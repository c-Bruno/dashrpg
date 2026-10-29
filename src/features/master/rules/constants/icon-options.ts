type EntityKind = 'attribute' | 'skill';

const iconOptions: Record<EntityKind, string[]> = {
  attribute: [
    'strength',
    'agility',
    'fist',
    'intellect',
    'perception',
    'vitality',
    'magic',
    'defense',
    'fire',
    'nature',
    'skull',
    'charisma',
  ],
  skill: [
    'running',
    'melee',
    'stealth',
    'investigation',
    'aim',
    'animal',
    'nature',
    'perception',
    'alchemy',
    'knowledge',
    'music',
    'performance',
  ],
};

export default iconOptions;

export interface CharacterPortrait {
  id: string;
  name: string;
  standardImageUrl: string;
  injuredImageUrl: string;
}

const characterPortraits = [
  {
    id: 'redhead-heroine',
    name: 'aventureira ruiva',
    standardImageUrl: '/assets/avatars/heroine/sea-redhead.png',
    injuredImageUrl: '/assets/avatars/heroine/injured-sea-redhead.png',
  },
  {
    id: 'brunette-heroine',
    name: 'aventureira morena',
    standardImageUrl: '/assets/avatars/heroine/sea-brunette.png',
    injuredImageUrl: '/assets/avatars/heroine/injured-sea-brunette.png',
  },
  {
    id: 'blonde-heroine',
    name: 'aventureira loira',
    standardImageUrl: '/assets/avatars/heroine/heroine-1.png',
    injuredImageUrl: '/assets/avatars/heroine/heroine-1-injured.png',
  },
  {
    id: 'hero-redhead',
    name: 'aventureiro moreno',
    standardImageUrl: '/assets/avatars/hero/hero-1.png',
    injuredImageUrl: '/assets/avatars/hero/hero-1-injured.png',
  },
  {
    id: 'hero-blonde',
    name: 'aventureiro velho',
    standardImageUrl: '/assets/avatars/hero/hero-2.png',
    injuredImageUrl: '/assets/avatars/hero/hero-2-injured.png',
  },
  {
    id: 'hero-brunette',
    name: 'aventureiro  grisalho',
    standardImageUrl: '/assets/avatars/hero/hero-3.png',
    injuredImageUrl: '/assets/avatars/hero/hero-3-injured.png',
  },
] as const satisfies readonly CharacterPortrait[];

export default characterPortraits;

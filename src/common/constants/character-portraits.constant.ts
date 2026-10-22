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
    standardImageUrl: '/assets/avatars/heroine/redhead.png',
    injuredImageUrl: '/assets/avatars/heroine/redhead-avatar-injured.png',
  },
  {
    id: 'blonde-heroine',
    name: 'aventureira loira',
    standardImageUrl: '/assets/avatars/heroine/blonde-avatar.png',
    injuredImageUrl: '/assets/avatars/heroine/blonde-avatar-injured.png',
  },
  {
    id: 'brunette-heroine',
    name: 'aventureira morena',
    standardImageUrl: '/assets/avatars/heroine/brunette-avatar.png',
    injuredImageUrl: '/assets/avatars/heroine/brunette-avatar-injured.png',
  },
  {
    id: 'hero-redhead',
    name: 'aventureiro ruivo',
    standardImageUrl: '/assets/avatars/hero/redhead.png',
    injuredImageUrl: '/assets/avatars/hero/redhead-injured.png',
  },
  {
    id: 'hero-blonde',
    name: 'aventureiro loiro',
    standardImageUrl: '/assets/avatars/hero/blonde-avatar.png',
    injuredImageUrl: '/assets/avatars/hero/blonde-avatar-injured.png',
  },
  {
    id: 'hero-brunette',
    name: 'aventureiro moreno',
    standardImageUrl: '/assets/avatars/hero/brunette-avatar.png',
    injuredImageUrl: '/assets/avatars/hero/brunette-avatar-injured.png',
  },
] as const satisfies readonly CharacterPortrait[];

export default characterPortraits;

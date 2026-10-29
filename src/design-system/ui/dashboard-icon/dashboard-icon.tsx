import type { ReactNode } from 'react';

const artwork = {
  swords: (
    <>
      <path
        fill='#dfbd83'
        d='M2 1h4v2h2v2h2v2h2v2h2v2h2v3h-3v-2h-2v-2H9V8H7V6H5V4H2zm20 0h-4v2h-2v2h-2v2h-2v2h-2v2H8v3h3v-2h2v-2h2V8h2V6h2V4h3z'
      />
      <path
        fill='#a96b31'
        d='M3 13h2v2h2v2h2v2H7v-2H5v2H3v2H1v-2h2v-2H1v-2h2zm18 0h-2v2h-2v2h-2v2h2v-2h2v2h2v2h2v-2h-2v-2h2v-2h-2z'
      />
    </>
  ),
  strength: <path d='M7 2h3v2H8v2h3v3h-2v2H7v4h4v-3h3v-2h4v2h3v7h-3v2H7v-2H3v-5h2V8h1V5h1zm8 10v3h3v-3z' />,
  sparkles: (
    <path d='M11 1h2v6h-2zM11 17h2v6h-2zM1 11h6v2H1zm16 0h6v2h-6zM11 8h2v3h3v2h-3v3h-2v-3H8v-2h3zM4 3h2v2h2v2H6v2H4V7H2V5h2zm14 14h2v2h2v2h-2v2h-2v-2h-2v-2h2z' />
  ),
  bag: <path fillRule='evenodd' d='M8 1h8v2h3v3h2v16H3V6h2V3h3zm1 2v2h6V3zM5 8v12h14V8h-3v3h-2V7h-4v4H8V8z' />,
  dumbbell: <path d='m2 14 3-3 2 2 6-6-2-2 3-3 8 8-3 3-2-2-6 6 2 2-3 3zm0-4 2-2 12 12-2 2zM10 2l2-2 12 12-2 2z' />,
  fist: <path d='M5 3h3V1h4v1h4v2h4v7h-2v3h-2v8H7v-7H5v-3H3V7h2zm2 2v5h2V4H7zm4-1v6h2V4zm4 2v5h2V6z' />,
  bow: (
    <>
      <path fill='#bc874a' d='M18 1h3v5h-2v5h-2v4h-3v3h-4v2H5v-3h5v-2h3v-3h2V8h2V3h1zM2 20h2v2H2z' />
      <path
        fill='#c9b696'
        d='M18 3h1v14h-1zM5 17h14v1H5zM4 16h2v2H4zm2-2h2v2H6zm2-2h2v2H8zm2-2h2v2h-2zm2-2h2v2h-2zm2-2h2v2h-2zm2-2h2v2h-2z'
      />
    </>
  ),
  shield: (
    <path
      fillRule='evenodd'
      d='M10 1h4v2h6v11h-2v4h-3v3h-2v2h-2v-2H9v-3H6v-4H4V3h6zm0 4H6v8h2v4h3v3h2v-3h3v-4h2V5h-4V3h-4z'
    />
  ),
  potion: (
    <>
      <path fill='#d49a49' d='M8 1h8v3h-2v5l5 5v7H5v-7l5-5V4H8zm4 10-5 5v3h10v-3z' />
      <path fill='#bf3553' d='M9 14h6v2h2v4H7v-4h2z' />
    </>
  ),
  gem: <path fillRule='evenodd' d='M6 3h12l5 6-11 13L1 9zm1 3L5 9l7 9 7-9-2-3z' />,
  dice: (
    <>
      <path fill='#e44452' d='m12 1 10 5v12l-10 5-10-5V6z' />
      <path
        fill='#8d2634'
        d='m4 7 7 4v9l2 1V11l7-4-1-1-7 4-7-4zM7 10h2v3H7zm0 5h2v3H7zm9-5h2v3h-2zm0 5h2v3h-2zM11 4h3v2h-3z'
      />
    </>
  ),
  heart: <path d='M3 3h6v2h2v2h2V5h2V3h6v2h2v7h-2v3h-3v3h-3v3h-2v2h-2v-2H9v-3H6v-3H3v-3H1V5h2z' />,
  brain: (
    <path d='M8 2h3v2h2V2h3v2h4v3h2v7h-3v3h-4v5h-3v-6h-2v3H6v-2H3v-4H1V8h2V5h5zm-3 5v3h2V7zm3 4v3h2v-3zm6-5v3h3V6zm2 6v2h3v-2z' />
  ),
  gender: <path fillRule='evenodd' d='M8 1h8v2h3v9h-3v2h-3v4h4v2h-4v3h-2v-3H7v-2h4v-4H8v-2H5V3h3zm0 3v7h8V4z' />,
  calendar: (
    <path fillRule='evenodd' d='M5 1h2v3h10V1h2v3h3v18H2V4h3zM4 9v11h16V9zm3 3h3v3H7zm6 0h3v3h-3zm-6 5h3v2H7z' />
  ),
  pin: (
    <path fillRule='evenodd' d='M7 1h10v2h3v10h-3v4h-2v3h-2v3h-2v-3H9v-3H7v-4H4V3h3zm2 4v2H7v4h2v2h6v-2h2V7h-2V5z' />
  ),
  person: (
    <path
      fillRule='evenodd'
      d='M9 1h6v2h2v5h-2v2h-2v2h4v2h3v5h2v2H2v-2h2v-5h3v-2h4v-2H9v-2H7V3h2zm0 4v3h6V5zm-1 9v4h8v-4z'
    />
  ),
  sheet: <path fillRule='evenodd' d='M4 1h12v3h4v19H4zm2 2v18h12V6h-4V3zm2 6h8v2H8zm0 4h8v2H8zm0 4h6v2H8z' />,
  close: <path d='m5 3 7 7 7-7 2 2-7 7 7 7-2 2-7-7-7 7-2-2 7-7-7-7z' />,
  trash: <path fillRule='evenodd' d='M9 1h6v2h-6zM4 4h16v2H4zm3 4h10l-1 13H8zm3 2v9h1v-9zm3 0v9h1v-9z' />,
  warning: <path d='M10 1h4v2h2v3h2v3h2v3h2v6H2v-6h2V9h2V6h2V3h2zm1 6v6h2V7zm0 8v2h2v-2z' />,
  home: <path fillRule='evenodd' d='M2 10 12 1l10 9h-3v11h-6v-7h-3v7H4V10zm4 0v9h2v-7h7v7h2v-9l-5-5z' />,
  group: (
    <path
      fillRule='evenodd'
      d='M8 2h5v2h2v5h-2v2h-5V9H6V4h2zm1 2v3h3V4zm7 1h3v2h2v5h-2v2h-4v-2h2V7h-1zm-8 7h6v2h4v2h2v5H2v-5h2v-2h4zm0 2v2H6v3h10v-3h-3v-2z'
    />
  ),
  book: <path fillRule='evenodd' d='M3 2h7v2h4V2h7v20h-7v-2h-4v2H3zm2 2v15h3v-2h8v2h3V4h-3v2H8V4zm5 2v11h2V6z' />,
  content: (
    <path
      fillRule='evenodd'
      d='M5 2h10v2h3v3h3v15H5v-3H2V5h3zm2 2v13h12V9h-5V4zm8 1v3h3zm-9 1H4v11h2zm4 1h4v2h-4zm0 4h8v2h-8zm0 4h8v2h-8z'
    />
  ),
  plus: <path d='M10 2h4v8h8v4h-8v8h-4v-8H2v-4h8z' />,
  search: (
    <path
      fillRule='evenodd'
      d='M9 2h6v2h3v3h2v6h-2v3h-3v2h-6v-2H6v-3H4V7h2V4h3zm1 3v2H8v6h2v2h4v-2h2V7h-2V5zm7 11 2-2 4 4v3h-3z'
    />
  ),
  edit: <path d='m3 16 12-12 5 5L8 21H3zm12-9L7 15l2 2 8-8zM2 22h20v1H2z' />,
  link: (
    <path
      fillRule='evenodd'
      d='M8 2h6v2h2v2h-3V5H9v2H7v4h2v2H6v-2H4V6h2V4h2zm8 5h4v2h2v6h-2v2h-2v2h-6v-2h-2v-2h3v1h4v-2h2v-4h-2v-2h-2zM7 16h3v2H7v2H4v-2H2v-5h2v-2h3v3H6v3z'
    />
  ),
} satisfies Record<string, ReactNode>;

export type DashboardIconName = keyof typeof artwork;

const DashboardIcon = ({ name, size = 24 }: { name: DashboardIconName; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='currentColor'
    shapeRendering='crispEdges'
    aria-hidden='true'
    focusable='false'
    style={{ flexShrink: 0 }}>
    {artwork[name]}
  </svg>
);

export default DashboardIcon;

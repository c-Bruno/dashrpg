import type { ReactNode } from 'react';

const feather = (
  <>
    <path fill='#52785b' d='M25 3h5v5h-3v5h-3v5h-4v4h-5v4H7v-7h3v-6h4V9h5V6h6z' />
    <path fill='#87aa79' d='M23 6h4v2h-4v4h-4v4h-4v4h-4v4H7v-3h3v-4h4v-4h4V9h5z' />
    <path fill='#273e35' d='M22 8h2v3h-2v4h-4v4h-4v4h-4v3H5v3H2v-3h3v-3h4v-4h4v-4h4v-4h5z' />
    <path fill='#a1bc8a' d='M15 10h2v3h-2zm7-5h3v2h-3zM8 19h2v3H8z' />
  </>
);

const book = (
  <>
    <path fill='#535b88' d='M2 5h10v2h8V5h10v23H20v-2h-8v2H2z' />
    <path fill='#a4abd8' d='M5 4h7v2h3v18h-3v-2H5zm15 0h7v18h-7v2h-3V6h3z' />
    <path fill='#c1c5e8' d='M7 6h4v2h2v12h-2v-1H7zm14 0h4v13h-4v1h-2V8h2z' />
    <path fill='#303b5a' d='M15 7h2v18h-2zM4 24h8v2H4zm16 0h8v2h-8z' />
  </>
);

const eye = (
  <>
    <path fill='#526782' d='M11 7h10v2h5v3h3v2h2v4h-2v2h-3v3h-5v2H11v-2H6v-3H3v-2H1v-4h2v-2h3V9h5z' />
    <path fill='#b3c2d4' d='M11 10h10v2h4v2h3v4h-3v2h-4v2H11v-2H7v-2H4v-4h3v-2h4z' />
    <path fill='#698da9' d='M12 9h8v3h3v8h-3v3h-8v-3H9v-8h3z' />
    <path fill='#1a2b3c' d='M14 12h5v2h2v5h-2v2h-5v-2h-2v-5h2z' />
    <path fill='#d5e0e7' d='M13 11h4v4h-4z' />
  </>
);

const artwork = {
  strength: (
    <>
      <path fill='#ba793c' d='M10 3h7v2h3v5h-4v3h-3v5h3v-3h6v2h5v4h3v6h-4v3H10v-2H4v-7h2v-7h2V8h2z' />
      <path
        fill='#edaf5d'
        d='M11 5h6v2h-4v3h-2v5H9v7H7v3h4v2h14v-2h3v-3h-3v-3h-5v-2h-3v5h-5v-3h-1v-6h2v-3h3V8h2V6h-7z'
      />
      <path fill='#ffd08a' d='M11 5h5v2h-5zM8 18h2v6H8zm10 1h4v2h-4z' />
      <path fill='#a66b38' d='M12 24h5v2h-5zm11-2h2v3h-2z' />
    </>
  ),
  agility: feather,
  fist: (
    <>
      <path fill='#862d39' d='M6 4h5V2h5v2h6v3h5v4h3v10h-4v4h-5v5H10v-6H6v-4H3V9h3z' />
      <path
        fill='#cf5057'
        d='M7 6h4v6H7zm6-2h4v7h-4zm6 2h4v7h-4zm6 4h3v7h-3zM5 14h5v3h4v-3h5v4h-3v4h-5v-2H7v-3H5zm8 10h8v4h-8z'
      />
      <path fill='#e27370' d='M8 5h2v4H8zm6-1h2v3h-2zm6 2h2v3h-2z' />
      <path fill='#a33743' d='M20 17h4v4h-4zm-9 5h9v2h-9z' />
    </>
  ),
  intellect: book,
  knowledge: book,
  perception: eye,
  vitality: (
    <>
      <path fill='#99343f' d='M4 5h8v3h8V5h8v3h3v10h-3v4h-4v4h-4v4h-8v-4H8v-4H4v-4H1V8h3z' />
      <path fill='#cc4e5d' d='M5 6h6v3h3v3h4V9h3V6h6v3h2v8h-3v4h-4v4h-4v3h-4v-3h-4v-4H6v-4H3V9h2z' />
      <path fill='#e36b71' d='M5 8h5v2H7v5H5z' />
    </>
  ),
  magic: (
    <>
      <path fill='#a86e32' d='M14 2h4v8h4v4h8v4h-8v4h-4v8h-4v-8h-4v-4H2v-4h8v-4h4z' />
      <path fill='#f1b85e' d='M15 5h2v8h3v2h7v2h-7v3h-3v7h-2v-7h-3v-3H5v-2h7v-2h3z' />
      <path fill='#ffe0a1' d='M14 14h4v4h-4zM5 5h3v3H5zm19 1h2v3h-2zM5 24h3v3H5zm20 0h2v3h-2z' />
    </>
  ),
  defense: (
    <>
      <path fill='#a96038' d='M14 2h4v2h6v2h4v14h-3v5h-4v3h-3v3h-4v-3h-3v-3H7v-5H4V6h4V4h6z' />
      <path fill='#e1a45c' d='M14 5h4v2h7v12h-3v5h-4v3h-4v-3h-4v-5H7V7h7z' />
      <path fill='#414f5d' d='M14 8h4v2h4v9h-3v4h-3v2h-1v-2h-3v-4h-2v-9h4z' />
      <path fill='#6d7a80' d='M14 9h2v13h-2v-4h-3v-7h3z' />
    </>
  ),
  fire: (
    <>
      <path fill='#a5422f' d='M17 1h3v8h3v5h3v4h3v8h-4v4H8v-3H4V17h3v-5h3v5h2V9h3V5h2z' />
      <path fill='#e1773e' d='M17 7h2v8h4v5h3v5h-3v3H9v-3H7v-7h2v4h4v-8h2v-4h2z' />
      <path fill='#f4b65d' d='M17 17h2v5h3v5H12v-5h3v-3h2z' />
      <path fill='#ffe2a0' d='M16 23h3v5h-5v-3h2z' />
    </>
  ),
  nature: feather,
  skull: (
    <>
      <path fill='#727781' d='M9 3h14v3h4v4h2v12h-4v5h-4v4h-3v-4h-4v4h-3v-4H7v-5H3V10h2V6h4z' />
      <path fill='#a3a6ac' d='M10 5h12v3h4v12h-4v4h-3v3h-6v-3h-3v-4H6V9h4z' />
      <path fill='#242b33' d='M8 12h6v7H8zm11 0h6v7h-6zm-4 7h3v4h-3zM11 25h2v5h-2zm8 0h2v5h-2z' />
      <path fill='#c6c7c8' d='M10 6h10v2H10z' />
    </>
  ),
  charisma: (
    <>
      <path fill='#b77c39' d='M2 8h4v4h5V5h3v5h4V5h3v7h5V8h4v18H2z' />
      <path fill='#efb45f' d='M4 12h3v4h5v-5h3v4h3v-4h3v5h4v-4h3v10H4zM3 24h26v4H3z' />
      <path fill='#ffda91' d='M2 5h4v4H2zm11-3h5v4h-5zm13 3h4v4h-4zM4 24h24v1H4z' />
      <path fill='#9f4f39' d='M14 18h4v4h-4z' />
    </>
  ),
  running: (
    <>
      <path
        fill='#f0b55c'
        d='M20 2h6v6h-6zM14 9h8v4h-4v6h-5v-3h-3v-4h4zM7 9h7v3H9v4H5v-4h2zM22 11h3v4h5v3h-8zM13 20h5v4h-5v3H8v3H2v-3h5v-3h4zM19 19h4v5h4v6h-4v-5h-4z'
      />
      <path fill='#bb803e' d='M14 9h3v4h-3zm-1 11h3v3h-3zm9-16h4v3h-4z' />
      <path fill='#ffda8b' d='M20 2h4v2h-4zM7 9h5v2H7z' />
    </>
  ),
  melee: (
    <>
      <path
        fill='#647184'
        d='M2 2h5v3h3v3h3v3h3v3h3v5h-5v-3h-3v-3H8v-3H5V7H2zm23 0h5v5h-3v3h-3v3h-3v3h-3v3h-5v-5h3v-3h3V8h3V5h3z'
      />
      <path fill='#b7c1d0' d='M3 3h3v3h3v3h3v3h3v3h-3v-3H9V9H6V6H3zm23 0h3v3h-3v3h-3v3h-3v3h-3v-3h3V9h3V6h3z' />
      <path fill='#c18d4d' d='M8 17h3v3h3v3h3v3h-3v-3h-3v-3H8zm13 0h3v3h-3v3h-3v3h-3v-3h3v-3h3z' />
      <path fill='#986044' d='M5 24h4v4H5zm18 0h4v4h-4zM8 22h3v3H8zm13 0h3v3h-3z' />
    </>
  ),
  stealth: (
    <>
      <path fill='#3c4855' d='M13 2h6v3h4v5h3v7h3v12H3V17h3v-7h3V5h4z' />
      <path fill='#64717c' d='M13 5h5v3h4v7h3v10h-4v-6h-2V9h-4v3h-3v7H9v6H6v-8h3V9h4z' />
      <path fill='#bd9060' d='M12 13h8v4h2v8H10v-8h2z' />
      <path fill='#1c2934' d='M11 17h4v3h-4zm7 0h4v3h-4zM9 24h14v5H9z' />
      <path fill='#e2b376' d='M15 14h3v8h-3z' />
    </>
  ),
  investigation: (
    <>
      <path
        fill='#c49c64'
        d='M8 3h12v3h4v4h2v10h-4v4H10v-2H6v-4H3v-8h2V6h3zm1 3v3H6v8h3v4h11v-3h3v-8h-3V6z'
        fillRule='evenodd'
      />
      <path fill='#f2d29a' d='M9 3h10v2H9zM5 8h2v10H5zm5 12h9v2h-9z' />
      <path fill='#a46e3b' d='M22 21h4v4h3v3h2v3h-5v-3h-3v-3h-3z' />
    </>
  ),
  aim: (
    <>
      <path
        fill='#e8b767'
        d='M14 1h4v4h5v3h4v5h4v4h-4v6h-4v4h-5v4h-4v-4H9v-4H5v-6H1v-4h4V8h4V5h5zm0 7h-4v3H8v10h3v3h10v-3h3V11h-3V8z'
        fillRule='evenodd'
      />
      <path fill='#b17b3f' d='M12 10h8v3h3v7h-3v3h-8v-3H9v-7h3zm1 3v7h7v-7z' fillRule='evenodd' />
      <path fill='#ffdc94' d='M15 8h2v7h7v2h-7v7h-2v-7H8v-2h7z' />
    </>
  ),
  animal: (
    <>
      <path
        fill='#ba8c6b'
        d='M5 7h5v8H5zM12 3h5v9h-5zm9 2h5v9h-5zm6 10h4v6h-4zM4 19h4v-3h5v-3h7v4h4v3h3v8h-6v-2H11v2H5v-3H3z'
      />
      <path fill='#e2bb94' d='M5 7h3v5H5zm7-4h3v6h-3zm9 2h3v6h-3zm6 10h2v4h-2zM13 16h6v4h4v5h-5v-2h-6v2H7v-4h6z' />
    </>
  ),
  alchemy: (
    <>
      <path fill='#758a9b' d='M11 2h10v4h-2v7h3v3h4v4h2v9h-4v2H8v-2H4v-9h2v-4h4v-3h3V6h-2z' />
      <path fill='#bfd1d9' d='M14 5h4v10h3v3h3v3h2v6h-3v2H9v-2H6v-6h2v-3h3v-3h3z' />
      <path fill='#a53b50' d='M10 19h12v3h2v5h-3v2H11v-2H8v-5h2z' />
      <path fill='#d65c6b' d='M11 20h10v2H11zm-1 3h3v3h-3z' />
      <path fill='#d4a26c' d='M12 2h8v3h-8z' />
    </>
  ),
  music: (
    <>
      <path fill='#737fab' d='M13 6h5V4h10v20h-3v3h-6v-3h-2v-5h3v-2h5V8h-7v2h-2v17h-3v3H6v-3H3v-5h3v-2h7z' />
      <path fill='#bac2e7' d='M14 7h3V6h9v2h-9v3h-2v12h-2V9h1zM6 22h7v3H6zm14-3h5v3h-5z' />
      <path fill='#e0ddf3' d='M17 5h8v1h-8zM6 22h5v1H6z' />
    </>
  ),
  performance: (
    <>
      <path fill='#bd843f' d='M2 4h12v2h4v12h-3v4h-4v3H7v-3H4v-4H2zM17 13h5v2h9v12h-3v3h-8v-3h-3z' />
      <path fill='#f0b561' d='M4 6h9v2h3v10h-3v3H8v-3H6v-3H4zM19 16h4v2h6v8h-3v2h-4v-3h-3z' />
      <path fill='#353442' d='M5 9h3v3H5zm6 1h3v3h-3zM7 15h2v2h4v2H7zm13 5h3v2h-3zm6 0h3v2h-3zm-3 4h3v2h-3z' />
      <path fill='#ffd48b' d='M4 6h8v2H4zm15 10h3v2h-3z' />
    </>
  ),
} satisfies Record<string, ReactNode>;

export default artwork;

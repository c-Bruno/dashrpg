import Head from 'next/head';

type CoverTitleProps = {
  title: string;
};

/**
 * A component that sets the page title in the browser tab.
 * It takes a title prop and appends " | RPG" to it for consistent branding across the application.
 */
const CoverTitle = ({ title }: CoverTitleProps) => {
  return (
    <Head>
      <title>{title} | RPG</title>
    </Head>
  );
};

export default CoverTitle;

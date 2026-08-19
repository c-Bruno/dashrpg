import Head from 'next/head';

type CoverTitleProps = { title: string };

const CoverTitle = ({ title }: CoverTitleProps) => {
  return (
    <Head>
      <title>{title} | RPG</title>
    </Head>
  );
};

export default CoverTitle;

import { useEffect } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

/**
 * Root page — immediately redirects to /dashboard.
 * Kept minimal: the real entry-point is the dashboard.
 */
const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard');
  }, [router]);

  return (
    <>
      <Head>
        <title>DashRPG</title>
      </Head>
      <p>Carregando...</p>
    </>
  );
};

export default Home;

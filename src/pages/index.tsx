import type { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: {
    destination: '/dashboard/characters',
    permanent: false,
  },
});

const Home = () => null;

export default Home;

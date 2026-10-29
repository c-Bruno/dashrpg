import MasterDashboardService from 'core/services/Master/dashboard.service';
import CharactersScreen from 'features/master/characters/screens/characters.screen';
import type { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
  const props = await MasterDashboardService.fetchDashboardInitialData();
  return { props };
};

export default CharactersScreen;

import { MasterDashboardService } from 'core/services';
import { MasterDashboard } from 'main/components/pages';

export const getServerSideProps = async () => {
  const props = await MasterDashboardService.fetchDashboardInitialData();
  return { props };
};

export default MasterDashboard;

import MasterDashboardService from 'core/services/Master/dashboard.service';
import { MasterDashboard } from 'main/components/pages';

export const getServerSideProps = async () => {
  const props = await MasterDashboardService.fetchDashboardInitialData();
  return { props };
};

export default MasterDashboard;

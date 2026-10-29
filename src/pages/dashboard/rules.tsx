import MasterRulesService from 'core/services/Master/rules.service';
import RulesScreen from 'features/master/rules/screens/rules.screen';
import type { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => ({
  props: await MasterRulesService.fetchRulesInitialData(),
});

export default RulesScreen;

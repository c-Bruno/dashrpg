import { Map } from 'immutable';

import {
  dashboardConfig,
  dashboardData,
  dashboardLayout,
  dashboardSaga,
  getWizardContext,
} from '../dashboardSelector';

describe('Dashboard selector tests', () => {
  const fakeConfig = { name: 'config' };
  const fakeData = { name: 'data' };
  const fakeLayout = { name: 'layout' };
  const fakeSaga = { name: 'query' };
  const fakeWizardContext = {
    key: {
      name: 'wizard',
    },
  };

  const fakeState = {
    dashboard: Map({
      configs: fakeConfig,
      data: fakeData,
      layout: fakeLayout,
      query: fakeSaga,
      wizard: fakeWizardContext,
    }),
  };

  it('should return the dashboard config', () => {
    expect(dashboardConfig(fakeState)).toEqual({ configs: fakeConfig });
  });

  it('should return the dashboard data', () => {
    expect(dashboardData(fakeState)).toEqual({ data: fakeData });
  });

  it('should return the dashboard layout', () => {
    expect(dashboardLayout(fakeState)).toEqual({ layout: fakeLayout });
  });

  it('should return the dashboard query', () => {
    expect(dashboardSaga(fakeState)).toEqual({ sagaConfig: fakeSaga });
  });

  it('should return the dashboard wizard context', () => {
    expect(getWizardContext(fakeState, 'key')).toEqual(fakeWizardContext.key);
  });
});

import { createSelector } from 'reselect';

const dashboardDataSelector = state => state.dashboard;

const layoutSelector = createSelector(dashboardDataSelector, payload => payload.get('layout'));
const dataSelector = createSelector(dashboardDataSelector, payload => payload.get('data'));
const configsSelector = createSelector(dashboardDataSelector, payload => payload.get('configs'));
const sagaSelector = createSelector(dashboardDataSelector, payload => payload.get('query'));
const titleSelector = createSelector(dashboardDataSelector, payload => payload.get('title'));
const wizardSelector = createSelector(dashboardDataSelector, payload => payload.get('wizard'));

export const dashboardLayout = state => ({
  layout: layoutSelector(state),
});

export const dashboardData = state => ({
  data: dataSelector(state),
});

export const dashboardConfig = state => ({
  configs: configsSelector(state),
});

export const dashboardSaga = state => ({
  sagaConfig: sagaSelector(state),
});
export const dashboardTitle = state => ({
  title: titleSelector(state),
});

export const dashboardWizard = state => ({
  wizard: wizardSelector(state),
});

export const getWizardContext = createSelector(
  dashboardDataSelector,
  (_, id) => id,
  (payload, id) => payload.get('wizard')[id],
);

export const dashboardsSelector = createSelector(
  state => state.dashboard,
  map => map.get('dashboards'),
);

export const dashboardsPaginationSelector = createSelector(
  state => state.dashboard,
  map => map.get('paginationControl'),
);

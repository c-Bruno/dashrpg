import { Map } from 'immutable';
import { handleActions } from 'redux-actions';

export const CHARACTER = Object.freeze({
  UPDATE: 'app/character/UPDATE'
})

export const reducers = {
  [CHARACTER.UPDATE]: state => state.set('updatingDashboardConfig', true),
};

export const initialState = () =>
  Map({
    updatingDashboardConfig: false,
  });

export default handleActions(reducers, initialState());
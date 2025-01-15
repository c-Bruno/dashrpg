import {
  all,
  call,
  cancel,
  fork,
  put,
  race,
  select,
  take,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import { CHARACTER } from '../modules/character'

export const delay = duration => {
  return new Promise(resolve => {
    setTimeout(() => resolve(true), duration);
  });
};

export function* watchCharacter() {
  yield takeEvery(CHARACTER.UPDATE, delay);
}

export const characterSaga = [fork(watchCharacter)];
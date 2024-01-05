import { all } from 'redux-saga/effects';

import { characterSaga } from './character.saga';

export default function* sagas() {
  yield all([...characterSaga]);
}

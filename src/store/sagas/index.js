import { fork, all } from 'redux-saga/effects';
import auth from './auth';
import app from './app';
const rootSaga = function* () {
  yield all([
    ...auth.map(watcher => fork(watcher)),
    ...app.map(watcher => fork(watcher)),
  ]);
};
export default rootSaga;
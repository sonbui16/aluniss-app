import {createStore, applyMiddleware, compose} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logger} from 'redux-logger';

import reducers from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
// if (__DEV__) middleware.push(logger);
if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}
const enhancer = [applyMiddleware(...middleware)];
window.devToolsExtension && enhancer.push(window.devToolsExtension());

const persistConfig = {
  storage: AsyncStorage,
  key: 'Edubit',
  blacklist: [''],
  // debounce: 500
};

const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer, {}, compose(...enhancer));
sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);

export default store;

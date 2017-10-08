import thunk from 'redux-thunk';
import { AsyncStorage } from 'react-native';
import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';

import reducers from './ducks';

const reduxDevTool = window.__REDUX_DEVTOOLS_EXTENSION__ // eslint-disable-line
  ? window.__REDUX_DEVTOOLS_EXTENSION__() // eslint-disable-line
  : undefined;

const createStoreWithMiddleware = compose(applyMiddleware(thunk), autoRehydrate())(createStore);

const store = createStoreWithMiddleware(reducers, {}, reduxDevTool);
persistStore(store, { storage: AsyncStorage, whitelist: ['likedJobs'] });

export default store;

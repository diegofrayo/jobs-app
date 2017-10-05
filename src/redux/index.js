import thunk from 'redux-thunk';
import { AsyncStorage } from 'react-native';
import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';

import reducers from './ducks';

const store = createStore(reducers, {}, compose(applyMiddleware(thunk), autoRehydrate()));
persistStore(store, { storage: AsyncStorage, whitelist: ['likedJobs'] });

export default store;

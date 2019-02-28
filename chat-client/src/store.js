import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import reducers from './reducers/index';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore)
const store = createStoreWithMiddleware(reducers);

store.subscribe(() => console.log('store', store.getState()));

export default store;

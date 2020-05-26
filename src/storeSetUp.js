import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import rootReducer from './reducers';

// use applyMiddleware to add the thunk middleware to the store
const middleware = applyMiddleware(thunk,logger);

const store = createStore(rootReducer, middleware)

export default store;
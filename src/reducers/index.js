import { combineReducers } from 'redux';

import updateLogReducer from './updateLogReducer';
import indiaCovidCountReducer from './indiaCovidCountReducer';
import worldStatsReducer from './worldStatasticsReducer';

const rootReducer = combineReducers({
    updateLogReducer,
    indiaCovidCountReducer,
    worldStatsReducer
});

export default rootReducer;
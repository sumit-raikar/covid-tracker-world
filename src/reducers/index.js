import { combineReducers } from 'redux';

import updateLogReducer from './updateLogReducer';
import indiaCovidCountReducer from './indiaCovidCountReducer';
import worldStatsReducer from './worldStatasticsReducer';
import stateTableReducer from './stateTableReducer';

const rootReducer = combineReducers({
    updateLogReducer,
    indiaCovidCountReducer,
    worldStatsReducer,
    stateTableReducer
});

export default rootReducer;
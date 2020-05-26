import { updateLog } from '../constants';

const initialState = {
    isLoading: false,
    updateLogs: [],
    error: ''
}

const transformUnixTimeToUTF = (ts) => {
    // convert unix timestamp to milliseconds
    const ts_ms = ts * 1000;

    // initialize new Date object
    const date_ob = new Date(ts_ms);
    return date_ob;
}

const combineText = (allText, newSubstring) => {
    return allText.concat(newSubstring);
}

const transformLogs = (logs) => {
    return logs.map(log => {
        let logToShow = '';
        const logArray = log.update.split("\n");
        const time = transformUnixTimeToUTF(log.timestamp);
        if (logArray.length > 1) {
            logToShow = logArray.reduce(combineText, '');
        } else {
            logToShow = log.update;
        }
        return {
            update: logToShow,
            timestamp: time
        };
    })
}

const updateLogReducer = (state = initialState, action) => {
    switch (action.type) {
        case updateLog.request: {
            return {
                ...state,
                isLoading: true,
                error: ''
            }
        }
        case updateLog.success: {
            return {
                ...state,
                isLoading: false,
                updateLogs: transformLogs(action.payload)
            }
        }
        case updateLog.failure: {
            return {
                ...state,
                isLoading: false,
                updateLogs: [],
                error: action.payload
            }
        }
        default: {
            return state;
        }
    }
}

export default updateLogReducer;
import { updateLog } from '../constants';

const getCovidUpdateLog = () => {
    return async (dispatch) => {
        dispatch({ type: updateLog.request });
        try {
            const response = await fetch('https://api.covid19india.org/updatelog/log.json');
            const res = await response.json();
            dispatch({ type: updateLog.success, payload: res });
        } catch (e) {
            dispatch({ type: updateLog.failure, payload: e });
        }
    }
}

export default {
    getCovidUpdateLog
};
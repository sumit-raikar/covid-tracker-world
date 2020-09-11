import { stateCovidCount } from '../constants';

const getStateCovidCount = () => {
    return async (dispatch) => {
        dispatch({ type: stateCovidCount.request });
        try {
            const response = await fetch('https://api.covid19india.org/data.json');
            const responseStatewise = await fetch('https://api.covid19india.org/state_district_wise.json');
            const res = await response.json();
            const resStatewise = await responseStatewise.json();
            dispatch({ type: stateCovidCount.success, payload: res, extraData: resStatewise });
        } catch (e) {
            dispatch({ type: stateCovidCount.failure, payload: e });
        }
    }
}


const sortCovidCount = (data, sortOrder) => {
    return {
        type: stateCovidCount.sortSuccess,
        payload: { data, sortOrder }
    }
}

const sortDistrictCovidCount = (data, sortOrder) => {
    return {
        type: stateCovidCount.sortDistSuccess,
        payload: { data, sortOrder }
    }
}

export default {
    getStateCovidCount,
    sortCovidCount,
    sortDistrictCovidCount
};
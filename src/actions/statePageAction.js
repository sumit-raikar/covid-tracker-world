import { statePageVariable } from '../constants';

const getDistrictCovidData = () => {
    return async (dispatch) => {
        dispatch({ type: statePageVariable.request });
        try {
            const response = await fetch('https://api.covid19india.org/data.json');
            const responseStatewise = await fetch('https://api.covid19india.org/state_district_wise.json');
            const resStatewise = await responseStatewise.json();
            const res = await response.json();
            dispatch({ type: statePageVariable.success, payload: res, extraData: resStatewise });
        } catch (e) {
            dispatch({ type: statePageVariable.failure, payload: e });
        }
    }
}


export default { getDistrictCovidData };
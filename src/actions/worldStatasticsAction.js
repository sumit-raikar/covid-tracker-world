import { worldStats } from '../constants';

const getAllCountryStatastics = () => {
    return async (dispatch) => {
        dispatch({ type: worldStats.request });
        try {
            const response = await fetch('https://covid-193.p.rapidapi.com/statistics', {
                headers: {
                    "x-rapidapi-host": "covid-193.p.rapidapi.com",
                    "x-rapidapi-key": "72f8bce3f5msh3ff2719a55f3a4ep18cdb0jsne780cae29258",
                    "useQueryString": true
                }
            });
            const res = await response.json();
            dispatch({ type: worldStats.success, payload: res });
        } catch (e) {
            dispatch({ type: worldStats.failure, payload: e });
        }
    }
}

const sortStatastics = (data, sortOrder) => {
    // console.log(data, sortOrder);
    return {
        type: worldStats.sortSuccess,
        payload: { data, sortOrder }
    }
}

const searchStatastics = (searchText) => {
    // console.log(searchText);
    return {
        type: worldStats.searchSuccess,
        payload: searchText
    }
}

export default {
    getAllCountryStatastics,
    sortStatastics,
    searchStatastics
};
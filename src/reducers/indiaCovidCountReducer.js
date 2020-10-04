import { stateCovidCount } from '../constants';
import compareValues from '../common-components/compare-values';
import convertNumberToINRFormat from '../common-components/currency-converter';

const randomId = (min, max) => {
    return Math.random() * (max - min) + min;
}
const initialState = {
    isLoading: false,
    stateWiseCovidCount: [],
    statewiseDistrictData: [],
    error: ''
}

const constructStateWiseData = (districtData) => {
    const tempDistrictData = [];
    for (let newDistrict in districtData) {
        tempDistrictData.push({
            district: newDistrict,
            confirmed: convertNumberToINRFormat(districtData[newDistrict].confirmed),
            active: convertNumberToINRFormat(districtData[newDistrict].active),
            recovered: convertNumberToINRFormat(districtData[newDistrict].recovered),
            deceased: convertNumberToINRFormat(districtData[newDistrict].deceased),
            deltaconfirmed: convertNumberToINRFormat(districtData[newDistrict]['delta'].confirmed),
            deltadeceased: convertNumberToINRFormat(districtData[newDistrict]['delta'].deceased),
            deltarecovered: convertNumberToINRFormat(districtData[newDistrict]['delta'].recovered),
            key: randomId(1, 100)
        });
    }
    // console.log(tempDistrictData);
    return tempDistrictData;
}

const transformIndianCovidCount = (payload, extraData) => {
    const covidStateDetails = [];
    let tempToalIndiaCovidCount = null;
    payload.statewise.forEach(state => {
        // Filter out the Total covid count of all state combined and this to last position.
        if (state.state !== 'Total' && state.statecode !== 'TT') {
            const distWise = extraData[state.state]
            covidStateDetails.push({
                confirmed: convertNumberToINRFormat(state.confirmed),
                active: convertNumberToINRFormat(state.active),
                recovered: convertNumberToINRFormat(state.recovered),
                deceased: convertNumberToINRFormat(state.deaths),
                deltaconfirmed: convertNumberToINRFormat(state.deltaconfirmed),
                deltadeceased: convertNumberToINRFormat(state.deltadeaths),
                deltarecovered: convertNumberToINRFormat(state.deltarecovered),
                state: state.state,
                statecode: state.statecode,
                lastupdatedtime: state.lastupdatedtime,
                districtWiseData: constructStateWiseData(distWise.districtData),
                rowClickEnable: true,
                key: randomId(1000, 10000),
                routeLink: '/state',
            })
        } else {
            tempToalIndiaCovidCount = {
                confirmed: convertNumberToINRFormat(state.confirmed),
                active: convertNumberToINRFormat(state.active),
                recovered: convertNumberToINRFormat(state.recovered),
                deceased: convertNumberToINRFormat(state.deaths),
                deltaconfirmed: convertNumberToINRFormat(state.deltaconfirmed),
                deltadeceased: convertNumberToINRFormat(state.deltadeaths),
                deltarecovered: convertNumberToINRFormat(state.deltarecovered),
                state: state.state,
                statecode: state.statecode,
                lastupdatedtime: state.lastupdatedtime,
                key: randomId(1000, 10000)
            }
        }
    });
    covidStateDetails.push(tempToalIndiaCovidCount);
    return covidStateDetails;
}

const sortCovidCount = (indiaCovidCount, payload) => {
    const { data, sortOrder } = payload;
    const sortedCovidCount = JSON.parse(JSON.stringify(indiaCovidCount));
    return sortedCovidCount.sort(compareValues(data, sortOrder));
}

const sortDistrictCovidCount = (indiaCovidCount, payload) => {
    const { data, sortOrder } = payload;
    const sortedCovidCount = JSON.parse(JSON.stringify(indiaCovidCount));
    const newSortedData = sortedCovidCount.map(stateData => {
        if (stateData.state !== 'Total' && stateData.statecode !== 'TT') {
            return {
                ...stateData,
                districtWiseData: stateData.districtWiseData.sort(compareValues(data, sortOrder))
            }
        }
        return {
            ...stateData
        }
    });
    return newSortedData;
}

const indiaCovidCountReducer = (state = initialState, action) => {
    switch (action.type) {
        case stateCovidCount.request: {
            return {
                ...state,
                isLoading: true,
                error: ''
            }
        }
        case stateCovidCount.success: {
            return {
                ...state,
                isLoading: false,
                stateWiseCovidCount: transformIndianCovidCount(action.payload, action.extraData),
                statewiseDistrictData: action.extraData
            }
        }
        case stateCovidCount.failure: {
            return {
                ...state,
                isLoading: false,
                stateWiseCovidCount: [],
                error: action.payload
            }
        }
        case stateCovidCount.sortSuccess: {
            const tempSortCovidCount = sortCovidCount(state.stateWiseCovidCount, action.payload);
            return {
                ...state,
                isLoading: false,
                stateWiseCovidCount: [...tempSortCovidCount],
                error: ''
            }
        }
        case stateCovidCount.sortDistSuccess: {
            const tempSortCovidCount = sortDistrictCovidCount(state.stateWiseCovidCount, action.payload);
            return {
                ...state,
                isLoading: false,
                stateWiseCovidCount: [...tempSortCovidCount],
                error: ''
            }
        }
        default: {
            return state;
        }
    }
}

export default indiaCovidCountReducer;
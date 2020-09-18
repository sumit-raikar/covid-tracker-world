import { statePageVariable } from '../constants';

const initialState = {
    isLoading: false,
    stateTableData: [],
    error: ''
}

const randomId = (min, max) => {
    return Math.random() * (max - min) + min;
}

const constructStateWiseData = (districtData) => {
    const tempDistrictData = [];
    for (let newDistrict in districtData) {
        tempDistrictData.push({
            district: newDistrict,
            confirmed: districtData[newDistrict].confirmed,
            active: districtData[newDistrict].active,
            recovered: districtData[newDistrict].recovered,
            deceased: districtData[newDistrict].deceased,
            deltaconfirmed: districtData[newDistrict]['delta'].confirmed,
            deltadeceased: districtData[newDistrict]['delta'].deceased,
            deltarecovered: districtData[newDistrict]['delta'].recovered,
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
                confirmed: state.confirmed,
                active: state.active,
                recovered: state.recovered,
                deceased: state.deaths,
                deltaconfirmed: state.deltaconfirmed,
                deltadeceased: state.deltadeaths,
                deltarecovered: state.deltarecovered,
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
                confirmed: state.confirmed,
                active: state.active,
                recovered: state.recovered,
                deceased: state.deaths,
                deltaconfirmed: state.deltaconfirmed,
                deltadeceased: state.deltadeaths,
                deltarecovered: state.deltarecovered,
                state: state.state,
                statecode: state.statecode,
                lastupdatedtime: state.lastupdatedtime,
                key: randomId(1000, 10000)
            }
        }
    });
    covidStateDetails.push(tempToalIndiaCovidCount);
    console.log(covidStateDetails);
    return covidStateDetails;
}

const stateTableReducer = (state = initialState, action) => {
    switch (action.type) {
        case statePageVariable.request: {
            return {
                ...state,
                isLoading: true,
                error: ''
            }
        }
        case statePageVariable.success: {
            return {
                ...state,
                isLoading: false,
                stateTableData: transformIndianCovidCount(action.payload, action.extraData),
            }
        }
        case statePageVariable.failure: {
            return {
                ...state,
                isLoading: false,
                stateTableData: [],
                error: action.payload
            }
        }
        default: {
            return state;
        }
    }
}

export default stateTableReducer;
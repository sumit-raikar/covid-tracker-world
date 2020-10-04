import { statePageVariable } from '../constants';
import convertNumberToINRFormat from '../common-components/currency-converter';

const initialState = {
    isLoading: false,
    stateTableData: [],
    error: '',
    isLoadingTimeSeries: false,
    stateTimeseriesData: { stateDailyCases: [], districtDailyCases: [] }
}

const randomId = (min, max) => {
    return Math.random() * (max - min) + min;
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

const transformTimeSeriesData = (timeseriesData, statecode) => {
    const deepCopyTimeseriesData = JSON.parse(JSON.stringify(timeseriesData));
    // --------------
    const tempStateDailyChanges = deepCopyTimeseriesData[statecode]['dates'];
    const stateDailyChanges = [];
    for (const property in tempStateDailyChanges) {
        stateDailyChanges.push(
            {
                date: property,
                confirmed: tempStateDailyChanges[property].hasOwnProperty('delta') ? tempStateDailyChanges[property]['delta']['confirmed'] || 0 : 0,
                recovered: tempStateDailyChanges[property].hasOwnProperty('delta') ? tempStateDailyChanges[property]['delta']['recovered'] || 0 : 0,
                deceased: tempStateDailyChanges[property].hasOwnProperty('delta') ? tempStateDailyChanges[property]['delta']['deceased'] || 0 : 0,
                tested: tempStateDailyChanges[property].hasOwnProperty('delta') ? tempStateDailyChanges[property]['delta']['tested'] || 0 : 0,
            }
        )
    }
    // --------------
    const tempDistrictDailyChanges = deepCopyTimeseriesData[statecode]['districts'];
    const districtDailyChanges = [];
    for (const property in tempDistrictDailyChanges) {
        const district = tempDistrictDailyChanges[property]['dates'];
        const districtDaily = [];
        for (const districtDate in district) {
            districtDaily.push(
                {
                    date: districtDate,
                    confirmed: district[districtDate].hasOwnProperty('delta') ? district[districtDate]['delta']['confirmed'] || 0 : 0,
                    recovered: district[districtDate].hasOwnProperty('delta') ? district[districtDate]['delta']['recovered'] || 0 : 0,
                    deceased: district[districtDate].hasOwnProperty('delta') ? district[districtDate]['delta']['deceased'] || 0 : 0,
                    tested: district[districtDate].hasOwnProperty('delta') ? district[districtDate]['delta']['tested'] || 0 : 0,
                }
            )
        }
        districtDailyChanges.push(
            {
                name: property,
                dailyChanges: districtDaily
            }
        );
    }
    return { stateDailyCases: stateDailyChanges, districtDailyCases: districtDailyChanges };
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
        case statePageVariable.timeseriesRequest: {
            return {
                ...state,
                isLoadingTimeSeries: true,
                errorTimeSeries: ''
            }
        }
        case statePageVariable.timeseriesSuccess: {
            return {
                ...state,
                isLoadingTimeSeries: false,
                stateTimeseriesData: transformTimeSeriesData(action.payload, action.statecode),
            }
        }
        case statePageVariable.timeseriesFailure: {
            return {
                ...state,
                isLoadingTimeSeries: false,
                stateTimeseriesData: {},
                errorTimeSeries: action.payload
            }
        }
        default: {
            return state;
        }
    }
}

export default stateTableReducer;
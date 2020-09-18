import React, { useEffect, useState } from 'react';
import StateTotalCount from './stateTotalCount';
import StateTable from './stateTable';
import DistrictGraph from './districtGraph';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import action from '../../actions';

const IndiaStateCovidstatus = () => {
    const [evalStateTotalCount, setEvalStateTotalCount] = useState({})
    let { stateVal } = useParams();
    const indiaCovidTableData = useSelector(state => state.stateTableReducer.stateTableData);
    const isLoading = useSelector(state => state.stateTableReducer.isLoading);
    const dispatch = useDispatch();
    useEffect(() => {
        if (indiaCovidTableData.length === 0) {
            dispatch(action.stateDataActions.getDistrictCovidData());
        }
        if (indiaCovidTableData.length > 0) {
            const stateCode = indiaCovidTableData.filter(state => state.statecode === stateVal);
            if (stateCode.length > 0) { // check for valid state code
                setEvalStateTotalCount(stateCode[0]);
            }
        }

    }, [indiaCovidTableData.length]);
    return (
        <div>
            {isLoading ? (<div>Loading State Data...</div>) : (<div><StateTotalCount stateData={evalStateTotalCount} />
                <div>
                    <div>
                        <StateTable />
                    </div>
                    <div>
                        <DistrictGraph />
                    </div>
                </div>
            </div>)
            }
        </div>
    );
}

export default IndiaStateCovidstatus;
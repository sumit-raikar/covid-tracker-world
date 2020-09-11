import React from 'react';
import { useSelector } from 'react-redux';
import './ics.scss';

const IndiaCovidStatus = () => {
    const indiaCovidTableData = useSelector(state => state.indiaCovidCountReducer.stateWiseCovidCount);
    let indiaCovidStatus = null;
    if (indiaCovidTableData.length >= 1) {
        indiaCovidStatus = indiaCovidTableData.filter(state => state.state === 'Total' && state.statecode === 'TT');
    }

    return (
        indiaCovidStatus === null ? (<div>Loading total india covid status...</div>) :
            (<div className="india-covid-status">
                <div>
                    <div>
                        Confirmed
                </div>
                    <div>
                        {indiaCovidStatus[0].confirmed}
                    </div>
                </div>
                <div>
                    <div>
                        Active
                </div>
                    <div>
                        {indiaCovidStatus[0].active}
                    </div>
                </div>
                <div>
                    <div>
                        Recovered
                </div>
                    <div>
                        {indiaCovidStatus[0].recovered}
                    </div>
                </div>
                <div>
                    <div>
                        Deseased
                </div>
                    <div>
                        {indiaCovidStatus[0].deceased}
                    </div>
                </div>
            </div>)
    );
}

export default IndiaCovidStatus;
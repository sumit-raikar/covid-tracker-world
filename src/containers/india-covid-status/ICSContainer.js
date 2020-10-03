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
            (<div className="india-covid-status-container">
                <div className='india-covid-status'>
                    <div className='status-grid-container'>
                        <div className='status-label'>
                            Confirmed
                        </div>
                        <div className='status-center'>
                            {indiaCovidStatus[0].confirmed}
                        </div>
                    </div>
                    <div className='status-grid-container'>
                        <div className='status-label'>
                            Active
                        </div>
                        <div className='status-center'>
                            {indiaCovidStatus[0].active}
                        </div>
                    </div>
                    <div className='status-grid-container'>
                        <div className='status-label'>
                            Recovered
                        </div>
                        <div className='status-center'>
                            {indiaCovidStatus[0].recovered}
                        </div>
                    </div>
                    <div className='status-grid-container'>
                        <div className='status-label'>
                            Deseased
                        </div>
                        <div className='status-center'>
                            {indiaCovidStatus[0].deceased}
                        </div>
                    </div>
                </div>
            </div>)
    );
}

export default IndiaCovidStatus;
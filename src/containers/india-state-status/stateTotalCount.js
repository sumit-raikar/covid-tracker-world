import React from 'react';
import './indiaStateStatus.scss';

const StateTotalCount = ({ stateData }) => {
    console.log(stateData);
    const { state, lastupdatedtime, confirmed, active, recovered, deceased, deltaconfirmed, deltadeceased, deltarecovered } = stateData;
    return (
        <div className='state-total-count'>
            <div className='container'>
                <div>
                    {state}
                    <span className='last-update'>Last updated: {lastupdatedtime}</span>
                </div>
                <div className='status-grid-container'>
                    <div className='status-grid'>
                        <div className='label-grid'>
                            <div>Confirmed</div>
                            <div className='label-right'>{deltaconfirmed}</div>
                            <div className='label-right'>{confirmed}</div>
                        </div>
                        <div className='label-grid'>
                            <div>Active</div>
                            <div></div>
                            <div className='label-right'>{active}</div>
                        </div>
                        <div className='label-grid'>
                            <div>Recovered</div>
                            <div className='label-right'>{deltarecovered}</div>
                            <div className='label-right'>{recovered}</div>
                        </div>
                        <div className='label-grid'>
                            <div>Deceased</div>
                            <div className='label-right'>{deltadeceased}</div>
                            <div className='label-right'>{deceased}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StateTotalCount;
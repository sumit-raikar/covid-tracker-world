import React from 'react';
import './indiaStateStatus.scss';

const StateTotalCount = ({ stateData }) => {
    const { state, lastupdatedtime, confirmed, active, recovered, deceased, deltaconfirmed, deltadeceased, deltarecovered } = stateData;
    return (
        <div className='state-total-count'>
            <div className='container'>
                <div className='status-grid-container'>
                    <div className='state-last-upate'>
                        <div className='state-name'>{state}</div>
                        <div className='state-update-time'>Last updated: {lastupdatedtime}</div>
                    </div>
                    <div className='status-grid'>
                        <div className='label-grid'>
                            <div className='label-action'>Confirmed</div>
                            <div className='label-right'>{deltaconfirmed}</div>
                            <div className='label-right'>{confirmed}</div>
                        </div>
                        <div className='label-grid'>
                            <div className='label-action'>Active</div>
                            <div></div>
                            <div className='label-right'>{active}</div>
                        </div>
                        <div className='label-grid'>
                            <div className='label-action'>Recovered</div>
                            <div className='label-right'>{deltarecovered}</div>
                            <div className='label-right'>{recovered}</div>
                        </div>
                        <div className='label-grid'>
                            <div className='label-action'>Deceased</div>
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
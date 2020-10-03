import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import WorldData from '../../components/world-data';
import actions from '../../actions';

import './world.scss';

const tableHeadings = [
    { ref: 'country', label: 'Country', sorting: true },
    { ref: 'total', label: 'Total', sorting: true },
    { ref: 'active', label: 'Active', sorting: true },
    { ref: 'recovered', label: 'Recovered', sorting: true },
    { ref: 'death', label: 'Deseased', sorting: true },
    { ref: 'tests', label: 'Total covid tests', sorting: true },
    { ref: 'population', label: 'Population', sorting: true },
    { ref: 'lastUpdated', label: 'Last Updated', sorting: true },
]

let boundWorldActionCreator = null;
function World() {
    const [searchText, setSearchText] = useState('');
    const worldStats = useSelector(state => state.worldStatsReducer.worldStats);
    const isLoading = useSelector(state => state.worldStatsReducer.isLoading);
    const dispatch = useDispatch();

    if (boundWorldActionCreator === null) {
        boundWorldActionCreator = bindActionCreators(actions.worldStatasticsAction.sortStatastics, dispatch);
    }
    useEffect(() => {
        if (worldStats.length === 0) {
            dispatch(actions.worldStatasticsAction.getAllCountryStatastics());
        }
    }, []);
    return (
        <div className='world-container'>
            {
                isLoading ?
                    (<div>Loading world data...</div>) :
                    (<div className='basic-layout'>
                        <div className='search-container'>
                            <span className='search-label'>search any country:</span> <input className='search-field' value={searchText} placeholder='Search for countries' onChange={(e) => { setSearchText(e.target.value); dispatch(actions.worldStatasticsAction.searchStatastics(e.target.value)) }} />
                        </div>
                        <WorldData headings={tableHeadings} data={worldStats} action={boundWorldActionCreator} />
                    </div>)
            }
        </div>
    );
}

export default World;

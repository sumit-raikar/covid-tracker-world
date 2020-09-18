import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../../actions';
import Table from '../../common-components/table/table';

const tempHeading = [
    { ref: 'state', label: 'State', route: true, sorting: true },
    { ref: 'confirmed', label: 'Confirmed', sorting: true },
    { ref: 'active', label: 'Active', sorting: true },
    { ref: 'recovered', label: 'Recovered', sorting: true },
    { ref: 'deceased', label: 'Deceased', sorting: true }
]

const subHeadings = [
    { ref: 'district', label: 'District', sorting: true },
    { ref: 'confirmed', label: 'Confirmed', sorting: true },
    { ref: 'active', label: 'Active', sorting: true },
    { ref: 'recovered', label: 'Recovered', sorting: true },
    { ref: 'deceased', label: 'Deceased', sorting: true }
]
let boundCovidCountActionCreator = null;
let boundCovidCountSubActionCreator = null;
function ICCTable() {

    const indiaCovidTableData = useSelector(state => state.indiaCovidCountReducer.stateWiseCovidCount);

    const dispatch = useDispatch();
    useEffect(() => {
        console.log('get india covid count');
        if (indiaCovidTableData.length === 0) {
            dispatch(actions.getStateCovidCountActions.getStateCovidCount())
        }
    }, []);

    useEffect(() => {
        console.log('get india covid count');
    }, []);
    if (boundCovidCountActionCreator === null) {
        boundCovidCountActionCreator = bindActionCreators(actions.getStateCovidCountActions.sortCovidCount, dispatch);
    }
    console.log(boundCovidCountActionCreator);
    if (boundCovidCountSubActionCreator === null) {
        boundCovidCountSubActionCreator = bindActionCreators(actions.getStateCovidCountActions.sortDistrictCovidCount, dispatch);
    }
    console.log(boundCovidCountSubActionCreator);
    return (
        <div>
            <Table headings={tempHeading} data={indiaCovidTableData} subHeadings={subHeadings} action={boundCovidCountActionCreator} subAction={boundCovidCountSubActionCreator} />
        </div>
    );
}

export default ICCTable;
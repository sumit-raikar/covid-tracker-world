import React, { useEffect } from 'react';
import LogMainController from '../daily-log/logMainContainer';
import ICCTable from '../india-covid-count/ICCTable';
import IndiaCovidStatus from '../india-covid-status/ICSContainer';
import Table from '../../common-components/table/table';
import Top3State from '../india-top-3-state';
import './homePageContainer.scss';

function HomePageContainer() {
    return (
        <div className='home-page-container'>
            <LogMainController />
            <IndiaCovidStatus />
            <div className='icc-table-top-3-state'>
                <div className='icc-table'>
                    <ICCTable />
                </div>
                <div>
                    <Top3State />
                </div>
            </div>

        </div>
    );
}

export default HomePageContainer;
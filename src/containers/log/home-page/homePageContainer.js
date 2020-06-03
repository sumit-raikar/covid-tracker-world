import React from 'react';
import LogMainCintroller from '../daily-log/logMainContainer';
import Table from '../../../common-components/table/table';

function HomePageContainer() {
    return (
        <div>
            <LogMainCintroller />
            <Table />
        </div>
    );
}

export default HomePageContainer;
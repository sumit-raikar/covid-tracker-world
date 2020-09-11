import React, { useEffect } from 'react';
import Table from '../../common-components/table/table';

function areEqual(prevProps, nextProps) {
    return false;
}

const WorldData = React.memo(({ headings, data, action }) => {
    return (
        <div>
            <Table headings={headings} data={data} action={action} />
        </div>
    );
}, areEqual);

export default WorldData;

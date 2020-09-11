import React from 'react';
import Table from '../table/table';

const Top3Card = ({ description, tableHeadings, tableData }) => {
    return (
        <div>
            <div>
                {description}
            </div>
            <div>
                <Table headings={tableHeadings} data={tableData} />
            </div>
        </div>
    );
}

export default Top3Card;
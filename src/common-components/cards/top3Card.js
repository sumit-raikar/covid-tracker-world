import React from 'react';
import Table from '../table/table';
import './top3cards.scss';

const Top3Card = ({ description, tableHeadings, tableData }) => {
    return (
        <div className='top-3-card-container'>
            <div className='label'>
                {description}
            </div>
            <div>
                <Table headings={tableHeadings} data={tableData} />
            </div>
        </div>
    );
}

export default Top3Card;
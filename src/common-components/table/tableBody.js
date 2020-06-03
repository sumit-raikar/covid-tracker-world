import React from 'react';

const TableBody = ({ data }) => {
    const renderBody = (_row, rowCell) => {
        
        return (
            <th
                key={`row-${rowCell}`}
            >
                {_heading.label}
            </th>
        )
    }

    return (
        <thead>
            <tr>{data.map(renderBody)}</tr>
        </thead>
    );
}

export default TableBody;
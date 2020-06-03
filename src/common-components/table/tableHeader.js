import React from 'react';

const TableHeading = ({ headings }) => {
    const renderHeadings = (_heading, headingIndex) => {
        return (
            <th
                key={`heading-${headingIndex}`}
            >
                {_heading.label}
            </th>
        )
    }
    
    return (
        <thead>
            <tr>{headings.map(renderHeadings)}</tr>
        </thead>
    );
}

export default TableHeading;
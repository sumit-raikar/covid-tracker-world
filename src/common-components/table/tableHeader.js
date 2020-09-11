import React, { useState, useEffect } from 'react';

const TableHeading = ({ headings, action }) => {
    const [sortState, setSortState] = useState([]);
    useEffect(() => {
        let newSortState = [];
        headings.forEach(heading => {
            newSortState.push('asc')
        });
        setSortState(newSortState);
    }, [headings.length]);

    const onHeadingClick = (heading, headingIndex) => {
        console.log(heading, sortState[headingIndex]);
        // Change asc to desc in setstate
        console.log(sortState);
        let newSortState = [];
        sortState.forEach((data, index) => {
            if (index === headingIndex) {
                newSortState.push(data === 'asc' ? 'desc' : 'asc');
            }
            newSortState.push('asc');
        })
        setSortState(newSortState);
        action(heading.ref, sortState[headingIndex]);
    }

    const renderHeadings = (_heading, headingIndex) => {
        return (
            <th
                key={`heading-${headingIndex}`}
                onClick={() => {
                    if (_heading.sorting) {
                        onHeadingClick(_heading, headingIndex)
                    }
                }
                }
            >
                {_heading.label}
                {_heading.sorting && <span className='sort-order'>{sortState[headingIndex]}</span>}
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
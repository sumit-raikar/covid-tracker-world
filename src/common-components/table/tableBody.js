import React, { useState } from 'react';
import {
    Link,
} from "react-router-dom";
import Table from './table';
const TableBody = ({ data, headings, subHeadings, onlinkClick, subAction }) => {
    const [expandedRows, setExpandedRows] = useState([]);

    const handleRowClick = (row) => {
        if (row.rowClickEnable) {
            const currentExpandedRows = expandedRows;
            const isRowCurrentlyExpanded = expandedRows.includes(row.statecode);
            const newExpandedRows = isRowCurrentlyExpanded ? currentExpandedRows.filter(id => id !== row.statecode) : currentExpandedRows.concat(row.statecode);

            setExpandedRows(newExpandedRows);
        }
    }

    const returnTableBody = () => {
        let allItemRows = [];
        if (data.length === 0) {
            return;
        }
        data.forEach((rowData, index) => {
            const perItemRows = renderItem(rowData, index);
            allItemRows = allItemRows.concat(perItemRows);
        })
        return allItemRows;
    }
    const renderItem = (_row, rowCell) => {

        const itemRows = [
            <tr onClick={() => { handleRowClick(_row) }} key={_row.key + rowCell.toString()}>

                {headings.map((tableHeadData, index) => {
                    const deltaValue = `delta${tableHeadData.ref}`;
                    const oneMValue = `1m${tableHeadData.ref}`;
                    return <td key={_row.key + index.toString()}>
                        <div className={tableHeadData.route ? `table-body-cell-container table-body-right-content` : 'table-body-right-content'}>
                            <div>
                                <div>{_row[deltaValue]}</div>
                                <div>{_row[tableHeadData.ref]}</div>
                                {_row[oneMValue] && <div>1M-POP, {_row[oneMValue]}</div>}
                            </div>
                            {tableHeadData.route && <div>
                                <div onClick={(e) => { e.stopPropagation() }}>{tableHeadData.route && <Link to={tableHeadData.route ? _row['routeLink'] + `/${_row.statecode}` : ''}>Open new</Link>}</div>
                            </div>}
                        </div>
                    </td>
                })}
            </tr>
        ];

        if (expandedRows.includes(_row.statecode)) {
            itemRows.push(
                <tr key={"row-expanded-" + _row.statecode}>
                    <td colSpan={headings.length} className='table-expand-cell'>
                        <Table headings={subHeadings} data={_row.districtWiseData} action={subAction} />
                    </td>
                </tr>
            );
        }

        return itemRows;

    }

    return (
        <tbody>
            {returnTableBody()}
        </tbody>
    );
}

export default TableBody;
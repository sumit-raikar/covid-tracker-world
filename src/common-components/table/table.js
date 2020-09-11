import React, { useEffect } from 'react';
import TableHeading from './tableHeader';
import './table.scss';
import TableBody from './tableBody';

const Table = (props) => {
    useEffect(() => {

    }, []);
    return (
        <table>
            <TableHeading headings={props.headings} action={props.action} />
            <TableBody headings={props.headings} data={props.data} subHeadings={props.subHeadings} subAction={props.subAction}/>
        </table>
    );
}

export default Table;
import React, { useEffect } from 'react';
import TableHeading from './tableHeader';
import './table.scss';
import TableBody from './tableBody';

const headings = [
    { label: 'Name', heading: 'name' },
    { label: 'Roll No', heading: 'rollno' },
]

const data = [
    { name: 'Sumeeth', rollno: 54 },
    { name: 'Rahul', rollno: 53 },
    { name: 'Amit', rollno: 55 },
    { name: 'BB', rollno: 58 }
]

const Table = () => {
    useEffect(() => {

    }, []);
    return (
        <table>
            <TableHeading headings={headings} />
            {/* <tbody>{tbodyMarkup}</tbody> */}
            <TableBody headings={headings} data={data} />
        </table>
    );
}

export default Table;
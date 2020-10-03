import React from 'react';
import {
    BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const BarCharts = ({ height, width, data, XDataKey, barDataKey, color }) => {
    return (
        <BarChart
            width={width}
            height={height}
            data={data}
            margin={{
                top: 5, right: 30, left: 20, bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={XDataKey} />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
            <ReferenceLine y={0} stroke="#000" />
            <Brush dataKey={XDataKey} height={30} stroke="#8884d8" />
            <Bar dataKey={barDataKey} fill={color} />
        </BarChart>
    );
}

export default BarCharts;
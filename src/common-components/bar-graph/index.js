import React from 'react';
import {
    BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer
} from 'recharts';

const BarCharts = ({ height, width, data, XDataKey, barDataKey, color, responsive }) => {
    const barChartProp = {};
    if(!responsive){
        barChartProp.width = width;
        barChartProp.height = height;
    }
    return (
        <ResponsiveContainer width={width} height={height}>
            <BarChart
                data={data}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
                {...barChartProp}
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
        </ResponsiveContainer>
    );
}

export default BarCharts;
import React from 'react';
import BarCharts from '../../common-components/bar-graph';
import './stateGraph.scss';

const graphTypes = [{ type: 'confirmed', color: 'blue' }, { type: 'recovered', color: 'green' }, { type: 'deceased', color: 'grey' }, { type: 'tested', color: 'red' }]
const StateTable = ({ stateTimeSeriesData }) => {
    return (
        <div className='state-graph-container'>
            {
                graphTypes.map(graph => {
                    return <div key={graph.type}>
                        <BarCharts
                            width={400}
                            height={250}
                            data={stateTimeSeriesData.stateDailyCases}
                            XDataKey='date'
                            barDataKey={graph.type}
                            color={graph.color}
                        /></div>
                })
            }
        </div>
    );
}

export default StateTable;
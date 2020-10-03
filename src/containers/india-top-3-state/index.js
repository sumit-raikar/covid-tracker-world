import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Top3Card from '../../common-components/cards/top3Card';
import compareValues from '../../common-components/compare-values';
import './top-3-state.scss';

const newsHeadings = [
    {
        desc: 'Top 3 cities with highest ACTIVE covid case',
        tableHeading: [
            { ref: 'cityState', label: 'City,State' },
            { ref: 'active', label: 'Active' }
        ],
        tableData: [],
        criteria: 'active',
    },
    {
        desc: 'Top 3 cities with highest covid case FOUND TODAY',
        tableHeading: [
            { ref: 'cityState', label: 'City,State' },
            { ref: 'cases', label: 'Cases' }
        ],
        tableData: [],
        criteria: 'highest'
    },
    {
        desc: 'Top 3 cities with highest covid case RECOVERED',
        tableHeading: [
            { ref: 'cityState', label: 'City,State' },
            { ref: 'totalRecovered', label: 'Total Recovered' }
        ],
        tableData: [],
        criteria: 'totalRecovered'
    },
    {
        desc: 'Top 3 cities with highest covid case RECOVERED TODAY',
        tableHeading: [
            { ref: 'cityState', label: 'City,State' },
            { ref: 'recoveredToday', label: 'Recovered Today' }
        ],
        tableData: [],
        criteria: 'recoveredToday'
    }
]

function getTop3DistrictData(indiaCovidTableData, criteria) {

    if (criteria === 'active') {
        const stateDataCollected = [];
        indiaCovidTableData.forEach((data) => {
            if (data.hasOwnProperty('districtWiseData')) {
                data.districtWiseData.forEach(dt => {
                    stateDataCollected.push({
                        cityState: `${dt.district}, ${data.state}`,
                        active: dt.active
                    })
                })
            }
        });
        stateDataCollected.sort(compareValues('active', 'desc'));
        return stateDataCollected.slice(0, 3);
    } else if (criteria === 'highest') {
        const stateDataCollected = [];
        indiaCovidTableData.forEach((data) => {
            if (data.hasOwnProperty('districtWiseData')) {
                data.districtWiseData.forEach(dt => {
                    stateDataCollected.push({
                        cityState: `${dt.district}, ${data.state}`,
                        cases: dt.deltaconfirmed
                    })
                })
            }
        });
        console.log(stateDataCollected);
        stateDataCollected.sort(compareValues('cases', 'desc'));
        return stateDataCollected.slice(0, 3);
    } else if (criteria === 'totalRecovered') {
        const stateDataCollected = [];
        indiaCovidTableData.forEach((data) => {
            if (data.hasOwnProperty('districtWiseData')) {
                data.districtWiseData.forEach(dt => {
                    stateDataCollected.push({
                        cityState: `${dt.district}, ${data.state}`,
                        totalRecovered: dt.recovered
                    })
                })
            }
        });
        console.log(stateDataCollected);
        stateDataCollected.sort(compareValues('totalRecovered', 'desc'));
        return stateDataCollected.slice(0, 3);
    } else if (criteria === 'recoveredToday') {
        const stateDataCollected = [];
        indiaCovidTableData.forEach((data) => {
            if (data.hasOwnProperty('districtWiseData')) {
                data.districtWiseData.forEach(dt => {
                    stateDataCollected.push({
                        cityState: `${dt.district}, ${data.state}`,
                        recoveredToday: dt.deltarecovered
                    })
                })
            }
        });
        console.log(stateDataCollected);
        stateDataCollected.sort(compareValues('recoveredToday', 'desc'));
        return stateDataCollected.slice(0, 3);
    }

}

function Top3State() {
    const [tableHeadings, setTableHeadings] = useState(newsHeadings);
    const indiaCovidTableData = useSelector(state => state.indiaCovidCountReducer.stateWiseCovidCount);
    const isLoading = useSelector(state => state.indiaCovidCountReducer.isLoading);
    useEffect(() => {
        let newTableData = [];
        newTableData = tableHeadings.map((heading) => {
            return {
                ...heading,
                tableData: getTop3DistrictData(indiaCovidTableData, heading.criteria)
            }
        })
        setTableHeadings(newTableData)
    }, [indiaCovidTableData.length]);
    return (
        <div className='top-3-state-container'>
            {isLoading && <div>
                Loading short news...
            </div>}
            {!isLoading && <React.Fragment>
                {
                    tableHeadings.map((news, index) => {
                        return <Top3Card key={index} description={news.desc} tableHeadings={news.tableHeading} tableData={news.tableData} />
                    })
                }
            </React.Fragment>}
        </div>
    );
}

export default Top3State;
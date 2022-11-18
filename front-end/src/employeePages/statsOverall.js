import React, {useEffect, useState} from 'react';
import '../css/reporttable.css';
import { createAPIEndpoint, ENDPOINTS } from '../api/index.js';

function StatsOverall() {
    const [data,setData] = useState({});

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.overallReport)
        .fetch()
        .then(response => {
            console.log(response.data);
            setData({
                avgEntries: response.data.avgEntries,
                avgRevenue: response.data.avgRevenue,
                avgRainouts: response.data.avgRainouts,
                avgBreakdowns: response.data.avgBreakdowns,
                popularRide: response.data.mostPopularRide
            });
        })
        .catch(error => console.log(error))
    },[data]);

    const renderReport = () => {
        return (
            <div className='result-box'>
                <div style={{float:"left"}}>
                    <p>Average Entries per Month:</p>
                    <p>Average Revenue per Month:</p>
                    <p>Average Breakdowns per Month:</p>
                    <p>Average Rainy Days per Month:</p>
                    <p>Most Popular Ride of All Time:</p>
                </div>
                <div style={{float:"right"}}>
                    <p>{data.avgEntries}</p>
                    <p>{data.avgRevenue}</p>
                    <p>{data.avgBreakdowns}</p>
                    <p>{data.avgRainouts}</p>
                    <p>{data.popularRide}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="searchpage">
            <h2>Overall Park Report</h2>
            <br /><br />
            {renderReport()}
        </div>
    );
}

export default StatsOverall;
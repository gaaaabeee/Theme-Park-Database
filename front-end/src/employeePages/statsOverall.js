import React, {useEffect, useState} from 'react';
import '../css/report.css';
import { createAPIEndpoint, ENDPOINTS } from '../api/index.js';

function StatsOverall() {
    const [data,setData] = useState({});

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.overall)
        .fetch()
        .then(response => {
            console.log(response.data);
            setData({
                avgEntries: response.data[0].average_entries,
                avgRevenue: response.data[0].average_revenue,
                avgRainouts: response.data[0].average_rainouts,
                avgBreakdowns: response.data[0].average_breakdowns,
                popularRide: response.data[0].mostPopularRide
            });
        })
        .catch(error => console.log(error))
    },[]);

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
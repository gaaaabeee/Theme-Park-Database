import React, {useEffect, useState} from 'react';
import '../css/reporttable.css';
import { createAPIEndpoint, ENDPOINTS } from '../api/index.js';

function AttractionPastMonth() {
    const [rides, setRides]= useState([]);
    const [shops, setShops]= useState([]);

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.ridesPastMonth)
        .fetch()
        .then(response => {
            setRides(response.data);
        })
        .catch(error => console.log(error))
    },[rides]);

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.shopsPastMonth)
        .fetch()
        .then(response => {
            setShops(response.data);
        })
        .catch(error => console.log(error))
    },[shops]);

    const renderRideTable = () => {
        return rides.map((elem,idx) => {
            return (
                <tr>
                    <td>{idx+1}</td>
                    <td>{elem['ride']}</td>
                    <td>{elem['average Rides a Day']}</td>
                    <td>{elem['total Rides within Past Month']}</td>
                </tr>
            );
        })
    };
    const renderShopTable = () => {
        return shops.map((elem,idx) => {
            return (
                <tr>
                    <td>{idx+1}</td>
                    <td>{elem['shop']}</td>
                    <td>${elem['average Revenue a Day']}</td>
                    <td>${elem['total Revenue within Past Month']}</td>
                </tr>
            );
        })
    };

    let today = new Date();
    let oneMonthAgo = new Date(today);
    oneMonthAgo.setMonth(oneMonthAgo.getMonth()-1);
    return (
        <div className='searchpage'>
            <div className="search-header">
                <h1>Attraction Popularity from Past Month</h1>
                <h3>Report from <span style={{color:"yellow"}}>{oneMonthAgo.toDateString()}</span> to <span style={{color:"yellow"}}>{today.toDateString()}</span>.</h3>
                <p className="search-info"></p>
                <p>This page shows attraction popularity between today and 1 month from now for rides and shops.<br/>
                Ride popularity is ranked by average rides a day and shop popularity is ranked by average revenue a day.</p>
            </div>
            <br />
            <div className="flex-result-charts">
                <div className="flex-result-chart">
                    <div className="table-title">Rides</div>
                    <table className="result-table">
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Name</th>
                                <th>Average Rides a Day</th>
                                <th>Total Rides Within Past Month</th>
                            </tr>
                        </thead>
                        <tbody>{renderRideTable()}</tbody>
                    </table>
                </div>
                <div className="flex-result-chart">
                    <div className="table-title">Shops</div>
                    <table className="result-table">
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Name</th>
                                <th>Average Revenue a Day</th>
                                <th>Total Revenue Within Past Month</th>
                            </tr>
                        </thead>
                        <tbody>{renderShopTable()}</tbody>
                    </table>
                </div>
            </div>
            <br />
        </div>
    );
}

export default AttractionPastMonth;
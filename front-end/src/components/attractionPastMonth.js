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
            <h2>Attraction Popularity from Past Month</h2>
            <p>Report from {oneMonthAgo.toDateString()} to {today.toDateString()}.</p>
            <br />
            <table className="result-table">
                <thead>
                    <tr className="table-title">Rides</tr>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Average Rides a Day</th>
                        <th>Total Rides Within Past Month</th>
                    </tr>
                </thead>
                <tbody>{renderRideTable()}</tbody>
            </table>
            <br /><br />
            <table className="result-table">
                <thead>
                    <tr className="table-title">Shops</tr>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Average Revenue Day</th>
                        <th>Total Revenue Within Past Month</th>
                    </tr>
                </thead>
                <tbody>{renderShopTable()}</tbody>
            </table>
            <br />
        </div>
    );
}

export default AttractionPastMonth;
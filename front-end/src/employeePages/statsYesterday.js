import React, {useState,useEffect} from 'react';
import '../css/reporttable.css';
import { createAPIEndpoint, ENDPOINTS } from '../api/index.js';

const getFreshModel = () => ({
    date: "",
    dayname: "",
    entries: "0",
    revenue: "0",
    holiday: "no",
    open: "yes",
    rainy: "no",
    mostPopularRide: ""
})

function StatsLastOpen() {
    const [data, setData]= useState(getFreshModel);
    const [today,setToday] = useState(false);

    return (
        <div className="searchpage">
            <div className="search-header">
                <h1>Report from Last Park Opening</h1>
                <p className="search-info">View Park Report from the last full day the park was open.<br/>
                Information is gathered from each park day at 8:10 PM (10 minutes after closing). 
                If information has not yet been gathered for today then it will show the report from yesterday, or
                 the last time the park was opened if it was closed yesterday.</p>
            </div>
        </div>
    );
}

export default StatsLastOpen;
import React, {useEffect, useState} from 'react';
import '../css/report.css';
import { createAPIEndpoint, ENDPOINTS } from '../api/index.js';
import useStateContext from '../hooks/useStateContext';
import { TodayValueBox } from '../components/report/todayGridBox';
import YearCharts from '../components/report/yearCharts';
import GeneralCharts from '../components/report/generalCharts';

const getFreshModel = () => ({
    avgEntries: "",
    avgRevenue: "",
    avgRainouts: "",
    avgBreakdowns: "",
    popularRide: "",
})

function StatsOverall() {
    const {context,setContext} = useStateContext();
    const [data,setData] = useState(getFreshModel);
    const [name,setName] = useState("");
    const [loaded,setLoaded] = useState(false);
    const today = new Date();

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.employee)
        .fetch()
        .then(response => {
            console.log(response.data);
            const thisEmp = response.data.find((item) => (item.employee_id == context.login_id));
            setName(thisEmp.fname + " " + thisEmp.lname);
        })
        .catch(error => console.log(error))

        const dataObj = getFreshModel();
        createAPIEndpoint(ENDPOINTS.overall)
        .fetch()
        .then(response => {
            console.log(response.data);
            dataObj.avgEntries = response.data[0].average_entries;
            dataObj.avgRevenue = response.data[0].average_revenue;
            dataObj.avgRainouts = response.data[0].average_rainouts;
            dataObj.avgBreakdowns = response.data[0].average_breakdowns;
        })
        .catch(error => console.log(error))

        const d = today.toISOString().split("T")[0];
        createAPIEndpoint(ENDPOINTS.mostPopularRide+'/2022-01-01/'+d)
        .fetch()
        .then(response => {
            console.log(response.data[0]);
            dataObj.popularRide = response.data[0].most_popular_ride;
        })
        .catch(error => console.log(error))

        setData(dataObj);
    },[]);

    useEffect(() => setLoaded(true),[data]);

    return (
        <div className="searchpage">
            <div className="search-header">
                <h1>Welcome Employee {name}</h1>
                <p className="search-info">View general park diagnostics on this page. Click on a section in the vertical navbar to view park reports or
                click on one of the sections on the top navbar to view entries in the park database</p>
            </div>
            <div className="month-header">
                <p className="time-period">General Park Diagnostics</p>
            </div>
            {loaded && 
            <div className="today-report-grid">
                <TodayValueBox label="Average Entries per Month" value={data.avgEntries}/>
                <TodayValueBox label="Average Revenue per Month" value={'$'+data.avgRevenue}/>
                <TodayValueBox label="Average New Breakdowns per Month" value={data.avgBreakdowns}/>
                <TodayValueBox label="Average Rainouts per Month" value={data.avgRainouts}/>
                <TodayValueBox label="Most Popular Ride of All Time" value={data.popularRide}/>
            </div>}
            <div className="month-header">
                <p className="time-period">Monthly Stats for Current Year {today.getFullYear()}</p>
            </div>
            <YearCharts/>
            <div className="month-header">
                <p className="time-period">View Stats from Past Time Periods</p>
            </div>
            <GeneralCharts/>
        </div>
    );
}

export default StatsOverall;
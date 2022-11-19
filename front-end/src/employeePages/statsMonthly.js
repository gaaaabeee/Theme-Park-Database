import React, {useState} from 'react';
import { createAPIEndpoint, ENDPOINTS } from '../api/index.js';
import '../css/monthpage.css';
import {MonthValueBox,MonthChartBox} from '../components/report/monthGridBox.js';

const blankFilters = {
    year: new Date().getFullYear(),
    month: "January"
};

const getFreshModel = () => ({
    year: "",
    month: "",
    avgEntries: "",
    totalEntries: "",
    avgRevenue: "",
    totalRevenue: "",
    avgBreakdowns: "",
    totalBreakdowns: "",
    rainouts: ""
})

function StatsMonthly() {
    const [data, setData]= useState(getFreshModel);
    const [popRide,setPopRide] = useState({mostPopularRide:""});
    const [breakdownList,setBreakdownList] = useState([]);
    const [days,setDays] = useState(0);
    const [filters, setFilters] = useState(blankFilters);
    const updateFilters = (obj) => {setFilters({...filters,...obj});}
    const [submitted,setSubmitted] = useState(false);
    const [validData,setValidData] = useState(false);

    const validate = () => {
        const today = new Date();
        if (parseInt(filters.year) <= today.getFullYear()) {
            let month = new Date(Date.parse(filters.month+" 1, 2022")).getMonth();
            if (month <= today.getMonth()) {
                return true;
            }
        }
        return false;
    }

    const getreport = () => {
        setSubmitted(true);
        if (validate()) {
            createAPIEndpoint(ENDPOINTS.months+filters.month+'/'+filters.year)
            .fetch()
            .then(response => {
                console.log(response.data);
                setData({
                    year: response.data[0].year,
                    month: response.data[0].month,
                    avgEntries: response.data[0].average_entries,
                    totalEntries: response.data[0].total_entries,
                    avgRevenue: response.data[0].average_revenue,
                    totalRevenue: response.data[0].total_revenue,
                    avgBreakdowns: response.data[0].average_breakdown,
                    totalBreakdowns: response.data[0].total_breakdowns,
                    rainouts: response.data[0].total_rainy_days,
                })})
            .catch(error => {
                console.log(error)
                alert("Failed to get monthly report from server.")
            });

            createAPIEndpoint(ENDPOINTS.mostPopularRidebyMonth+filters.month+'/'+filters.year)
            .fetch()
            .then(response => {
                console.log(response.data[0]);
                setPopRide({mostPopularRide: response.data[0].most_popular_ride});
            })
            .catch(error => {
                console.log(error);
                alert("Failed to fetch most popular ride of the month from server.")
            })

            createAPIEndpoint(ENDPOINTS.breakdowns+'/'+filters.month+'/'+filters.year)
            .fetch()
            .then(response => {
                console.log(response.data);
                setBreakdownList(response.data);
            })
            .catch(error => {
                console.log(error);
                alert("Failed to get breakdown list of this month from the server.")
            });
            setValidData(true);
        }
        else {
            setValidData(false);
        }
    }

    const renderBreakdownList = () => {
        if (validData) {
            return breakdownList.map(elem => {
                return (
                    <tr key={elem.breakdown_id}>
                        <td>{elem.breakdown_id}</td>
                        <td>{elem.ride_id}</td>
                        <td>{elem.name}</td>
                        <td>{elem.breakdown_nums}</td>
                        <td>{elem.maintainer_id}</td>
                        <td>{new Date(elem.breakdown_date).toLocaleString()}</td>
                        <td>{elem.breakdown_desc}</td>
                        <td>{elem.resolved ? "Yes" : "No"}</td>
                    </tr>
                );
            })
        }
        else {
            return (
                <td>No Data</td>
            )
        }
    }

    let todaysYear = new Date().getFullYear();
    return (
        <div className='searchpage'>
            <div className="search-header">
                <h1>Monthly Reports</h1>
                <p className="search-info">On this page, you can view stats of the park within a given month.</p>
            </div>
            <div className="optionbox">
                <div className="search-area">
                    <h2>Month Search</h2>
                    <form name="monthsearch" id="monthsearch" className="searchbox monthsearchbox">
                        <p>*Search by year and month.</p>
                        <table className="filter-table">
                            <tr>
                                <th>Year:</th>
                                <th>Month:</th>
                            </tr>
                            <tr>
                                <td><input type="number" name="year" value={filters.year} onChange={(e) => updateFilters({year:e.target.value})} min="2022" max={todaysYear} required/></td>
                                <td><select type="text" name="month" onChange={(e) => updateFilters({month:e.target.value})} required>
                                        <option value="January">January</option>
                                        <option value="February">February</option>
                                        <option value="March">March</option>
                                        <option value="April">April</option>
                                        <option value="May">May</option>
                                        <option value="June">June</option>
                                        <option value="July">July</option>
                                        <option value="August">August</option>
                                        <option value="September">September</option>
                                        <option value="October">October</option>
                                        <option value="November">November</option>
                                        <option value="December">December</option>
                                    </select>
                                </td>
                            </tr>
                        </table>
                    </form><br/>
                    <button onClick={getreport} className="submit-button" type="button">Search Month</button>
                </div>
            </div>
            <br /><br />
            {validData &&
            <>
                <div className="month-header">
                    <p className="time-period">{data.month} {data.year}</p>
                    <p>Including <b>x</b> Days in Report</p>
                </div>
                <div className="month-report-grid">
                    <MonthValueBox label="Average Entries per Day" value={data.avgEntries}/>
                    <MonthValueBox label="Total Entries this Month" value={data.totalEntries}/>
                    <MonthValueBox label="Most Entries in a Day this Month" value={""}/>
                    <MonthValueBox label="Date of Most Entries this Month" value={""}/>
                    <MonthValueBox label="Least Entries in a Day this Month" value={""}/>
                    <MonthValueBox label="Date of Least Entries this Month" value={""}/>
                    <MonthValueBox label="Entry Rate Compared to Overall Average" value={""}/>
                    <MonthValueBox label="Rainy Days this Month" value={data.rainouts}/>

                    <MonthValueBox label="Average Revenue per Day" value={'$'+parseFloat(data.avgRevenue).toFixed(2)}/>
                    <MonthValueBox label="Total Revenue this Month" value={'$'+parseFloat(data.totalRevenue).toFixed(2)}/>
                    <MonthValueBox label="Largest Revenue in a Day this Month" value={""}/>
                    <MonthValueBox label="Date of Largest Revenue this Month" value={""}/>
                    <MonthValueBox label="Smallest Revenue in a Day" value={""}/>
                    <MonthValueBox label="Date of Smallest Revenue this Month" value={""}/>
                    <MonthValueBox label="Revenue Rate Compared to Overall Average" value={""}/>
                    <MonthValueBox label="Likelihood of Rain per Day" value={""}/>

                    <MonthValueBox label="Average New Breakdowns per Day" value={data.avgBreakdowns}/>
                    <MonthValueBox label="Total New Breakdowns this Month" value={data.totalBreakdowns}/>
                    <MonthValueBox label="Number of Days a Breakdown Occurred this Month" value={""}/>
                    <MonthValueBox label="Most Breakdowns in a Day" value={""}/>
                    <MonthValueBox label="Date of Most Breakdowns this Month" value={""}/>
                    <MonthValueBox label="Likelihood of a New Breakdown per Day" value={""}/>
                    <MonthValueBox label="Ride that Broke Down the Most this Month" value={""}/>
                    <MonthValueBox label="Most Popular Ride this Month" value={popRide.mostPopularRide}/>

                    <MonthChartBox/>
                    <MonthChartBox/>
                </div>
            </>}
            <br/>
            {validData && 
            <div>
                <h3>Reported Breakdowns this Month</h3>
                <table className='result-table'>
                    <thead>
                        <tr>
                            <th>Breakdown ID</th>
                            <th>Ride ID</th>
                            <th>Ride Name</th>
                            <th>Times Ride Broke Down</th>
                            <th>Maintainer ID</th>
                            <th>Breakdown Date</th>
                            <th>Breakdown Description</th>
                            <th>Resolved</th>
                        </tr>
                    </thead>
                    <tbody>{renderBreakdownList()}</tbody>
                </table>
            </div>}
        </div>
    )
}

export default StatsMonthly;
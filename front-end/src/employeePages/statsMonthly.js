import React, {useState} from 'react';
import { createAPIEndpoint, ENDPOINTS } from '../api/index.js';
import '../css/monthpage.css';
import {MonthValueBox,MonthChartBox} from '../components/report/monthGridBox.js';
import {BsSearch} from 'react-icons/bs';

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
    rainouts: "",
    mostPopularRide: "",
    days: ""
})

function StatsMonthly() {
    const [data, setData]= useState(getFreshModel);
    const [breakdownList,setBreakdownList] = useState([]);
    const [filters, setFilters] = useState(blankFilters);
    const updateFilters = (obj) => {setFilters({...filters,...obj});}
    const [validData,setValidData] = useState(false);
    const [entryChart,setEntryChart] = useState({labels:[],values:[]});
    const [revenueChart,setRevenueChart] = useState({labels:[],values:[]});

    const entryChartTitles = {
        title: "Entries per Day",
        xTitle: "Date",
        yTitle: "Entries",
    }

    const revChartTitles = {
        title: "Revenue per Day",
        xTitle: "Date",
        yTitle: "Revenue ($)"
    }

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
        let dataObj = getFreshModel();
        if (validate()) {
            //get month stats
            createAPIEndpoint(ENDPOINTS.months+filters.month+'/'+filters.year)
            .fetch()
            .then(response => {
                console.log(response.data);
                dataObj.year = response.data[0].year;
                dataObj.month = response.data[0].month
                dataObj.avgEntries = response.data[0].average_entries;
                dataObj.totalEntries = response.data[0].total_entries;
                dataObj.avgRevenue = response.data[0].average_revenue;
                dataObj.totalRevenue = response.data[0].total_revenue;
                dataObj.avgBreakdowns = response.data[0].average_breakdown;
                dataObj.totalBreakdowns = response.data[0].total_breakdowns;
                dataObj.rainouts = response.data[0].total_rainy_days;
                })
            .catch(error => {
                console.log(error)
                alert("Failed to get monthly report from server.")
            });

            createAPIEndpoint(ENDPOINTS.mostPopularRidebyMonth+filters.month+'/'+filters.year)
            .fetch()
            .then(response => {
                console.log(response.data[0]);
                dataObj.mostPopularRide = response.data[0].most_popular_ride;
            })
            .catch(error => {
                console.log(error);
                alert("Failed to fetch most popular ride of the month from server.")
            })

            const monthN = getMonthNumberFromName(filters.month);
            dataObj.days = getDaysInMonth(monthN,filters.year);

            setData(dataObj);

            //get chart data
            const firstDay = getFirstDayInMonth(monthN);
            const lastDay = getLastDayInMonth(monthN,filters.year);
            createAPIEndpoint(ENDPOINTS.days+"/"+firstDay+"/"+lastDay)
            .fetch()
            .then(response => {
                console.log(response.data);
                const dates = response.data.map((item) => {return item.date.split("T")[0]});
                const entries = response.data.map((item) => {return item.entries});
                const revenues = response.data.map((item) => {return item.revenue});
                setEntryChart({labels: dates, values: entries});
                setRevenueChart({labels: dates, values: revenues});
            })
            .catch(error => {
                console.log(error);
            })

            //get breakdowns this month
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
            alert("There is no data for a future month.");
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
                    <h2>Select Month</h2>
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
                    <button onClick={getreport} className="submit-button" type="button">Search Month <BsSearch/></button>
                </div>
            </div>
            <br /><br />
            {validData &&
            <>
                <div className="month-header">
                    <p className="time-period">{data.month} {data.year}</p>
                    <p>Including <b>{data.days}</b> Days in Report</p>
                </div>
                <div className="month-report-grid">
                    <MonthValueBox label="Average Entries per Day" value={data.avgEntries}/>
                    <MonthValueBox label="Total Entries this Month" value={data.totalEntries}/>
                    <MonthValueBox label="Rainy Days this Month" value={data.rainouts}/>
                    <MonthValueBox label="Average Revenue per Day" value={'$'+parseFloat(data.avgRevenue).toFixed(2)}/>
                    <MonthValueBox label="Total Revenue this Month" value={'$'+parseFloat(data.totalRevenue).toFixed(2)}/>
                    <MonthValueBox label="Average New Breakdowns per Day" value={data.avgBreakdowns}/>
                    <MonthValueBox label="Total New Breakdowns this Month" value={data.totalBreakdowns}/>
                    <MonthValueBox label="Most Popular Ride this Month" value={data.mostPopularRide}/>

                    <MonthChartBox data={entryChart} titles={entryChartTitles}/>
                    <MonthChartBox data={revenueChart} titles={revChartTitles}/>
                </div>
            </>}
            <br/>
            {validData && 
            <div className="flex-result-chart">
                <div className="table-title">Reported Breakdowns this Month</div>
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

function getMonthNumberFromName(month) {
    let monthN = new Date(Date.parse(month+" 1, 2022")).getMonth();
    return monthN;
}

function getFirstDayInMonth(month) {
    const firstDay = new Date(2022,month,1);
    return firstDay.toISOString().split("T")[0];
}

function getLastDayInMonth(month,year) {
    const lastDay = new Date(year,month+1,0);
    return lastDay.toISOString().split("T")[0];
}

function getDaysInMonth(month,year) {
    return new Date(year,month,0).getDate();
}

export default StatsMonthly;
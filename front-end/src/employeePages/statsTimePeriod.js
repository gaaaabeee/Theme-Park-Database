import React, {useState} from 'react';
import { createAPIEndpoint, ENDPOINTS } from '../api/index.js';
import '../css/monthpage.css';
import {MonthValueBox,MonthChartBox} from '../components/report/monthGridBox.js';
import {BsSearch} from 'react-icons/bs';

const blankFilters = {
    start_date: "",
    end_date: "",
};

const getFreshModel = () => ({
    start_date: "",
    end_date: "",
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

function StatsTimePeriod() {
    const [data, setData]= useState(getFreshModel);
    const [filters, setFilters] = useState(blankFilters);
    const updateFilters = (obj) => {setFilters({...filters,...obj});}
    const [validData,setValidData] = useState(false);
    const [entryChart,setEntryChart] = useState({labels:[],values:[]});
    const [revenueChart,setRevenueChart] = useState({labels:[],values:[]});

    const entryChartTitles = {
        title: "Entries per Day",
        xTitle: "Date",
        yTitle: "Entries"
    }

    const revChartTitles = {
        title: "Revenue per Day",
        xTitle: "Date",
        yTitle: "Revenue ($)"
    }

    const validate = () => {
        const today = new Date();
        const start = new Date(filters.start_date);
        const end = new Date(filters.end_date);
        if (start <= today && end <= today) {
            if (start <= end) {
                return true;
            }
        }
        return false;
    }

    const getreport = () => {
        console.log(filters);
        if (validate()) {
            console.log("Valid");
            let dataObj = getFreshModel();
            createAPIEndpoint(ENDPOINTS.timePeriod+filters.start_date+'/'+filters.end_date)
            .fetch()
            .then(response => {
                console.log(response.data);
                dataObj.start_date = response.data[0].start_date;
                dataObj.end_date = response.data[0].end_date
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
                alert("Failed to get time interval report from server.")
            });

            createAPIEndpoint(ENDPOINTS.mostPopularRide+filters.start_date+'/'+filters.end_date)
            .fetch()
            .then(response => {
                console.log(response.data[0]);
                dataObj.mostPopularRide = response.data[0].most_popular_ride;
            })
            .catch(error => {
                console.log(error);
                alert("Failed to fetch most popular ride of the time interval from server.")
            })

            dataObj.days = getNumDays(filters.start_date,filters.end_date);

            setData(dataObj);

            createAPIEndpoint(ENDPOINTS.days+"/"+filters.start_date+"/"+filters.end_date)
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


            setValidData(true);
        }
        else {
            setValidData(false);
        }
    }
    

    const getToday = () => {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1;
        let yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        today = yyyy + '-' + mm + '-' + dd;
        return today;
    }

    let today = getToday();
    let earliest = "2022-01-01";
    return (
        <div className='searchpage'>
            <div className="search-header">
                <h1>Time Interval Reports</h1>
                <p className="search-info">On this page, you can view stats of the park in a given time interval between 2 dates.</p>
            </div>
            <div className="optionbox">
                <div className="search-area">
                    <h2>Select Time Period</h2>
                    <form name="intervalsearch" id="intervalsearch" className="searchbox monthsearchbox">
                        <p>*Search by start date and end date.</p>
                        <table className="filter-table">
                            <tr>
                                <th>Start Date:</th>
                                <th>End Date:</th>
                            </tr>
                            <tr>
                                <td><input type="date" name="start_date" value={filters.start_date} onChange={(e) => updateFilters({start_date:e.target.value})} min={earliest} max={today} required/></td>
                                <td><input type="date" name="end_date" value={filters.end_date} onChange={(e) => updateFilters({end_date:e.target.value})} min={earliest} max={today} required/></td>
                            </tr>
                        </table>
                    </form><br/>
                    <button onClick={getreport} className="submit-button" type="button">Search Time Interval <BsSearch/></button>
                </div>
            </div>
            <br /><br />
            {validData &&
            <>
                <div className="month-header">
                    <p className="time-period">From {new Date(data.start_date).toLocaleDateString()} to {new Date(data.end_date).toLocaleDateString()}</p>
                    <p>Including <b>{data.days}</b> Days in Report</p>
                </div>
                <div className="month-report-grid">
                    <MonthValueBox label="Average Entries per Day" value={data.avgEntries}/>
                    <MonthValueBox label="Total Number of Entries" value={data.totalEntries}/>
                    <MonthValueBox label="Most Entries in a Day" value={""}/>
                    <MonthValueBox label="Date of Most Entries" value={""}/>
                    <MonthValueBox label="Least Entries in a Day" value={""}/>
                    <MonthValueBox label="Date of Least Entries" value={""}/>
                    <MonthValueBox label="Entry Rate Compared to Overall Average" value={""}/>
                    <MonthValueBox label="Number of Rainy Days" value={data.rainouts}/>

                    <MonthValueBox label="Average Revenue per Day" value={'$'+parseFloat(data.avgRevenue).toFixed(2)}/>
                    <MonthValueBox label="Total Revenue" value={'$'+parseFloat(data.totalRevenue).toFixed(2)}/>
                    <MonthValueBox label="Largest Revenue in a Day" value={""}/>
                    <MonthValueBox label="Date of Largest Revenue" value={""}/>
                    <MonthValueBox label="Smallest Revenue in a Day" value={""}/>
                    <MonthValueBox label="Date of Smallest Revenue" value={""}/>
                    <MonthValueBox label="Revenue Rate Compared to Overall Average" value={""}/>
                    <MonthValueBox label="Likelihood of Rain per Day" value={""}/>

                    <MonthValueBox label="Average New Breakdowns per Day" value={data.avgBreakdowns}/>
                    <MonthValueBox label="Total Number of New Breakdowns" value={data.totalBreakdowns}/>
                    <MonthValueBox label="Number of Days a Breakdown Occurred" value={""}/>
                    <MonthValueBox label="Most Breakdowns in a Day" value={""}/>
                    <MonthValueBox label="Date of Most Breakdowns" value={""}/>
                    <MonthValueBox label="Likelihood of a New Breakdown per Day" value={""}/>
                    <MonthValueBox label="Ride that Broke Down the Most" value={""}/>
                    <MonthValueBox label="Most Popular Ride" value={data.mostPopularRide}/>

                    <MonthChartBox data={entryChart} titles={entryChartTitles}/>
                    <MonthChartBox data={revenueChart} titles={revChartTitles}/>
                </div>
            </>}
            <br/>
        </div>
    )
}

function getNumDays(start,end) {
    const start_d = new Date(start);
    const end_d = new Date(end);
    let days = (end_d.getTime() - start_d.getTime()) / (1000*3600*24)+1;
    return days;
}

export default StatsTimePeriod;
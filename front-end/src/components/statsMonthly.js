import React, {useState} from 'react';
import '../css/reporttable.css';
import { createAPIEndpoint, ENDPOINTS } from '../api/index.js';

function StatsMonthly() {
    const [data, setData]= useState({});

    const blankFilters = {
        year: new Date().getFullYear(),
        month: "January"
    };

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
            setValidData(true);
            createAPIEndpoint(ENDPOINTS.monthReport+filters.month+'/'+filters.year)
            .fetch()
            .then(response => {
                console.log(response.data);
                setData({
                    year: filters.year,
                    month: filters.month,
                    avgEntries: response.data.avgEntries,
                    totalEntries: response.data.totalEntries,
                    avgRevenue: response.data.avgRevenue,
                    totalRevenue: response.data.totalRevenue,
                    avgBreakdowns: response.data.avgBreakdowns,
                    totalBreakdowns: response.data.totalBreakdowns,
                    rainouts: response.data.totalRainouts,
                    mostPopularRide: response.data.mostPopularRide
                })})
            .catch(error => console.log(error))
        }
        else {
            setValidData(false);
        }
    }

    const renderReport = () => {
        if (validData) {
            return (
                <div className='result-box'>
                    <h2>{data.month} {data.year}</h2>
                    <div style={{float:"left"}}>
                        <p>Average Entries a Day:</p>
                        <p>Total Entries this Month:</p>
                        <p>Average Revenue a Day:</p>
                        <p>Total Revenue this Month:</p>
                        <p>Average Breakdowns a Day:</p>
                        <p>Total Breakdowns this Month:</p>
                        <p>Rainy Days this Month:</p>
                        <p>Most Popular Ride this Month:</p>
                    </div>
                    <div style={{float:"right"}}>
                        <p>{data.avgEntries}</p>
                        <p>{data.totalEntries}</p>
                        <p>{data.avgRevenue}</p>
                        <p>{data.totalRevenue}</p>
                        <p>{data.avgBreakdowns}</p>
                        <p>{data.totalBreakdowns}</p>
                        <p>{data.rainouts}</p>
                        <p>{data.mostPopularRide}</p>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className='result-box'>
                    <p>No Data</p>
                </div>
            )
        }
    }

    let todaysYear = new Date().getFullYear();
    return (
        <div className='searchbox'>
            <h2>Monthly Reports</h2>
            <div>
                <p>*Search by year and month.</p>
                <form name="ridesearch" id="ridesearch">
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
                </form>
            </div><br/>
            <button onClick={getreport} className="submit-button" type="button">Search Month</button>
            <br /><br />
            {submitted && renderReport()}
        </div>
    )
}

export default StatsMonthly;
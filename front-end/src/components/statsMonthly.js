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

    const getreport = () => {
        createAPIEndpoint(ENDPOINTS.report+filters.month+'/'+filters.year)
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
                avgRainouts: response.data.avgRainouts,
                totalRainouts: response.data.totalRainouts,
                avgBreakdowns: response.data.avgBreakdowns,
                totalBreakdowns: response.data.totalBreakdowns,
                mostPopularRide: response.data.mostPopularRide
            })})
        .catch(error => console.log(error))
    }

    const renderReport = () => {
        
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
            
        </div>

    )
}

export default StatsMonthly;
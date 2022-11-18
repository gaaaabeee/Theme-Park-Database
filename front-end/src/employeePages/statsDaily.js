import React, {useState} from 'react';
import '../css/reporttable.css';
import { createAPIEndpoint, ENDPOINTS } from '../api/index.js';

function StatsDaily() {
    const [data, setData]= useState([]);

    const blankFilters = {
        fullDate: "",
        min_fullDate: "",
        max_fullDate: "",
        year: "",
        month: "",
        day: "",
        dayname: "",
        open: "",
        holiday: "",
        rainy: "",
        entries: "",
        min_entries: "",
        max_entries: "",
        revenue: "",
        min_revenue: "",
        max_revenue: "",
        new_breakdowns: "",
        min_new_breakdowns: "",
        max_new_breakdowns: "",
        popular_ride: ""
    };

    const [filters, setFilters] = useState(blankFilters);
    const updateFilters = (obj) => {setFilters({...filters,...obj});}

    const findday = () => {
        createAPIEndpoint(ENDPOINTS.report)
        .fetch()
        .then(response => {
            setData(response.data)})
        .catch(error => console.log(error))
    }

    const renderTable = () => {
        let info = data;
        if (filters.fullDate != "") { 
            let fullDate = new Date(filters.fullDate);
            info = info.filter((item) => {
                return (new Date(item.date) == fullDate);
            });
        }
        if (filters.min_fullDate != "" || filters.max_fullDate != "") {
            let minDate, maxDate;
            if (filters.min_fullDate == "") {minDate = new Date("0001-01-01");}
            else {minDate = new Date(filters.min_fullDate);}
            if (filters.max_fullDate == "") {maxDate = new Date("9999-12-31");}
            else {maxDate = new Date(filters.max_fullDate);}
            info = info.filter((item) => {
                const fullDate = new Date(item.date);
                return (fullDate >= minDate && fullDate <= maxDate);
            })
        }
        if (filters.year != "") {
            info = info.filter((item) => {
                const year = new Date(item.date).getFullYear();
                return (filters.year == year);
            })
        }
        if (filters.month != "") {
            info = info.filter((item) => {
                const month = new Date(item.date).getMonth()+1;
                return (filters.month == month);
            })
        }
        if (filters.day != "") {
            info = info.filter((item) => {
                const day = new Date(item.date).getDate();
                return (filters.day == day);
            })
        }
        if (filters.dayname != "") {
            info = info.filter((item) => {
                return (item.dayname == filters.dayname);
            })
        }
        if (filters.open != "") {
            info = info.filter((item) => {
                return (item.open == filters.open);
            })
        }
        if (filters.holiday != "") {
            info = info.filter((item) => {
                return (item.holiday == filters.holiday);
            })
        }
        if (filters.rainy != "") {
            info = info.filter((item) => {
                return (item.rainy_date == filters.rainy);
            })
        }
        if (filters.entries != "") {
            info = info.filter((item) => {
                return (item.entries == filters.entries);
            })
        }
        if (filters.min_entries != "" || filters.max_entries != "") {
            let minEntries,maxEntries;
            if (filters.min_entries == "") {minEntries = 0;}
            else {minEntries = filters.min_entries;}
            if (filters.max_entries == "") {maxEntries = 9999999;}
            else {maxEntries = filters.max_entries;}
            info = info.filter((item) => {
                return (item.entries >= minEntries && item.entries <= maxEntries);
            })
        }
        if (filters.revenue != "") {
            info = info.filter((item) => {
                return (item.revenue == filters.revenue);
            })
        }
        if (filters.min_revenue != "" || filters.max_revenue != "") {
            let minRevenue,maxRevenue;
            if (filters.min_revenue == "") {minRevenue = 0;}
            else {minRevenue = filters.min_revenue;}
            if (filters.max_revenue == "") {maxRevenue = 999999999;}
            else {maxRevenue = filters.max_revenue;}
            info = info.filter((item) => {
                return (item.revenue >= minRevenue && item.revenue <= maxRevenue);
            })
        }
        if (filters.new_breakdowns != "") {
            info = info.filter((item) => {
                return (item.new_breakdowns == parseInt(filters.new_breakdowns));
            });
        }
        if (filters.min_new_breakdowns != "" || filters.max_new_breakdowns != "") {
            let minBreakdowns,maxBreakdowns;
            if (filters.min_new_breakdowns == "") {minBreakdowns = 0;}
            else {minBreakdowns = filters.min_new_breakdowns;}
            if (filters.max_new_breakdowns == "") {maxBreakdowns = 9999999;}
            else {maxBreakdowns = filters.max_new_breakdowns;}
            info = info.filter((item) => {
                return (item.new_breakdowns >= minBreakdowns && item.new_breakdowns <= maxBreakdowns);
            })
        }
        if (filters.popular_ride != "") {
            info = info.filter((item) => {
                return (item.most_popular_ride.toLowerCase().startsWith(filters.popular_ride.toLowerCase()));
            });
        }
        return info.map(elem => {
            return (
                <tr key={elem.date}>
                    <td>{elem.dayname}</td>
                    <td>{elem.open ? "Yes" : "No"}</td>
                    <td>{elem.holiday ? "Yes" : "No"}</td>
                    <td>{elem.rainy_date ? "Yes" : "No"}</td>
                    <td>{elem.entries}</td>
                    <td>{elem.revenue}</td>
                    <td>{elem.new_breakdowns}</td>
                    <td>{elem.most_popular_ride}</td>
                </tr>
            );}
        )
    }

    return (
        <div className='searchpage'>
            <div className="search-header">
                <h1>Daily Reports</h1>
                <p className="search-info">On this page, you can view information of the park on each day.<br/>
                Fields marked as Least and Greatest are search ranges. Using these will return all entries within that range (inclusive).</p>
                <p><u>Key:</u> <b>Full Date</b> = YYYY-MM-DD of the day, <b>Dayname</b> = name of the day (ex: Monday), <b>Open</b> = whether park was open that day<br/>
                <b>Holiday</b> = whether that day is a holiday, <b>Rainout</b> = whether it rained that day, <b>Entries</b> = how many customers entered the park that day,<br/>
                <b>Revenue</b> = how much money the park made that day, <b>New Breakdowns</b> = how many rides broke down that day, <b>Most Popular Ride</b> = most ridden on ride that day</p>
            </div>
            <div className="optionbox">
                <div className="search-area">
                    <h2>Date Search</h2>
                    <form name="daysearch" id="daysearch" className="searchbox">
                        <p>*You can search by exact matches or by ranges. Only search by one or the other.<br/>
                        *Leave all filters blank to return all dates.</p>

                        <table className="filter-table">
                            <tr>
                                <th>Full Date:</th>
                                <th>Least Full Date:</th>
                                <th>Greatest Full Date:</th>
                            </tr>
                            <tr>
                                <td><input type="date" name="fullDate" value={filters.fullDate} onChange={(e) => updateFilters({fullDate:e.target.value,min_fullDate:"",max_fullDate:"",year:"",month:"",day:""})}/></td>
                                <td><input type="date" name="min_fullDate" value={filters.min_fullDate} onChange={(e) => updateFilters({min_fullDate:e.target.value,fullDate:"",year:"",month:"",day:""})}/></td>
                                <td><input type="date" name="max_fullDate" value={filters.max_fullDate} onChange={(e) => updateFilters({max_fullDate:e.target.value,fullDate:"",year:"",month:"",day:""})}/></td>
                            </tr>
                            <tr>
                                <th>Year:</th>
                                <th>Month:</th>
                                <th>Day:</th>
                            </tr>
                            <tr>
                                <td><input type="number" name="year" value={filters.year} onChange={(e) => updateFilters({year:e.target.value,fullDate:"",min_fullDate:"",max_fullDate:""})}/></td>
                                <td><input type="number" name="month" value={filters.month} onChange={(e) => updateFilters({month:e.target.value,fullDate:"",min_fullDate:"",max_fullDate:""})}/></td>
                                <td><input type="number" name="day" value={filters.day} onChange={(e) => updateFilters({day:e.target.value,fullDate:"",min_fullDate:"",max_fullDate:""})}/></td>
                            </tr>
                            <tr>
                                <th>Open?:</th>
                                <th>Rainout?:</th>
                                <th>Holiday?:</th>
                            </tr>
                            <tr>
                                <td>
                                    <select type="number" name="open" value={filters.open} onChange={(e) => updateFilters({open:e.target.value})}>
                                        <option defaultValue=""></option>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </td>
                                <td>
                                    <select type="number" name="rainy" value={filters.rainy} onChange={(e) => updateFilters({rainy:e.target.value})}>
                                        <option defaultValue=""></option>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </td>
                                <td>
                                    <select type="number" name="holiday" value={filters.holiday} onChange={(e) => updateFilters({holiday:e.target.value})}>
                                        <option defaultValue=""></option>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>Entries:</th>
                                <th>Least Entries:</th>
                                <th>Greatest Entries:</th>
                            </tr>
                            <tr>
                                <td><input type="number" name="entries" value={filters.entries} onChange={(e) => updateFilters({entries:e.target.value,min_entries:"",max_entries:""})}/></td>
                                <td><input type="number" name="min_entries" value={filters.min_entries} onChange={(e) => updateFilters({min_entries:e.target.value,entries:""})}/></td>
                                <td><input type="number" name="max_entries" value={filters.max_entries} onChange={(e) => updateFilters({max_entries:e.target.value,entries:""})}/></td>
                            </tr>
                            <tr>
                                <th>Revenue:</th>
                                <th>Least Revenue:</th>
                                <th>Greatest Revenue:</th>
                            </tr>
                            <tr>
                                <td><input type="number" name="entries" value={filters.revenue} onChange={(e) => updateFilters({revenue:e.target.value,min_revenue:"",max_revenue:""})}/></td>
                                <td><input type="number" name="min_revenue" value={filters.min_revenue} onChange={(e) => updateFilters({min_revenue:e.target.value,revenue:""})}/></td>
                                <td><input type="number" name="max_revenue" value={filters.max_revenue} onChange={(e) => updateFilters({max_revenue:e.target.value,revenue:""})}/></td>
                            </tr>
                            <tr>
                                <th>New Breakdowns:</th>
                                <th>Least New Breakdowns:</th>
                                <th>Greatest New breakdowns:</th>
                            </tr>
                            <tr>
                                <td><input type="number" name="new_breakdowns" value={filters.new_breakdowns} onChange={(e) => updateFilters({new_breakdowns:e.target.value,min_new_breakdowns:"",max_new_breakdowns:""})}/></td>
                                <td><input type="number" name="min_new_breakdowns" value={filters.min_new_breakdowns} onChange={(e) => updateFilters({min_new_breakdowns:e.target.value,new_breakdowns:""})}/></td>
                                <td><input type="number" name="max_new_breakdowns" value={filters.max_new_breakdowns} onChange={(e) => updateFilters({max_new_breakdowns:e.target.value,new_breakdowns:""})}/></td>
                            </tr>
                            <tr>
                                <th>Day Name:</th>
                                <th>Most Popular Ride:</th>
                            </tr>
                            <tr>
                                <td>
                                    <select type="text" name="dayname" value={filters.dayname} onChange={(e) => updateFilters({dayname:e.target.value})}>
                                        <option defaultValue=""></option>
                                        <option value="Sunday">Sunday</option>
                                        <option value="Monday">Monday</option>
                                        <option value="Tuesday">Tuesday</option>
                                        <option value="Wednesday">Wednesday</option>
                                        <option value="Thursday">Thursday</option>
                                        <option value="Friday">Friday</option>
                                        <option value="Saturday">Saturday</option>
                                    </select>
                                </td>
                                <td><input type="text" name="popular_ride" value={filters.popular_ride} onChange={(e) => updateFilters({popular_ride:e.target.value})}/></td>
                            </tr>
                        </table>
                    </form>
                    <br/>
                    <button onClick={findday} className="submit-button" type="button">Search Dates</button>
                </div>
            </div>
            <br /><br />
            <br /><br />
            <table className="result-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Day</th>
                        <th>Open</th>
                        <th>Holiday</th>
                        <th>Rainout</th>
                        <th>Entries</th>
                        <th>Revenue</th>
                        <th>New Breakdowns</th>
                        <th>Most Popular Ride</th>
                    </tr>
                </thead>
                <tbody>{renderTable()}</tbody>
            </table>
        </div>

    )
}

export default StatsDaily;
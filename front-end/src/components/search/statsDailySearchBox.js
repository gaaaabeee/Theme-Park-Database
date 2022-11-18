import React, {useState} from 'react';

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

function StatsDailySearchBox(props) {
    const [filters,setFilters] = useState(blankFilters);
    const updateFilters = (obj) => {setFilters({...filters,...obj});};

    const returnFilter = () => {
        props.returnFilters(filters);
    }

    const resetFilters = () => {
        setFilters(blankFilters);
    }

    return (
        <div className="search search-area">
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
            <button onClick={returnFilter} className="submit-button" type="button">Search Dates</button>
        </div>
    );
}

export default StatsDailySearchBox;
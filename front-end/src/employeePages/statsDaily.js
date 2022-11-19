import React, {useEffect, useState} from 'react';
import '../css/reporttable.css';
import StatsDailySearchBox from '../components/search/statsDailySearchBox';
import { createAPIEndpoint, ENDPOINTS } from '../api/index.js';

function StatsDaily() {
    const [data, setData]= useState([]);
    const [doSearch,setDoSearch] = useState(false);
    const [sortF,setSortF] = useState("date");
    const [sortOrder,setSortOrder] = useState(0);
    const [filters, setFilters] = useState();

    const getFromSearch = (filter) => {
        console.log(filter);
        setFilters(filter);
        setDoSearch(!doSearch);
    }

    const findday = () => {
        createAPIEndpoint(ENDPOINTS.days)
        .fetch()
        .then(response => {
            console.log(response.data);
            setData(sortData(filterData(response.data)));
        })
        .catch(error => {
            console.log(error);
            alert("Failed to fetch date list from server.");
        })
    }

    useEffect(() => {
        if (filters) {
            findday();
            console.log(data);
        }
    },[filters,doSearch,sortOrder]);

    const filterData = (info) => {
        info = info.filter((item) => {
            return (new Date(item.date) <= new Date())
        })
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
        return info;
    }

    const sortData = (info) => {
        if (sortF == "date") {
            info.sort((a,b) => {
                return sortDate(a,b,sortOrder);
            })
        }
        else if (sortF == "dayname") {
            info.sort((a,b) => {
                return sortDayname(a,b,sortOrder);
            })
        }
        else if (sortF == "ride") {
            info.sort((a,b) => {
                return sortRide(a,b,sortOrder);
            })
        }
        else if (sortF == "entries") {
            info.sort((a,b) => {
                return sortEntries(a,b,sortOrder);
            })
        }
        else if (sortF == "revenue") {
            info.sort((a,b) => {
                return sortRevenue(a,b,sortOrder);
            })
        }
        else if (sortF == "breakdowns") {
            info.sort((a,b) => {
                return sortBreakdown(a,b,sortOrder);
            })
        }
        else if (sortF == "open") {
            info.sort((a,b) => {
                return sortOpen(a,b,sortOrder);
            })
        }
        else if (sortF == "rainout") {
            info.sort((a,b) => {
                return sortRainout(a,b,sortOrder);
            })
        }
        else if (sortF == "holiday") {
            info.sort((a,b) => {
                return sortHoliday(a,b,sortOrder);
            })
        }
        return info;
    }

    const renderTable = () => {
        return data.map(elem => {
            return (
                <tr key={elem.date}>
                    <td>{new Date(elem.date).toLocaleDateString()}</td>
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

    const setSort = (field) => {
        setSortF(field);
        setDoSearch(!doSearch);
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
                {<StatsDailySearchBox returnFilters={getFromSearch}/>}
            </div>
            <br /><br />
            <br /><br />
            <div>
                <p>Sort by a field by clicking on the column header.</p>
                <label>Sort:</label>
                <select className="tableOption" type="number" name="sortOrder" onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="0">Ascending</option>
                    <option value="1">Descending</option>
                </select>
                <table className="result-table">
                    <thead>
                        <tr>
                            <th><button type="button" className="sortB" onClick={() => setSort("date")}>Date</button></th>
                            <th><button type="button" className="sortB" onClick={() => setSort("dayname")}>Day</button></th>
                            <th><button type="button" className="sortB" onClick={() => setSort("open")}>Open</button></th>
                            <th><button type="button" className="sortB" onClick={() => setSort("holiday")}>Holiday</button></th>
                            <th><button type="button" className="sortB" onClick={() => setSort("rainout")}>Rainout</button></th>
                            <th><button type="button" className="sortB" onClick={() => setSort("entries")}>Entries</button></th>
                            <th><button type="button" className="sortB" onClick={() => setSort("revenue")}>Revenue</button></th>
                            <th><button type="button" className="sortB" onClick={() => setSort("breakdowns")}>New Breakdowns</button></th>
                            <th><button type="button" className="sortB" onClick={() => setSort("ride")}>Most Popular Ride</button></th>
                        </tr>
                    </thead>
                    <tbody>{renderTable()}</tbody>
                </table>
            </div>
        </div>
    )
}

function sortDate(a,b,order) {
    let a_v = new Date(a.date);
    let b_v = new Date(b.date);
    if (order == 1) {
        return b_v - a_v;
    }
    return a_v - b_v;
}

function sortDayname(a,b,order) {
    const dayNums = {"Sunday":0,"Monday":1,"Tuesday":2,"Wednesday":3,"Thursday":4,"Friday":5,"Saturday":6};
    let a_v = dayNums[a.dayname];
    let b_v = dayNums[b.dayname];
    if (order == 1) {
        return (b_v < a_v) ? -1 : (b_v > a_v) ? 1 : 0;
    }
    return (a_v < b_v) ? -1 : (a_v > b_v) ? 1 : 0;
}

function sortOpen(a,b,order) {
    let a_v = a.open;
    let b_v = b.open;
    if (order == 1) {
        return (b_v < a_v) ? -1 : (b_v > a_v) ? 1 : 0;
    }
    return (a_v < b_v) ? -1 : (a_v > b_v) ? 1 : 0;
}

function sortRainout(a,b,order) {
    let a_v = a.rainy_date;
    let b_v = b.rainy_date;
    if (order == 1) {
        return (b_v < a_v) ? -1 : (b_v > a_v) ? 1 : 0;
    }
    return (a_v < b_v) ? -1 : (a_v > b_v) ? 1 : 0;
}

function sortHoliday(a,b,order) {
    let a_v = a.holiday;
    let b_v = b.holiday;
    if (order == 1) {
        return (b_v < a_v) ? -1 : (b_v > a_v) ? 1 : 0;
    }
    return (a_v < b_v) ? -1 : (a_v > b_v) ? 1 : 0;
}

function sortEntries(a,b,order) {
    let a_v = parseInt(a.entries);
    let b_v = parseInt(b.entries);
    if (order == 1) {
        return (b_v < a_v) ? -1 : (b_v > a_v) ? 1 : 0;
    }
    return (a_v < b_v) ? -1 : (a_v > b_v) ? 1 : 0;
}

function sortRevenue(a,b,order) {
    let a_v = parseFloat(a.revenue);
    let b_v = parseFloat(b.revenue);
    if (order == 1) {
        return (b_v < a_v) ? -1 : (b_v > a_v) ? 1 : 0;
    }
    return (a_v < b_v) ? -1 : (a_v > b_v) ? 1 : 0;
}

function sortBreakdown(a,b,order) {
    let a_v = parseInt(a.new_breakdowns);
    let b_v = parseInt(b.new_breakdowns);
    if (order == 1) {
        return (b_v < a_v) ? -1 : (b_v > a_v) ? 1 : 0;
    }
    return (a_v < b_v) ? -1 : (a_v > b_v) ? 1 : 0;
}

function sortRide(a,b,order) {
    let a_v = a.most_popular_ride;
    let b_v = b.most_popular_ride;
    if (order == 1) {
        return (b_v < a_v) ? -1 : (b_v > a_v) ? 1 : 0;
    }
    return (a_v < b_v) ? -1 : (a_v > b_v) ? 1 : 0;
}

export default StatsDaily;
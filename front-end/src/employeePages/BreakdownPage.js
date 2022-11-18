import React, {useState,useEffect} from 'react';
import '../css/reporttable.css';
import BreakdownSearchBox from '../components/search/breakdownSearchBox.js';
import BreakdownEntry from '../components/search/breakdownEntry.js';
import { createAPIEndpoint, ENDPOINTS } from '../api/index.js';

function Breakdown() {
    const [data, setData]= useState([]);
    const [filters, setFilters] = useState();
    const [doSearch,setDoSearch] = useState(false);
    const [sortF,setSortF] = useState("breakdown id");
    const [sortOrder,setSortOrder] = useState(0);

    const getFromSearch = (filter) => {
        console.log(filter);
        setFilters(filter);
        setDoSearch(!doSearch);
    }

    const findbreakdowns = () => {
        createAPIEndpoint(ENDPOINTS.breakdowns)
        .fetch()
        .then(response => {
            console.log(response.data);
            setData(sortData(filterData(response.data)));
        })
        .catch(error => {
            console.log(error);
            alert("Failed to fetch breakdown list from server.")
        })
    }

    useEffect(() => {
        if (filters) {
            findbreakdowns();
            console.log(data);
        }
    },[filters,doSearch,sortOrder]);

    const filterData = (info) => {
        if (filters.breakdown_id != "") { 
            info = info.filter((item) => {
                return (item.breakdown_id == filters.breakdown_id);
            });
        }
        if (filters.ride_id != "") { 
            info = info.filter((item) => {
                return (item.ride_id == filters.ride_id);
            });
        }
        if (filters.ride_name != "") {
            info = info.filter((item) => {
                return (item.name.toLowerCase().startsWith(filters.ride_name.toLowerCase()))
            });
        }
        if (filters.maintainer_id != "") { 
            info = info.filter((item) => {
                return (item.maintainer_id == filters.maintainer_id);
            });
        }
        if (filters.breakdown_date != "") {
            const d = new Date(filters.breakdown_date);
            info = info.filter((item) => {
                return (new Date(item.breakdown_date).toLocaleDateString() == d.toLocaleDateString());
            })
        }
        if (filters.breakdown_desc != "") {
            info = info.filter((item) => {
                return (item.breakdown_desc.toLowerCase().includes(filters.breakdown_desc.toLowerCase()));
            });
        }
        if (filters.resolved != "") {
            info = info.filter((item) => {
                return (item.resolved == filters.resolved);
            })
        }
        return info;
    }

    const sortData = (info) => {
        if (sortF == "breakdown id") {
            info.sort((a,b) => {
                return sortBreakdownId(a,b,sortOrder);
            })
        }
        else if (sortF == "ride id") {
            info.sort((a,b) => {
                return sortRideId(a,b,sortOrder);
            })
        }
        else if (sortF == "ride") {
            info.sort((a,b) => {
                return sortRide(a,b,sortOrder);
            })
        }
        else if (sortF == "description") {
            info.sort((a,b) => {
                return sortDescription(a,b,sortOrder);
            })
        }
        else if (sortF == "date") {
            info.sort((a,b) => {
                return sortDate(a,b,sortOrder);
            })
        }
        else if (sortF == "maintainer id") {
            info.sort((a,b) => {
                return sortMaintainerId(a,b,sortOrder);
            })
        }
        else if (sortF == "resolved") {
            info.sort((a,b) => {
                return sortResolved(a,b,sortOrder);
            })
        }
        else if (sortF == "breakdown num") {
            info.sort((a,b) => {
                return sortBreakdownNum(a,b,sortOrder);
            })
        }
        return info;
    }

    const renderTable = () => {
        return data.map(elem => {
            return (
                <>
                    <tr key={elem.breakdown_id} clasName="result-row">
                        <td>{elem.breakdown_id}</td>
                        <td>{elem.ride_id}</td>
                        <td>{elem.name}</td>
                        <td>{elem.breakdown_nums}</td>
                        <td>{elem.maintainer_id}</td>
                        <td>{new Date(elem.breakdown_date).toLocaleString()}</td>
                        <td>{elem.breakdown_desc}</td>
                        <td>{elem.resolved ? "Yes" : "No"}</td>
                        <td>{!elem.resolved && <button type="button" value={elem.breakdown_id} onClick={resolveBreakdown}>Resolve as Fixed</button>}</td>
                    </tr>
                </>
            );}
        )
    }

    const resolveBreakdown = (e) => {
        console.log("Resolving breakdown report "+e.target.value);
        const newRecord = {
            breakdown_id: e.target.value,
            resolved: 1
        }
        console.log(newRecord);
        createAPIEndpoint(ENDPOINTS.breakdownUpdate)
        .post(newRecord)
        .then(() => {
            alert("Successfully resolved breakdown!");
            setDoSearch(!doSearch);
        })
        .catch(errors => {
            console.log(errors);
            alert("Failed to resolve breakdown.")
        })
    }

    const setSort = (field) => {
        setSortF(field);
        setDoSearch(!doSearch);
    }

    return (
        <div className='searchpage'>
            <div className="search-header">
                <h1>Ride Breakdowns</h1>
                <p className="search-info">On this page you can view current ride breakdown reports, file new reports, and resolve current reports.</p>
                <p><u>Key:</u> <b>Ride Name</b> = name of the ride that broke down, <b>Breakdown Description</b> = details on the issue, <b>Breakdown Date</b> = time when breakdown was reported,<br/>
                <b>Maintainer ID</b> = ID of employee responsible for monitoring repair, <b>Resolved</b> = whether this breakdown has been repaired or not</p>
            </div>
            <div className="optionbox">
                {<BreakdownSearchBox returnFilters={getFromSearch}/>}
                {<BreakdownEntry/>}
            </div>
            <br/><br/>
            <br/><br/>
            <div>
                <p>If a breakdown has been fixed but is marked as not resolved, click "Resolve" on that row to mark it as fixed.<br/>
                Sort by a field by clicking on the column header.</p>
                <label>Sort:</label>
                <select className="tableOption" type="number" name="sortOrder" onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="0">Ascending</option>
                    <option value="1">Descending</option>
                </select>
                <table className="result-table">
                    <thead>
                        <tr>
                            <th><button type="button" className="sortB" onClick={() => setSort("breakdown id")}>Breakdown ID</button></th>
                            <th><button type="button" className="sortB" onClick={() => setSort("ride id")}>Ride ID</button></th>
                            <th><button type="button" className="sortB" onClick={() => setSort("ride")}>Ride Name</button></th>
                            <th><button type="button" className="sortB" onClick={() => setSort("breakdown num")}>Times Ride Broke Down</button></th>
                            <th><button type="button" className="sortB" onClick={() => setSort("maintainer id")}>Maintainer ID</button></th>
                            <th><button type="button" className="sortB" onClick={() => setSort("date")}>Breakdown Date</button></th>
                            <th><button type="button" className="sortB" onClick={() => setSort("description")}>Breakdown Description</button></th>
                            <th><button type="button" className="sortB" onClick={() => setSort("resolved")}>Resolved</button></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>{renderTable()}</tbody>
                </table>
            </div>
        </div>
    )
}

function sortBreakdownId(a,b,order) {
    let a_v = parseInt(a.breakdown_id);
    let b_v = parseInt(b.breakdown_id);
    if (order == 1) {
        return (b_v < a_v) ? -1 : (b_v > a_v) ? 1 : 0;
    }
    return (a_v < b_v) ? -1 : (a_v > b_v) ? 1 : 0;
}

function sortRideId(a,b,order) {
    let a_v = parseInt(a.ride_id);
    let b_v = parseInt(b.ride_id);
    if (order == 1) {
        return (b_v < a_v) ? -1 : (b_v > a_v) ? 1 : 0;
    }
    return (a_v < b_v) ? -1 : (a_v > b_v) ? 1 : 0;
}

function sortMaintainerId(a,b,order) {
    let a_v = parseInt(a.maintainer_id);
    let b_v = parseInt(b.maintainer_id);
    if (order == 1) {
        return (b_v < a_v) ? -1 : (b_v > a_v) ? 1 : 0;
    }
    return (a_v < b_v) ? -1 : (a_v > b_v) ? 1 : 0;
}

function sortBreakdownNum(a,b,order) {
    let a_v = parseInt(a.breakdown_nums);
    let b_v = parseInt(b.breakdown_nums);
    if (order == 1) {
        return (b_v < a_v) ? -1 : (b_v > a_v) ? 1 : 0;
    }
    return (a_v < b_v) ? -1 : (a_v > b_v) ? 1 : 0;
}

function sortResolved(a,b,order) {
    let a_v = a.resolved;
    let b_v = b.resolved;
    if (order == 1) {
        return (b_v < a_v) ? -1 : (b_v > a_v) ? 1 : 0;
    }
    return (a_v < b_v) ? -1 : (a_v > b_v) ? 1 : 0;
}

function sortRide(a,b,order) {
    let a_v = a.ride_name;
    let b_v = b.ride_name;
    if (order == 1) {
        return (b_v < a_v) ? -1 : (b_v > a_v) ? 1 : 0;
    }
    return (a_v < b_v) ? -1 : (a_v > b_v) ? 1 : 0;
}

function sortDescription(a,b,order) {
    let a_v = a.breakdown_desc;
    let b_v = b.breakdown_desc;
    if (order == 1) {
        return (b_v < a_v) ? -1 : (b_v > a_v) ? 1 : 0;
    }
    return (a_v < b_v) ? -1 : (a_v > b_v) ? 1 : 0;
}

function sortDate(a,b,order) {
    let a_v = new Date(a.breakdown_date);
    let b_v = new Date(b.breakdown_date);
    if (order == 1) {
        return b_v - a_v;
    }
    return a_v - b_v;
}

export default Breakdown;
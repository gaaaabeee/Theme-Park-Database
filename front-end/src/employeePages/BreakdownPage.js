import React, {useState,useEffect} from 'react';
import '../css/reporttable.css';
import BreakdownSearchBox from '../components/search/breakdownSearchBox.js';
import BreakdownEntry from '../components/search/breakdownEntry.js';
import { createAPIEndpoint, ENDPOINTS } from '../api/index.js';

function Breakdown() {
    const [data, setData]= useState([]);
    const [filters, setFilters] = useState();
    const [doSearch,setDoSearch] = useState(false);

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
            setData(filterData(response.data));
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
    },[filters,doSearch]);

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

    const resolveBreakdown = () => {}

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
                <p>If a breakdown has been fixed but is marked as not resolved, click "Resolve" on that row to mark it as fixed.</p>
                <table className="result-table">
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
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>{renderTable()}</tbody>
                </table>
            </div>
        </div>
    )
}

export default Breakdown;
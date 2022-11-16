import React, {useState} from 'react';
import '../css/reporttable.css';
import { createAPIEndpoint, ENDPOINTS } from '../api/index.js';

function BreakdownSearch() {
    const [data, setData]= useState([]);

    const blankFilters = {
        breakdown_id: "",
        ride_id: "",
        ride_name: "",
        maintainer_id: "",
        breakdown_date: "",
        breakdown_desc: "",
        resolved: ""
    };

    const [filters, setFilters] = useState(blankFilters);
    const updateFilters = (obj) => {setFilters({...filters,...obj});}

    const findbreakdown = () => {
        createAPIEndpoint(ENDPOINTS.breakdowns)
        .fetch()
        .then(response => {
            setData(response.data)})
        .catch(error => console.log(error))
    }

    const renderTable = () => {
        let info = data;
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
        return info.map(elem => {
            return (
                <tr key={elem.breakdown_id}>
                    <td>{elem.breakdown_id}</td>
                    <td>{elem.ride_id}</td>
                    <td>{elem.name}</td>
                    <td>{elem.breakdown_nums}</td>
                    <td>{elem.maintainer_id}</td>
                    <td>{elem.breakdown_date}</td>
                    <td>{elem.breakdown_desc}</td>
                    <td>{elem.resolved}</td>
                </tr>
            );}
        )
    }

    return (
        <div className='searchbox'>
            <h2>Ride Breakdown Search</h2>
            <div>
                <p>*You can search by exact matches or by ranges. Only search by one or the other.</p>
                <form name="ridesearch" id="ridesearch">
                    <table className="filter-table">
                        <tr>
                            <th>Breakdown ID:</th>
                            <th>Ride ID:</th>
                            <th>Ride Name:</th>
                        </tr>
                        <tr>
                            <td><input type="text" name="breakdown_id" value={filters.breakdown_id} onChange={(e) => updateFilters({breakdown_id:e.target.value})}/></td>
                            <td><input type="text" name="ride_id" value={filters.ride_id} onChange={(e) => updateFilters({ride_id:e.target.value})}/></td>
                            <td><input type="text" name="ride_name" value={filters.ride_name} onChange={(e) => updateFilters({ride_name:e.target.value})}/></td>
                        </tr>
                        <tr>
                            <th>Breakdown Date</th>
                            <th>Breakdown Description</th>
                            <th>Maintainer ID:</th>
                            <th>Resolved</th>
                        </tr>
                        <tr>
                            <td><input type="text" name="breakdown_date" value={filters.breakdown_date} onChange={(e) => updateFilters({breakdown_date:e.target.value})}/></td>
                            <td><input type="text" name="breakdown_desc" value={filters.breakdown_desc} onChange={(e) => updateFilters({breakdown_desc:e.target.value})}/></td>
                            <td><input type="text" name="maintainer_id" value={filters.maintainer_id} onChange={(e) => updateFilters({maintainer_id:e.target.value})}/></td>
                            <td>
                                <select type="text" name="resolved" value={filters.resolved} onChange={(e) => updateFilters({resolved:e.target.value})}>
                                    <option defaultValue=""></option>
                                    <option value="1">Yes</option>
                                    <option value="0">No</option>
                                </select>
                            </td>
                        </tr>
                    </table>
                </form>
            </div><br/>
            <button onClick={findbreakdown} className="submit-button" type="button">Search Breakdowns</button>
            <br /><br />
            <br /><br />
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
                    </tr>
                </thead>
                <tbody>{renderTable()}</tbody>
            </table>
        </div>
    )
}

export default BreakdownSearch;
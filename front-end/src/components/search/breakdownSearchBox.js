import React, {useState} from 'react';
import {BsSearch} from 'react-icons/bs';

const blankFilters = {
    breakdown_id: "",
    ride_id: "",
    ride_name: "",
    maintainer_id: "",
    breakdown_date: "",
    breakdown_desc: "",
    resolved: ""
};

function BreakdownSearchBox(props) {
    const [filters,setFilters] = useState(blankFilters);
    const updateFilters = (obj) => {setFilters({...filters,...obj});};

    const returnFilter = () => {
        props.returnFilters(filters);
    }

    const resetFilters = () => {
        setFilters(blankFilters);
    }

    return (
        <div className='search search-area'>
            <h2>View Existing Breakdown Reports</h2>
            <form name="breakdownsearch" id="breakdownsearch" className="searchbox">
                <p>*Leave all filters blank to return all breakdowns.</p>
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
                    <br />
                </table>
                <button type="button" className="reset-search" onClick={resetFilters}>Reset</button>
            </form>
            <br/>
            <button onClick={returnFilter} className="submit-button" type="button">Search Breakdowns <BsSearch/></button>
        </div>
    );
}

export default BreakdownSearchBox;
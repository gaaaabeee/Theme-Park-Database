import React, {useState} from 'react';

const blankFilters = {
    id: "",
    name: "",
    type: "",
    description: "",
    location: "",
    min_height: "",
    start_time: "",
    end_time: "",
    breakdown_nums: ""
};

function AttractionSearchBox(props) {
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
            <h2>Attraction Search</h2>
            <form name="ridesearch" id="ridesearch" className="searchbox">
                <p>*Leave all filters blank to return all attractions.</p>
                <table className="filter-table">
                    <tr>
                        <th>Attraction ID:</th>
                        <th>Name:</th>
                        <th>Description:</th>
                    </tr>
                    <tr>
                        <td><input type="text" name="customer_id" value={filters.id} onChange={(e) => updateFilters({id:e.target.value})}/></td>
                        <td><input type="text" name="fname" value={filters.name} onChange={(e) => updateFilters({name:e.target.value})}/></td>
                        <td><input type="text" name="lname" value={filters.description} onChange={(e) => updateFilters({description:e.target.value})}/></td>
                    </tr>
                    <tr>
                        <th>Type:</th>
                        <th>Location:</th>
                        <th>Minimum Height:</th>
                    </tr>
                    <tr>
                        <td>
                            <select type="text" name="type" value={filters.type} onChange={(e) => updateFilters({type:e.target.value})}>
                            <option defaultValue=""></option>
                            <option value="ride">ride</option>
                            <option value="shop">shop</option>
                            <option value="show">show</option>
                            </select>
                        </td>
                        <td><input type="text" name="location" value={filters.location} onChange={(e) => updateFilters({location:e.target.value})}/></td>
                        <td><input type="text" name="min_height" value={filters.min_height} onChange={(e) => updateFilters({min_height:e.target.value})}/></td>
                    </tr>
                    <tr>
                        <th>Earliest Start Time:</th>
                        <th>Latest End Time:</th>
                        <th>Breakdowns:</th>
                    </tr>
                    <tr>
                        <td><input type="time" name="start_time" value={filters.start_time} onChange={(e) => updateFilters({start_time:e.target.value})}/></td>
                        <td><input type="time" name="end_time" value={filters.end_time} onChange={(e) => updateFilters({end_time:e.target.value})}/></td>
                        <td><input type="text" name="breakdown_nums" value={filters.breakdown_nums} onChange={(e) => updateFilters({breakdown_nums:e.target.value})}/></td>
                    </tr>
                    <br/>
                </table>
                <button type="button" className="reset-search" onClick={resetFilters}>Reset</button>
            </form>
            <br/>
            <button onClick={returnFilter} className="submit-button" type="button">Search Attractions</button>
        </div>
    );
}

export default AttractionSearchBox;
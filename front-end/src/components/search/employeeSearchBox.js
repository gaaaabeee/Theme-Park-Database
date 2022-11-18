import React, {useState} from 'react';

const blankFilters = {
    id: "",
    fname: "",
    lname: "",
    byear: "",
    minbyear: "",
    maxbyear: "",
    bmonth: "",
    minbmonth: "",
    maxbmonth: "",
    bday: "",
    minbday: "",
    maxbday: "",
    superid: "",
    title: "",
    username: ""
};

function EmployeeSearchBox(props) {
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
            <h2>Employee Search</h2>
            <form name="employeesearch" id="employeesearch" className="searchbox">
                <p>*You can search by exact matches or by ranges. Only search by one or the other.<br/>
                *Leave all filters blank to return all employees.</p>
                <table className="filter-table">
                    <tr>
                        <th>Employee ID:</th>
                        <th>Supervisor ID:</th>
                        <th>Job Title:</th>
                    </tr>
                    <tr>
                        <td><input type="text" name="customer_id" value={filters.id} onChange={(e) => updateFilters({id:e.target.value})}/></td>
                        <td><input type="text" name="fname" value={filters.superid} onChange={(e) => updateFilters({superid:e.target.value})}/></td>
                        <td><input type="text" name="title" value={filters.title} onChange={(e) => updateFilters({title:e.target.value})}/></td>
                    </tr>
                    <tr>
                        <th>First Name:</th>
                        <th>Last Name:</th>
                        <th>Username:</th>
                    </tr>
                    <tr>
                        <td><input type="text" name="fname" value={filters.fname} onChange={(e) => updateFilters({fname:e.target.value})}/></td>
                        <td><input type="text" name="lname" value={filters.lname} onChange={(e) => updateFilters({lname:e.target.value})}/></td>
                        <td><input type="text" name="username" value={filters.username} onChange={(e) => updateFilters({username:e.target.value})}/></td>
                    </tr>
                    <tr>
                        <th>Birth Year:</th>
                        <th>Least Birth Year:</th>
                        <th>Greatest Birth Year:</th>
                    </tr>
                    <tr>
                        <td><input type="text" name="byear" value={filters.byear} onChange={(e) => updateFilters({byear:e.target.value})}/></td>
                        <td><input type="text" name="minbyear" value={filters.minbyear} onChange={(e) => updateFilters({minbyear:e.target.value,byear:""})}/></td>
                        <td><input type="text" name="maxbyear" value={filters.maxbyear} onChange={(e) => updateFilters({maxbyear:e.target.value,byear:""})}/></td>
                    </tr>
                    <tr>
                        <th>Birth Month:</th>
                        <th>Least Birth Month:</th>
                        <th>Greatest Birth Month:</th>
                    </tr>
                    <tr>
                        <td><input type="text" name="bmonth" value={filters.bmonth} onChange={(e) => updateFilters({bmonth:e.target.value})}/></td>
                        <td><input type="text" name="minbmonth" value={filters.minbmonth} onChange={(e) => updateFilters({minbmonth:e.target.value,bmonth:""})}/></td>
                        <td><input type="text" name="maxbmonth" value={filters.maxbmonth} onChange={(e) => updateFilters({maxbmonth:e.target.value,bmonth:""})}/></td>
                    </tr>
                    <tr>
                        <th>Birth Day:</th>
                        <th>Least Birth Day:</th>
                        <th>Greatest Birth Day:</th>
                    </tr>
                    <tr>
                        <td><input type="text" name="bday" value={filters.bday} onChange={(e) => updateFilters({bday:e.target.value})}/></td>
                        <td><input type="text" name="minbday" value={filters.minbday} onChange={(e) => updateFilters({minbday:e.target.value,bday:""})}/></td>
                        <td><input type="text" name="maxbday" value={filters.maxbday} onChange={(e) => updateFilters({maxbday:e.target.value,bday:""})}/></td>
                    </tr>
                    <br />
                </table>
                <button type="button" className="reset-search" onClick={resetFilters}>Reset</button>
            </form>
            <br/>
            <button onClick={returnFilter} className="submit-button" type="button">Search Employees</button>
        </div>
    );
}

export default EmployeeSearchBox;
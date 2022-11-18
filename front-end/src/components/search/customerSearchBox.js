import React, {useState} from 'react';

const blankFilters = {
    id: "",
    fname: "",
    lname: "",
    email: "",
    height: "",
    minheight: "",
    maxheight: "",
    byear: "",
    minbyear: "",
    maxbyear: "",
    bmonth: "",
    minbmonth: "",
    maxbmonth: "",
    bday: "",
    minbday: "",
    maxbday: "",
    tickets: "",
    mintickets: "",
    maxtickets: "",
};

function CustomerSearchBox(props) {
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
            <h2>Customer Search</h2>
            <form name="customersearch" id="customersearch" className="searchbox">
            <p>*You can search by exact matches or by ranges. Only search by one or the other.<br/>*Leave all filters blank to return all customers.</p>
                    <table className="filter-table">
                        <tr>
                            <th>Customer ID:</th>
                            <th>First Name:</th>
                            <th>Last Name:</th>
                            <th>Email:</th>
                        </tr>
                        <tr>
                            <td><input type="text" name="customer_id" value={filters.id} onChange={(e) => updateFilters({id:e.target.value})}/></td>
                            <td><input type="text" name="fname" value={filters.fname} onChange={(e) => updateFilters({fname:e.target.value})}/></td>
                            <td><input type="text" name="lname" value={filters.lname} onChange={(e) => updateFilters({lname:e.target.value})}/></td>
                            <td><input type="text" name="email" value={filters.email} onChange={(e) => updateFilters({email:e.target.value})}/></td>
                        </tr>
                        <tr>
                            <th>Height:</th>
                            <th>Least Height:</th>
                            <th>Greatest Height:</th>
                        </tr>
                        <tr>
                            <td><input type="text" name="height" value={filters.height} onChange={(e) => updateFilters({height:e.target.value})}/></td>
                            <td><input type="text" name="minheight" value={filters.minheight} onChange={(e) => updateFilters({minheight:e.target.value,height:""})} disabled/></td>
                            <td><input type="text" name="maxheight" value={filters.maxheight} onChange={(e) => updateFilters({maxheight:e.target.value,height:""})} disabled/></td>
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
                        <tr>
                            <th>Tickets Bought:</th>
                            <th>Least Tickets:</th>
                            <th>Greatest Tickets:</th>
                        </tr>
                        <tr>
                            <td><input type="text" name="tickets" value={filters.tickets} onChange={(e) => updateFilters({tickets:e.target.value})}/></td>
                            <td><input type="text" name="mintickets" value={filters.mintickets} onChange={(e) => updateFilters({mintickets:e.target.value,tickets:""})}/></td>
                            <td><input type="text" name="maxtickets" value={filters.maxtickets} onChange={(e) => updateFilters({maxtickets:e.target.value,tickets:""})}/></td>
                        </tr>
                        <br />
                    </table>
                    <button type="button" className="reset-search" onClick={resetFilters}>Reset</button>
                </form>
            <br/>
            <button onClick={returnFilter} className="submit-button" type="button">Search Customers</button>
        </div>
    );
}

export default CustomerSearchBox;
import React, {useState} from 'react';
import '../css/reporttable.css';
import { createAPIEndpoint, ENDPOINTS } from '../api/index.js';

function CustomerSearch(){
    const [data, setData]= useState([]);

    const blankFilters = {
        id: "",
        fname: "",
        lname: "",
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

    const [filters, setFilters] = useState(blankFilters);
    const updateFilters = (obj) => {setFilters({...filters,...obj});}

    const findcustomer = () => {
        createAPIEndpoint(ENDPOINTS.customer)
        .fetch()
        .then(response => {
            setData(response.data)})
        .catch(error => console.log(error))
    }

    const renderTable = () => {
        let info = data;
        if (filters.id != "") { 
            info = info.filter((item) => {
                return (item.customer_id == filters.id);
            });
        }
        if (filters.fname != "") { 
            info = info.filter((item) => {
                return (item.fname.toLowerCase().startsWith(filters.fname.toLowerCase()));
            });
        }
        if (filters.lname != "") { 
            info = info.filter((item) => {
                return (item.lname.toLowerCase().startsWith(filters.lname.toLowerCase()));
            });
        }
        if (filters.height != "") {
            info = info.filter((item) => {
                return (item.height.startsWith(filters.height));
            });
        }
        console.log(info);
        return info.map(elem => {
            return (
                <tr>
                    <td>{elem.customer_id}</td>
                    <td>{elem.fname}</td>
                    <td>{elem.lname}</td>
                    <td>{elem.email}</td>
                    <td>{elem.password}</td>
                    <td>{elem.height}</td>
                    <td>{elem.dob}</td>
                    <td>{elem.tickets_bought}</td>
                </tr>
            );}
        )
    }

    return (
        <div className='searchbox'>
            <h2>Customer Search</h2>
            <div>
                <p>*You can search by exact matches or by ranges. Leave one blank if using the other.</p>
                <form name="customersearch" id="customersearch" onSubmit={findcustomer}>
                    <table className="filter-table">
                        <tr>
                            <th>ID:</th>
                            <th>First Name:</th>
                            <th>Last Name:</th>
                            
                            
                            
                        </tr>
                        <tr>
                            <td><input type="text" name="customer_id" value={filters.id} onChange={(e) => updateFilters({id:e.target.value})}/></td>
                            <td><input type="text" name="fname" value={filters.fname} onChange={(e) => updateFilters({fname:e.target.value})}/></td>
                            <td><input type="text" name="lname" value={filters.lname} onChange={(e) => updateFilters({lname:e.target.value})}/></td>
                        </tr>
                        <tr>
                            <th>Height:</th>
                            <th>Least Height:</th>
                            <th>Greatest Height:</th>
                        </tr>
                        <tr>
                            <td><input type="text" name="height" value={filters.height} onChange={(e) => updateFilters({height:e.target.value})}/></td>
                        </tr>
                        <tr>
                            <th>Birth Year:</th>
                            <th>Least Birth Year:</th>
                            <th>Greatest Birth Year:</th>
                        </tr>
                        <tr>
                            <td><input type="text" name="byear" value={filters.byear} onChange={(e) => updateFilters({byear:e.target.value})}/></td>
                        </tr>
                        <tr>
                            <th>Birth Month:</th>
                            <th>Least Birth Month:</th>
                            <th>Greatest Birth Month:</th>
                        </tr>
                        <tr>
                        <td><input type="text" name="bmonth" value={filters.bmonth} onChange={(e) => updateFilters({bmonth:e.target.value})}/></td>
                        </tr>
                        <tr>
                            <th>Birth Day:</th>
                            <th>Least Birth Day:</th>
                            <th>Greatest Birth Day:</th>
                        </tr>
                        <tr>
                            <td><input type="text" name="bday" value={filters.bday} onChange={(e) => updateFilters({bday:e.target.value})}/></td>
                        </tr>
                        <tr>
                            <th>Tickets Bought:</th>
                            <th>Least Tickets:</th>
                            <th>Greatest Tickets:</th>
                        </tr>
                        <tr>
                        <td><input type="text" name="tickets" value={filters.tickets} onChange={(e) => updateFilters({tickets:e.target.value})}/></td>
                        </tr>
                    </table>
                </form>
            </div> 
            <button onClick={findcustomer} className="submit-button" type="button">Search Customers</button>
            <br /><br />
            <br /><br />
            <table className="result-table">
                <thead>
                    <tr>
                        <th>Customer ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Height</th>
                        <th>DOB</th>
                        <th>Tickets</th>
                    </tr>
                </thead>
                <tbody>{renderTable()}</tbody>
            </table>
        </div>

    )

}

export default CustomerSearch;
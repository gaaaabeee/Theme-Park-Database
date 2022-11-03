import React, {useState} from 'react';
import '../css/reporttable.css';
import { createAPIEndpoint, ENDPOINTS } from '../api/index.js';

function CustomerSearch(){
    const [data, setData]= useState([]);

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
        if (filters.email != "") {
            info = info.filter((item) => {
                return (item.email.startsWith(filters.email));
            })
        }
        if (filters.height != "") {
            info = info.filter((item) => {
                return (item.height.toString().startsWith(filters.height));
            });
        }
        if (filters.byear != "") {
            info = info.filter((item) => {
                const year = new Date(item.dob).getFullYear().toString();
                return (year == filters.byear);
            })
        }
        if (filters.minbyear != "" || filters.maxbyear != "") {
            let minyear, maxyear;
            if (filters.minbyear == "") {minyear = 0;}
            else {minyear = parseInt(filters.minbyear);}
            if (filters.maxbyear == "") {maxyear = 5000;}
            else {maxyear = parseInt(filters.maxbyear);}
            info = info.filter((item) => {
                const year = new Date(item.dob).getFullYear();
                return (year >= minyear && year <= maxyear);
            })
        }
        if (filters.bmonth != "") {
            info = info.filter((item) => {
                const month = (new Date(item.dob).getMonth()+1).toString();
                return (month == filters.bmonth);
            })
        }
        if (filters.minbmonth != "" || filters.maxbmonth != "") {
            let minmonth, maxmonth;
            if (filters.minbmonth == "") {minmonth = 0;}
            else {minmonth = parseInt(filters.minbmonth);}
            if (filters.maxbmonth == "") {maxmonth = 13;}
            else {maxmonth = parseInt(filters.maxbmonth);}
            info = info.filter((item) => {
                const month = new Date(item.dob).getMonth()+1;
                return (month >= minmonth && month <= maxmonth);
            })
        }
        if (filters.bday != "") {
            info = info.filter((item) => {
                const day = new Date(item.dob).getDate().toString();
                return (day == filters.bday);
            })
        }
        if (filters.minbday != "" || filters.maxbday != "") {
            let minday, maxday;
            if (filters.minbday == "") {minday = 0;}
            else {minday = parseInt(filters.minbday);}
            if (filters.maxbday == "") {maxday = 32;}
            else {maxday = parseInt(filters.maxbday);}
            info = info.filter((item) => {
                const day = new Date(item.dob).getDate();
                return (day >= minday && day <= maxday);
            })
        }
        if (filters.tickets != "") {
            info = info.filter((item) => {
                return item.tickets_bought == parseInt(filters.tickets);
            })
        }
        if (filters.mintickets != "" || filters.maxtickets != "") {
            let mintickets, maxtickets;
            if (filters.mintickets == "") {mintickets = 0;}
            else {mintickets = parseInt(filters.mintickets);}
            if (filters.maxtickets == "") {maxtickets = 99999;}
            else {maxtickets = parseInt(filters.maxtickets);}
            info = info.filter((item) => {
                return (item.tickets_bought >= mintickets && item.tickets_bought <= maxtickets);
            })
        }
        return info.map(elem => {
            return (
                <tr>
                    <td>{elem.customer_id}</td>
                    <td>{elem.fname}</td>
                    <td>{elem.lname}</td>
                    <td>{elem.email}</td>
                    <td>{elem.password}</td>
                    <td>{elem.height}</td>
                    <td>{new Date(elem.dob).toLocaleDateString()}</td>
                    <td>{elem.tickets_bought}</td>
                </tr>
            );}
        )
    }

    return (
        <div className='searchbox'>
            <h2>Customer Search</h2>
            <div>
                <p>*You can search by exact matches or by ranges. Only search by one or the other.</p>
                <form name="customersearch" id="customersearch">
                    <table className="filter-table">
                        <tr>
                            <th>ID:</th>
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
                    </table>
                </form>
            </div><br/>
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

function compareHeight(height1,height2) {
    let inches1,inches2,theight1,theight2;
    let tempin1 = (height1%1).toString().slice(2);
    if (tempin1.charAt(1) == "0") {
        tempin1 = tempin1.slice(0,1);
    } else {
        tempin1 = tempin1.slice(0,2);
    }
    inches1 = parseInt(tempin1);
    theight1 = (parseInt(height1)*30.48)+(inches1*2.54)
    let tempin2 = (height2%1).toString().slice(2);
    if (tempin2.charAt(1) == "0") {
        tempin2 = tempin2.slice(0,1);
    } else {
        tempin2 = tempin2.slice(0,2);
    }
    inches2 = parseInt(tempin2);
    theight2 = (parseInt(height2)*30.48)+(inches2*2.54)
    console.log(theight1,theight2);
    if (theight1 > theight2) {return 1;}
    else if (theight1 == theight2) {return 0;}
    return 1;
}

export default CustomerSearch;
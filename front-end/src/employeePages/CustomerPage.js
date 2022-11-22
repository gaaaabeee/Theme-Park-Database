import React, {useEffect, useState} from 'react';
import '../css/reporttable.css';
import CustomerSearchBox from '../components/search/customerSearchBox';
import { createAPIEndpoint, ENDPOINTS } from '../api/index.js';

//employee page for viewing all customers in database

function Customer(){
    const [data, setData]= useState([]);
    const [filters, setFilters] = useState();
    const [passwords,setPasswords] = useState(false);
    const [doSearch,setDoSearch] = useState(false);
    const [sortF,setSortF] = useState("customer id");
    const [sortOrder,setSortOrder] = useState(0);

    //gets search filters from search box
    const getFromSearch = (filter) => {
        console.log(filter);
        setFilters(filter);
        setDoSearch(!doSearch);
    }

    //gets customer list from server
    const searchCustomers = () => {
        createAPIEndpoint(ENDPOINTS.customer)
        .fetch()
        .then(response => {
            console.log(response.data);
            setData(sortData(filterData(response.data)));
        })
        .catch(error => {
            console.log(error);
            alert("Failed to fetch customer list from server.");
        })
    }

    //get customer list whenever search options change
    useEffect(() => {
        if (filters) {
            searchCustomers();
            console.log(data);
        }
    },[filters,doSearch,sortOrder]);

    //filter customer list to match search filters
    const filterData = (info) => {
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
        if (filters.minheight != "" || filters.maxheight != "") {
            let minheight, maxheight;
            if (filters.minheight == "") {minheight = [0,0];}
            else {minheight = heightToNum(filters.minheight);}
            if (filters.maxheight == "") {maxheight = [10,10];}
            else {maxheight = heightToNum(filters.maxheight);}
            info = info.filter((item) => {
                let h = heightToNum(item.height);
                return (((h[0] == minheight[0]) ? (h[1] >= minheight[1]) : (h[0] >= minheight[0])) && ((h[0] == maxheight[0]) ? (h[1] <= maxheight[1]) : (h[0] <= maxheight[0])));
            })
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
        return info;
    }

    //sort customer list by specified column
    const sortData = (info) => {
        if (sortF == "customer id") {
            info.sort((a,b) => {
                return sortCustomerId(a,b,sortOrder);
            })
        }
        else if (sortF == "first name") {
            info.sort((a,b) => {
                return sortFirstName(a,b,sortOrder);
            })
        }
        else if (sortF == "last name") {
            info.sort((a,b) => {
                return sortLastName(a,b,sortOrder);
            })
        }
        else if (sortF == "dob") {
            info.sort((a,b) => {
                return sortDOB(a,b,sortOrder);
            })
        }
        else if (sortF == "height") {
            info.sort((a,b) => {
                return sortHeight(a,b,sortOrder);
            })
        }
        else if (sortF == "tickets") {
            info.sort((a,b) => {
                return sortTickets(a,b,sortOrder);
            })
        }
        else if (sortF == "email") {
            info.sort((a,b) => {
                return sortEmail(a,b,sortOrder);
            })
        }
        else if (sortF == "password") {
            info.sort((a,b) => {
                return sortPassword(a,b,sortOrder);
            })
        }
        return info;
    }

    //return table of customers
    const renderTable = () => {
        return data.map(elem => {
            return (
                <tr key={elem.customer_id} className="result-row">
                    <td>{elem.customer_id}</td>
                    <td>{elem.fname}</td>
                    <td>{elem.lname}</td>
                    <td>{elem.email}</td>
                    <td>{elem.height}</td>
                    <td>{new Date(elem.dob).toLocaleDateString()}</td>
                    <td>{elem.tickets_bought}</td>
                    {passwords && <td>{elem.password}</td>}
                </tr>
            );}
        )
    }

    //sets sort by column
    const setSort = (field) => {
        setSortF(field);
        setDoSearch(!doSearch);
    }

    //show customer passwords
    const showPasswords = () => {
        if (!passwords) {
            setPasswords(true);
        }
        else {
            setPasswords(false);
        }
    }

    return (
        <div className='searchpage'>
            <div className="search-header">
                <h1>Customers</h1>
                <p className="search-info">On this page you can view all customer accounts that have been registered on the website.<br/>
                Fields marked as Least and Greatest are search ranges. Using these will return all entries within that range (inclusive).</p>
                <p><u>Key:</u> <b>First Name</b> and <b>Last Name</b> = name of the customer, <b>Email</b> = email customer used to sign up, <b>Height</b> = the customer's height,<br/>
                <b>Tickets Bought</b> = how many tickets this customer ordered online</p>
            </div>
            <div className="optionbox">
                {<CustomerSearchBox returnFilters={getFromSearch}/>}
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
                <label> Show Passwords: </label>
                <input className="tableOption" type="checkbox" name="showpasswords" onChange={showPasswords}/>
                <table className="result-table">
                    <thead>
                        <tr>
                            <th><button type="button" className="sortB" onClick={() => setSort("customer id")}>Customer ID</button></th>
                            <th><button type="button" className="sortB" onClick={() => setSort("first name")}>First Name</button></th>
                            <th><button type="button" className="sortB" onClick={() => setSort("last name")}>Last Name</button></th>
                            <th><button type="button" className="sortB" onClick={() => setSort("email")}>Email</button></th>
                            <th><button type="button" className="sortB" onClick={() => setSort("height")}>Height</button></th>
                            <th><button type="button" className="sortB" onClick={() => setSort("dob")}>DOB</button></th>
                            <th><button type="button" className="sortB" onClick={() => setSort("tickets")}>Tickets</button></th>
                            {passwords && <th><button type="button" className="sortB" onClick={() => setSort("password")}>Password</button></th>}
                        </tr>
                    </thead>
                    <tbody>{renderTable()}</tbody>
                </table>
            </div>
        </div>
    )

}

//sort functions

function sortCustomerId(a,b,order) {
    let a_v = parseInt(a.customer_id);
    let b_v = parseInt(b.customer_id);
    if (order == 1) {
        return (b_v < a_v) ? -1 : (b_v > a_v) ? 1 : 0;
    }
    return (a_v < b_v) ? -1 : (a_v > b_v) ? 1 : 0;
}

function sortFirstName(a,b,order) {
    let a_v = a.fname;
    let b_v = b.fname;
    if (order == 1) {
        return (b_v < a_v) ? -1 : (b_v > a_v) ? 1 : 0;
    }
    return (a_v < b_v) ? -1 : (a_v > b_v) ? 1 : 0;
}

function sortLastName(a,b,order) {
    let a_v = a.lname;
    let b_v = b.lname;
    if (order == 1) {
        return (b_v < a_v) ? -1 : (b_v > a_v) ? 1 : 0;
    }
    return (a_v < b_v) ? -1 : (a_v > b_v) ? 1 : 0;
}

function sortDOB(a,b,order) {
    let a_v = new Date(a.dob);
    let b_v = new Date(b.dob);
    if (order == 1) {
        return b_v - a_v;
    }
    return a_v - b_v;
}

function sortHeight(a,b,order) {
    let a_v = heightToNum(a.height);
    let b_v = heightToNum(b.height);
    if (order == 1) {
        return ((b_v[0] == a_v[0]) ? ((b_v[1] < a_v[1]) ? -1 : ((b_v[1] > a_v[1]) ? 1 : 0)) : ((b_v[0] < a_v[0]) ? -1 : ((b_v[0] > a_v[0]) ? 1 : 0)));
    }
    return ((a_v[0] == b_v[0]) ? ((a_v[1] < b_v[1]) ? -1 : ((a_v[1] > b_v[1]) ? 1 : 0)) : ((a_v[0] < b_v[0]) ? -1 : ((a_v[0] > b_v[0]) ? 1 : 0)));
}

function sortEmail(a,b,order) {
    let a_v = a.email;
    let b_v = b.email;
    if (order == 1) {
        return (b_v < a_v) ? -1 : (b_v > a_v) ? 1 : 0;
    }
    return (a_v < b_v) ? -1 : (a_v > b_v) ? 1 : 0;
}

function sortPassword(a,b,order) {
    let a_v = a.password;
    let b_v = b.password;
    if (order == 1) {
        return (b_v < a_v) ? -1 : (b_v > a_v) ? 1 : 0;
    }
    return (a_v < b_v) ? -1 : (a_v > b_v) ? 1 : 0;
}

function sortTickets(a,b,order) {
    let a_v = parseInt(a.tickets_bought);
    let b_v = parseInt(b.tickets_bought);
    if (order == 1) {
        return (b_v < a_v) ? -1 : (b_v > a_v) ? 1 : 0;
    }
    return (a_v < b_v) ? -1 : (a_v > b_v) ? 1 : 0;
}

//convert height double to ft and inches
function heightToNum(height) {
    let ft, inc;
    let hs = height.toString();
    if (hs.includes(".")) {
        let h = height.toString().split(".");
        ft = parseInt(h[0]);
        inc = parseInt(h[1]);
    } else {
        ft = height;
        inc = 0;
    }
    return [ft,inc];
}

export default Customer;
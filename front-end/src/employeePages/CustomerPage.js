import React, {useEffect, useState} from 'react';
import '../css/reporttable.css';
import CustomerSearchBox from '../components/search/customerSearchBox';
import { createAPIEndpoint, ENDPOINTS } from '../api/index.js';

function Customer(){
    const [data, setData]= useState([]);
    const [filters, setFilters] = useState();
    const [passwords,setPasswords] = useState(false);
    const [doSearch,setDoSearch] = useState(false);

    const getFromSearch = (filter) => {
        console.log(filter);
        setFilters(filter);
        setDoSearch(!doSearch);
    }

    const searchCustomers = () => {
        createAPIEndpoint(ENDPOINTS.customer)
        .fetch()
        .then(response => {
            console.log(response.data);
            setData(filterData(response.data));
        })
        .catch(error => {
            console.log(error);
            alert("Failed to fetch customer list from server.");
        })
    }

    useEffect(() => {
        if (filters) {
            searchCustomers();
            console.log(data);
        }
    },[filters,doSearch]);

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
                <label>Show Passwords: </label>
                <input type="checkbox" name="showpasswords" onChange={showPasswords}/>
                <table className="result-table">
                    <thead>
                        <tr>
                            <th>Customer ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Height</th>
                            <th>DOB</th>
                            <th>Tickets</th>
                            {passwords && <th>Password</th>}
                        </tr>
                    </thead>
                    <tbody>{renderTable()}</tbody>
                </table>
            </div>
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

export default Customer;
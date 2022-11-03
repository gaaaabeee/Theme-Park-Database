import React, {useState} from 'react';
import '../css/reporttable.css';
import { createAPIEndpoint, ENDPOINTS } from '../api/index.js';

function EmployeeSearch(){
    const [data, setData] = useState([]);

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

    const [filters,setFilters] = useState(blankFilters);
    const updateFilters = (obj) => {setFilters({...filters,...obj});};

    function findemployee() {
        createAPIEndpoint(ENDPOINTS.employee)
        .fetch()
        .then(response => {
            setData(response.data)})
        .catch(error => console.log(error))}

        const renderTable = () => {
            let info = data;
            if (filters.id != "") { 
                info = info.filter((item) => {
                    return (item.employee_id == filters.id);
                });
            }
            if (filters.superid != "") { 
                info = info.filter((item) => {
                    return (item.supervisor_id == filters.superid);
                });
            }
            if (filters.title != "") { 
                info = info.filter((item) => {
                    return (item.job_title.toLowerCase().startsWith(filters.title.toLowerCase()));
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
            if (filters.username != "") {
                info = info.filter((item) => {
                    return (item.username.startsWith(filters.username));
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
            return info.map(elem => {
                return(
                    <tr>
                        <td>{elem.employee_id}</td>
                        <td>{elem.fname}</td>
                        <td>{elem.lname}</td>
                        <td>{new Date(elem.dob).toLocaleDateString()}</td>
                        <td>{elem.supervisor_id}</td>
                        <td>{elem.job_title}</td>
                        <td>{elem.username}</td>
                        <td>{elem.password}</td>
                    </tr>
            )
        })}

    return (
        <div className='searchbox'>
            <h2>Employee Search</h2>
            <div>
                <p>*You can search by exact matches or by ranges for birthdates. Only search by one or the other.</p>
                <form name="employeesearch" id="employeesearch">
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
                    </table>
                </form>
            </div><br/>
            <button onClick={findemployee} className="submit-button" type="button">Search Employees</button>
            <br /><br />
            <br /><br />
            <table className="result-table">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Date of Birth</th>
                        <th>Supervisor ID</th>
                        <th>Job Title</th>
                        <th>Username</th>
                        <th>Password</th>
                    </tr>
                </thead>
                <tbody>{renderTable()}</tbody>
            </table>
        </div>

    );
}

export default EmployeeSearch;
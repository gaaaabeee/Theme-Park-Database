import React, {useEffect, useState} from 'react';
import '../css/reporttable.css';
import EmployeeSearchBox from '../components/search/employeeSearchBox';
import EmployeeEntry from '../components/search/employeeEntry';
import EmployeeEdit from '../components/search/employeeEdit';
import EmployeeDelete from '../components/search/employeeDelete';
import { createAPIEndpoint, ENDPOINTS } from '../api';

//employee page for viewing all employees in database

function Employee() {
    const [data, setData] = useState([]);
    const [filters,setFilters] = useState();
    const [passwords,setPasswords] = useState(false);
    const [doSearch,setDoSearch] = useState(false);
    const [sortF,setSortF] = useState("employee id");
    const [sortOrder,setSortOrder] = useState(0);
    const [editId,setEditId] = useState(null);
    const [editId2,setEditId2] = useState(null);

    //get search filters from search box
    const getFromSearch = (filter) => {
        console.log(filter);
        setFilters(filter);
        setDoSearch(!doSearch);
        setEditId(null);
        setEditId2(null);
    }

    //get employee list from server
    const searchEmployees = () => {
        createAPIEndpoint(ENDPOINTS.employee)
        .fetch()
        .then(response => {
            console.log(response.data);
            setData(sortData(filterData(response.data)));
        })
        .catch(error => {
            console.log(error);
            alert("Failed to fetch employee list from server.");
        })
    }

    useEffect(() => {
        if (filters) {
            searchEmployees();
            console.log(data);
        }
    },[filters,doSearch,sortOrder]);


    const filterData = (info) => {
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
        return info;
    }

    const sortData = (info) => {
        if (sortF == "employee id") {
            info.sort((a,b) => {
                return sortEmployeeId(a,b,sortOrder);
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
        else if (sortF == "supervisor id") {
            info.sort((a,b) => {
                return sortSupervisorID(a,b,sortOrder);
            })
        }
        else if (sortF == "job title") {
            info.sort((a,b) => {
                return sortJobTitle(a,b,sortOrder);
            })
        }
        else if (sortF == "username") {
            info.sort((a,b) => {
                return sortUsername(a,b,sortOrder);
            })
        }
        else if (sortF == "password") {
            info.sort((a,b) => {
                return sortPassword(a,b,sortOrder);
            })
        }
        return info;
    }

    const editPopup = (e) => {
        setEditId(e.target.value);
    }
    const editPopup2 = (e) => {
        setEditId2(e.target.value);
    }

    const endEdit = () => {
        setEditId(null);
        setEditId2(null);
    }

    const editChange = () => {
        setEditId(null);
        setDoSearch(!doSearch);
    }

    const renderTable = () => {
        return data.map(elem => {
            return (
                <>
                    <tr key={elem.employee_id} className="result-row">
                        <td>{elem.employee_id}</td>
                        <td>{elem.fname}</td>
                        <td>{elem.lname}</td>
                        <td>{new Date(elem.dob).toLocaleDateString()}</td>
                        <td>{elem.supervisor_id}</td>
                        <td>{elem.job_title}</td>
                        <td>{elem.username}</td>
                        {passwords && <td>{elem.password}</td>}
                        <td><button type='button' value={elem.employee_id} onClick={editPopup}>Edit</button></td>
                            //karen edit
                        <td><button type='button' value={elem.employee_id} onClick={editPopup2}>Edit</button></td>
                    </tr>
                    {editId == elem.employee_id && 
                    <tr className="edit-row">
                        <EmployeeEdit values={elem} endEdit={endEdit} editChange={editChange}/>
                    </tr>}
                     //karen edit
                     
                    {editId2 == elem.employee_id && 
                    <tr className="edit-row">
                        <EmployeeDelete values={elem} endEdit={endEdit} editChange={editChange}/>
                    </tr>}
                </>
            );
        })
    }

    const setSort = (field) => {
        setSortF(field);
        setDoSearch(!doSearch);
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
                <h1>Employees</h1>
                <p className="search-info">On this page you can view all registered employees, add new employee accounts, and edit and delete existing employee accounts.<br/>
                Fields marked as Least and Greatest are search ranges. Using these will return all entries within that range (inclusive).</p>
                <p><u>Key:</u> <b>First Name</b> and <b>Last Name</b> = name of the employee, <b>Supervisor ID</b> = employee id of employee's supervisor,<br/>
                <b>Job Title</b> = the employee's job, <b>Username</b> = email of employee</p>
            </div>
            <div className='optionbox'>
                {<EmployeeSearchBox returnFilters={getFromSearch}/>}
                {<EmployeeEntry/>}
            </div>
            <br /><br />
            <br /><br />
            <div>
                <p>To edit or delete an employee account, click "Edit" on that row. Edit any fields then click "Save Changes". Click "Delete Attraction" to delete it permenantly.<br/>
                Sort by a field by clicking on the column header.</p>
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
                            <th><button type="button" className="sortB" onClick={() => setSort("employee id")}>Employee ID</button></th>
                            <th><button type="button" className="sortB" onClick={() => setSort("first name")}>First Name</button></th>
                            <th><button type="button" className="sortB" onClick={() => setSort("last name")}>Last Name</button></th>
                            <th><button type="button" className="sortB" onClick={() => setSort("dob")}>Date of Birth</button></th>
                            <th><button type="button" className="sortB" onClick={() => setSort("supervisor id")}>Supervisor ID</button></th>
                            <th><button type="button" className="sortB" onClick={() => setSort("job title")}>Job Title</button></th>
                            <th><button type="button" className="sortB" onClick={() => setSort("username")}>Username</button></th>
                            {passwords && <th><button type="button" className="sortB" onClick={() => setSort("password")}>Password</button></th>}
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>{renderTable()}</tbody>
                </table>
            </div>
        </div>
    );
}

function sortEmployeeId(a,b,order) {
    let a_v = parseInt(a.employee_id);
    let b_v = parseInt(b.employee_id);
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

function sortSupervisorID(a,b,order) {
    let a_v = parseInt(a.supervisor_id);
    let b_v = parseInt(b.supervisor_id);
    if (order == 1) {
        return (b_v < a_v) ? -1 : (b_v > a_v) ? 1 : 0;
    }
    return (a_v < b_v) ? -1 : (a_v > b_v) ? 1 : 0;
}

function sortJobTitle(a,b,order) {
    let a_v = a.job_title;
    let b_v = b.job_title;
    if (order == 1) {
        return (b_v < a_v) ? -1 : (b_v > a_v) ? 1 : 0;
    }
    return (a_v < b_v) ? -1 : (a_v > b_v) ? 1 : 0;
}

function sortUsername(a,b,order) {
    let a_v = a.username;
    let b_v = b.username;
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

export default Employee;

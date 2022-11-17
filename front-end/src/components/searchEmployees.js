import React, {useEffect, useState} from 'react';
import '../css/reporttable.css';
import EmployeeSearchBox from '../components/employeeSearchBox';
import EmployeeEntry from '../components/employeeEntry';
import EmployeeEdit from './employeeEdit';
import { createAPIEndpoint, ENDPOINTS } from '../api';

function EmployeeSearch() {
    const [data, setData] = useState([]);
    const [filters,setFilters] = useState();
    const [passwords,setPasswords] = useState(false);
    const [doSearch,setDoSearch] = useState(false);
    const [editId,setEditId] = useState(null);

    const getFromSearch = (filter) => {
        console.log(filter);
        setFilters(filter);
        setDoSearch(!doSearch);
        setEditId(null);
    }

    const searchEmployees = () => {
        createAPIEndpoint(ENDPOINTS.employee)
        .fetch()
        .then(response => {
            setData(filterData(response.data));
        })
        .catch(error => console.log(error))
    }

    useEffect(() => {
        if (filters) {
            searchEmployees();
            console.log(data);
        }
    },[filters,doSearch]);


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

    const editPopup = (e) => {
        setEditId(e.target.value);
    }

    const endEdit = () => {
        setEditId(null);
    }

    const editChange = () => {
        setEditId(null);
        setDoSearch(!doSearch);
    }

    const renderTable = () => {
        return data.map(elem => {
            return (
                <>
                    <tr key={elem.employee_id} id={"employee-"+elem.employee_id} className="result-row">
                        <td>{elem.employee_id}</td>
                        <td>{elem.fname}</td>
                        <td>{elem.lname}</td>
                        <td>{new Date(elem.dob).toLocaleDateString()}</td>
                        <td>{elem.supervisor_id}</td>
                        <td>{elem.job_title}</td>
                        <td>{elem.username}</td>
                        {passwords && <td>{elem.password}</td>}
                        <td><button type='button' value={elem.employee_id} id={'edit-'+elem.employee_id} onClick={editPopup}>Edit</button></td>
                    </tr>
                    {editId == elem.employee_id && 
                    <tr id={"edit-employee-"+elem.employee_id} className="edit-row">
                        <EmployeeEdit values={elem} endEdit={endEdit} editChange={editChange}/>
                    </tr>}
                </>
            )
        })
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
            <div className='optionbox'>
                {<EmployeeSearchBox returnFilters={getFromSearch}/>}
                {<EmployeeEntry/>}
            </div>
            <br /><br />
            <br /><br />
            <div>
                <label>Show Passwords: </label>
                <input type="checkbox" name="showpasswords" onChange={showPasswords}/>
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
                            {passwords && <th>Password</th>}
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>{renderTable()}</tbody>
                </table>
            </div>
        </div>

    );
}

export default EmployeeSearch;
import React, {useEffect,useState} from 'react';
import '../css/formpage.css';
import '../css/dataentry.css';
import useForm from '../hooks/useForm.js';
import { createAPIEndpoint, ENDPOINTS } from '../api';

const getFreshModel = () => ({
    employee_id: "",
    fname: "",
    lname: "",
    job_title: "",
    dob: "",
    supervisor_id: "",
    username: "",
    password: ""
});

function EmployeeDataEntry() {
    const {values,setValues,errors,setErrors,handleInputChange} = useForm(getFreshModel);
    const [employeeList,setEmployeeList] = useState([]);
    const [newUsername,setNewUsername] = useState('');

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.employee)
        .fetch()
        .then(response => {
            setEmployeeList(response.data);
        })
        .catch(errors => console.log(errors));
    }, [employeeList]);

    const formSubmit = () => {
        console.log(values);
        createAPIEndpoint(ENDPOINTS.employee)
        .post(values)
        .then((response) => {
            setEmployeeList([
                ...employeeList,
                {
                    employee_id: response.employee_id,
                    fname: response.fname,
                    lname: response.lname,
                    job_title: response.job_title,
                    dob: response.dob,
                    supervisor_id: response.supervisor_id,
                    username: response.username,
                    password: response.password
                }
            ])
        })
    };

    const updateEmployee = (employee_id) => {
        console.log(employee_id, newUsername);
        var newRecord = {
            employee_id: employee_id,
            newUsername: newUsername
        }
        console.log(newRecord);
        createAPIEndpoint(ENDPOINTS.employeeUpdate)
        .post(newRecord)
        .then(() => {alert("Successfully changed username");})
        .catch(errors => console.log(errors))
    };

    const deleteEmployee = (employee_id) => {
        console.log(employee_id);
        createAPIEndpoint(ENDPOINTS.employee)
        .delete(employee_id)
        .then(() => {alert("Successfully deleted!");})
        .catch(errors => console.log(errors));
    };

    return (
        <div className='outside'>
            <h1>ADDING NEW EMPLOYEE</h1>
            <div className='entry-form'>
                <label>Employee ID:</label>
                <input type="text" name="employee_id" onChange={handleInputChange}/>
                <label>First Name:</label>
                <input type="text" name="fname" onChange={handleInputChange}/>
                <label>Last Name:</label>
                <input type="text" name="lname" onChange={handleInputChange}/>
                <label>Job Title:</label>
                <input type="text" name="job_title" onChange={handleInputChange}/>
                <label>Date of Birth:</label>
                <input type="date" name="dob" onChange={handleInputChange}/>
                <label>Supervisor ID:</label>
                <select type="text" name="supervisor_id" id="supervisor_id" onChange={handleInputChange}>
                    <option defaultValue>Open this select menu</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <label>Username:</label>
                <input type="text" name="username" onChange={handleInputChange}/>
                <label>Password:</label>
                <input type="text" name="password" onChange={handleInputChange}/>
                <button onClick={formSubmit}>Submit</button>
            </div>
            <br />
            <div className="employees">
                <h3>Current Employees</h3>
                {employeeList.map((val) => {
                    return (
                        <div className="employee" key={val.employee_id}>
                            <div>
                                <h3>Name: {val.fname} {val.lname}</h3>
                                <h3>DOB: {val.dob}</h3>
                                <h3>Title: {val.job_title}</h3>
                                <h3>Username: {val.username}</h3>
                                <h3>Password: {val.password}</h3>
                            </div>
                            <div>
                                <input type="text" placeholder="New username" onChange={(event) => {
                                    setNewUsername(event.target.value);
                                }}/>
                                <button onClick={() => {updateEmployee(val.employee_id)}}>Update new username</button>
                                <button onClick={() => {deleteEmployee(val.employee_id)}}>Delete employee</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default EmployeeDataEntry;
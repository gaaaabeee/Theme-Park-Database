import React from 'react';
import '../css/formpage.css';
import '../css/dataentry.css';
import useForm from '../hooks/useForm.js';
import { createAPIEndpoint, ENDPOINTS } from '../api';

function EmployeeEntry() {
    const getFreshModel = () => ({
        id: "",
        fname: "",
        lname: "",
        job_title: "",
        dob: "",
        supervisor_id: "",
        username: "",
        password: ""
    });

    const {values,setValues,errors,setErrors,handleInputChange} = useForm(getFreshModel);

    const addemployee = (e) => {
        e.preventDefault();
        console.log(values);
        createAPIEndpoint(ENDPOINTS.employee)
        .post(values)
        .then(() => {
            setValues(getFreshModel());
            alert("Successfully added employee!\nSearch again to refresh the table.");
        })
        .catch(error => {
            console.log(error);
            alert("Failed to add employee.")
        })
    };

    return (
        <div>
            <h3>Add New Employee</h3>
            <p>*The employee will be able to log in as <br/> soon as they are added.</p>
            <form name="employeeadd" id="employeeadd" className="entrybox" onSubmit={addemployee}>
                <table>
                    <tr>
                        <td><label>First Name: </label></td>
                        <td><input type="text" name="fname" value={values.fname} onChange={handleInputChange} required/></td>
                    </tr>
                    <tr>
                        <td><label>Last Name: </label></td>
                        <td><input type="text" name="lname" value={values.lname} onChange={handleInputChange} required/></td>
                    </tr>
                    <tr>
                        <td><label>Job Title: </label></td>
                        <td><input type="text" name="job_title" value={values.job_title} onChange={handleInputChange} required/></td>
                    </tr>
                    <tr>
                        <td><label>Date of Birth: </label></td>
                        <td><input type="date" name="dob" value={values.dob} onChange={handleInputChange} required/></td>
                    </tr>
                    <tr>
                        <td><label>Supervisor ID: </label></td>
                        <td>
                            <select type="text" name="supervisor_id" id="supervisor_id" value={values.supervisor_id} onChange={handleInputChange} required>
                                <option defaultValue>Open this select menu</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><label>Username: </label></td>
                        <td><input type="text" name="username" value={values.username} onChange={handleInputChange} required/></td>
                    </tr>
                    <tr>
                        <td><label>Password: </label></td>
                        <td><input type="text" name="password" value={values.password} onChange={handleInputChange} required/></td>
                    </tr>
                </table>
            </form>
            <br />
            <button className="submit-button" type="submit" value="submit" form="employeeadd">Add Employee</button>
        </div>
    );
}

export default EmployeeEntry;
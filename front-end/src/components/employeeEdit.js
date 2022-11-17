import React, {useState} from 'react';
import '../css/reporttable.css';
import useForm from '../hooks/useForm';
import { createAPIEndpoint, ENDPOINTS } from '../api';

function EmployeeEdit (props) {
    const getFreshModel = () => ({
        fname: props.values.fname,
        lname: props.values.lname,
        job_title: props.values.job_title,
        dob: new Date(props.values.dob).toISOString().split('T')[0],
        supervisor_id: props.values.supervisor_id,
        username: props.values.username
    });

    const {values,setValues,errors,setErrors,handleInputChange} = useForm(getFreshModel);

    //only updates username atm
    const updateEmployee = (e) => {
        e.preventDefault();
        console.log("Updating employee"+props.values.employee_id, values);
        const newRecord = {
            employee_id: props.values.employee_id,
            newUsername: values.username
        }
        console.log(newRecord);
        createAPIEndpoint(ENDPOINTS.employeeUpdate)
        .post(newRecord)
        .then(() => {
            alert("Successfully changed username!");
            props.editChange();
        })
        .catch(errors => console.log(errors))
    }

    const deleteEmployee = () => {
        console.log(props.values.employee_id);
        createAPIEndpoint(ENDPOINTS.employee)
        .delete(props.values.employee_id)
        .then(() => {
            alert("Successfully deleted!");
            props.editChange();
        })
        .catch(errors => console.log(errors));
    }
    
    return (
        <td className="edit-box" colSpan="7">
            <p>Edit Employee {props.values.employee_id}</p>
            <form name="employeeedit" id="employeeedit" onSubmit={updateEmployee}>
                <div className="edit-form">
                    <div className="edit-form-item">
                        <label>New First Name: </label>
                        <input type="text" name="fname" value={values.fname} onChange={handleInputChange}/>
                    </div>
                    <div className="edit-form-item">
                        <label>New Last Name: </label>
                        <input type="text" name="lname" value={values.lname} onChange={handleInputChange}/>
                    </div>
                    <div className="edit-form-item">
                        <label>New Job Title: </label>
                        <input type="text" name="job_title" value={values.job_title} onChange={handleInputChange}/>
                    </div>
                    <div className="edit-form-item">
                        <label>New Date of Birth: </label>
                        <input type="date" name="dob" value={values.dob} onChange={handleInputChange}/>
                    </div>
                    <div className="edit-form-item">
                        <label>New Supervisor ID: </label>
                        <select type="text" name="supervisor_id" value={values.supervisor_id} onChange={handleInputChange}>
                            <option defaultValue>Open this select menu</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                    <div className="edit-form-item">
                        <label>New Username: </label>
                        <input type="text" name="username" value={values.username} onChange={handleInputChange}/>
                    </div>
                    <div className="edit-form-item">
                        <button type="submit" value="submit">Save Changes</button>
                    </div>
                    <div className="edit-form-item">
                        <button type="button" onClick={deleteEmployee}>Delete Employee</button>
                    </div>
                    <div className="edit-form-item">
                        <button type="button" value={"edit-employee-"+props.values.employee_id} onClick={props.endEdit}>Close</button>
                    </div>
                </div>
            </form>
        </td>
    );
}

export default EmployeeEdit;
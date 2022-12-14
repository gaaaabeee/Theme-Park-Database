import React from 'react';
import useStateContext from '../../hooks/useStateContext';
import  {useEffect, useState} from 'react';
import useForm from '../../hooks/useForm';
import { createAPIEndpoint, ENDPOINTS } from '../../api';
import {GiSaveArrow} from 'react-icons/gi';
import {AiFillDelete} from 'react-icons/ai';
/* i deleted this 
<div className="edit-form-item">
                        <button type="button" onClick={deleteEmployee}>Delete Employee <AiFillDelete/></button>
                    </div>
                    */
function EmployeeEdit (props) {
    const getFreshModel = () => ({
        fname: props.values.fname,
        lname: props.values.lname,
        job_title: props.values.job_title,
        dob: new Date(props.values.dob).toISOString().split('T')[0],
        supervisor_id: props.values.supervisor_id,
        username: props.values.username
    });

    const {values,setValues,errors,setErrors,handleInputChange} = useForm(getFreshModel)
    //begin karen edit
    const {context,setContext} = useStateContext();
    const [sid,setsid] = useState(0);
    const [eid,seteid] = useState(0);
    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.employee)
        .fetch()
        .then(response => {
            console.log(response.data);
            const thisEmp = response.data.find((item) => (item.employee_id == context.login_id));
            setsid(thisEmp.supervisor_id );
            seteid(thisEmp.employee_id);
        })
        .catch(error => console.log(error))
    },[]);

    if(eid === sid ){
        //end edit
    const updateEmployee = (e) => {
        e.preventDefault();
        console.log("Updating employee "+props.values.employee_id, values);
        const newRecord = {
            employee_id: props.values.employee_id,
            newFirstName: values.fname,
            newLastName: values.lname,
            newJobTitle: values.job_title,
            newDOB: values.dob,
            newSupervisorID: values.supervisor_id,
            newUsername: values.username
        }
        console.log(newRecord);
        createAPIEndpoint(ENDPOINTS.employeeUpdate)
        .post(newRecord)
        .then(() => {
            alert("Successfully changed employee!");
            props.editChange();
        })
        .catch(errors => {
            console.log(errors);
            alert("Failed to update employee.")
        })
    }

    const deleteEmployee = () => {
        console.log(props.values.employee_id);
        createAPIEndpoint(ENDPOINTS.employee)
        .delete(props.values.employee_id)
        .then(() => {
            alert("Successfully deleted employee!");
            props.editChange();
        })
        .catch(errors => {
            console.log(errors);
            alert("Failed to delete employee.");
        });
    }
    
    return (
        <td className="edit-box" colSpan="7">
            <p>Edit Employee {props.values.employee_id}</p>
            <form name="employeeedit" id="employeeedit" onSubmit={updateEmployee}>
                <div className="edit-form">
                    <div className="edit-form-item">
                        <label>First Name: </label>
                        <input type="text" name="fname" value={values.fname} onChange={handleInputChange}/>
                    </div>
                    <div className="edit-form-item">
                        <label>Last Name: </label>
                        <input type="text" name="lname" value={values.lname} onChange={handleInputChange}/>
                    </div>
                    <div className="edit-form-item">
                        <label>Job Title: </label>
                        <input type="text" name="job_title" value={values.job_title} onChange={handleInputChange}/>
                    </div>
                    <div className="edit-form-item">
                        <label>Date of Birth: </label>
                        <input type="date" name="dob" value={values.dob} onChange={handleInputChange}/>
                    </div>
                    <div className="edit-form-item">
                        <label>Supervisor ID: </label>
                        <select type="text" name="supervisor_id" value={values.supervisor_id} onChange={handleInputChange}>
                            <option defaultValue>Open this select menu</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                    <div className="edit-form-item">
                        <label>Username: </label>
                        <input type="text" name="username" value={values.username} onChange={handleInputChange}/>
                    </div>
                    <div className="edit-form-item">
                        <button type="submit" value="submit">Save Changes <GiSaveArrow/></button>
                    </div>
                    <div className="edit-form-item">
                        <button type="button" onClick={props.endEdit}>Close</button>
                    </div>
                </div>
            </form>
        </td>
    );}
//karen edit
else{ return( <p> You are not authorized to edit employee information</p>);}
}

export default EmployeeEdit;

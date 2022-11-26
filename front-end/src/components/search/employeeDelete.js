import React from 'react';
import useStateContext from '../../hooks/useStateContext';
import  {useEffect, useState} from 'react';
import useForm from '../../hooks/useForm';
import { createAPIEndpoint, ENDPOINTS } from '../../api';
import {GiSaveArrow} from 'react-icons/gi';
import {AiFillDelete} from 'react-icons/ai';

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

    //only updates username atm
    if(eid === sid ){


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
            <p>Are you sure you want to delete {props.values.fname} {props.values.lname}?</p>
            
                    <div className="edit-form-item">
                        <button type="button" onClick={deleteEmployee}>Yes <AiFillDelete/></button>
                    </div>
                    <div className="edit-form-item">
                        <button type="button" onClick={props.endEdit}>No</button>
                    </div>
        </td>
    );}
    else{ return( <p> You are not authorized to edit employee information</p>);
}}


export default EmployeeEdit;

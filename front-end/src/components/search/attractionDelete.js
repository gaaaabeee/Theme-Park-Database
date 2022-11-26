import React from 'react';
import useStateContext from '../../hooks/useStateContext';
import  {useEffect, useState} from 'react';
import useForm from '../../hooks/useForm';
import { createAPIEndpoint, ENDPOINTS } from '../../api';
import {GiSaveArrow} from 'react-icons/gi';
import {AiFillDelete} from 'react-icons/ai';

function AttractionDelete (props) {
    const getFreshModel = () => ({
        name: props.values.name,
        description: props.values.description,
        location: props.values.location,
        min_height: props.values.min_height,
        start_time: new Date(props.values.start_time).toTimeString().split(' ')[0],
        end_time: new Date(props.values.end_time).toTimeString().split(' ')[0],
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
    if(eid === sid){
    const deleteAttraction = () => {
        console.log(props.values.attraction_id);
        createAPIEndpoint(ENDPOINTS.attraction)
        .delete(props.values.attraction_id)
        .then(() => {
            alert("Successfully deleted attraction!");
            props.editChange();
        })
        .catch(errors => {
            console.log(errors);
            alert("Failed to delete attraction.");
        });
    }
    
    return (
        <td className="edit-box" colSpan="9">
            <p>Are you sure you want to delete {props.values.name}?</p>
            
                    <div className="edit-form-item">
                        <button type="button" onClick={deleteAttraction}>Yes <AiFillDelete/></button>
                    </div>
                
                    <div className="edit-form-item">
                        <button type="button" onClick={props.endEdit}>No</button>
                    </div>
             
        </td>
    );}
    else{ return( <p> You are not authorized to edit attraction information</p>);
}}


export default AttractionDelete;

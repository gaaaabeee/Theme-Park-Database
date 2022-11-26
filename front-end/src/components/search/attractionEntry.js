import React from 'react';
import useStateContext from '../../hooks/useStateContext';
import  {useEffect, useState} from 'react';
import useForm from '../../hooks/useForm.js';
import { createAPIEndpoint, ENDPOINTS } from '../../api';
import {GrAddCircle} from 'react-icons/gr';

function AttractionEntry() {
    const getFreshModel = () => ({
        name: "",
        type: "",
        description: "",
        location: "",
        min_height: 0,
        start_time: "08:00:00",
        end_time: "20:00:00",
        breakdown_nums: 0
    });

    const {values,setValues,errors,setErrors,handleInputChange} = useForm(getFreshModel);
    ///begin karen edit
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
       //end karen edit
    const addattraction = (e) => {
        e.preventDefault();
        console.log(values);
        createAPIEndpoint(ENDPOINTS.attraction)
        .post(values)
        .then(() => {
            setValues(getFreshModel());
            alert("Successfully added attraction!\nSearch again to refresh the table.");
        })
        .catch(error => {
            console.log(error);
            alert("Failed to add attraction.");
        })
    };

    return (
        <div className="search-area">
            <h3>Add New Attraction</h3>
            <form name="attractionadd" id="attractionadd" className="entrybox" onSubmit={addattraction}>
                <p>Required fields marked with *</p>
                <table>
                    <tr>
                        <td><label>*Name: </label></td>
                        <td><input type="text" name="name" value={values.name} onChange={handleInputChange} required/></td>
                    </tr>
                    <tr>
                        <td><label>*Type: </label></td>
                        <td>
                        <select type="text" name="type" value={values.type} onChange={handleInputChange} required>
                            <option defaultValue="ride">ride</option>
                            <option value="shop">shop</option>
                            <option value="show">show</option>
                        </select>
                        </td>
                    </tr>
                    <tr>
                        <td><label>*Description: </label></td>
                        <td><input type="text" name="description" value={values.description} onChange={handleInputChange} required/></td>
                    </tr>
                    <tr>
                        <td><label>Location Number: </label></td>
                        <td><input type="number" name="location" value={values.location} onChange={handleInputChange}/></td>
                    </tr>
                    <tr>
                        <td><label>Minimum Height: </label></td>
                        <td><input type="number" name="min_height" value={values.min_height} onChange={handleInputChange}/></td>
                    </tr>
                    <tr>
                        <td><label>Start Time: </label></td>
                        <td><input type="time" name="start_time" value={values.start_time} onChange={handleInputChange}/></td>
                    </tr>
                    <tr>
                        <td><label>End Time: </label></td>
                        <td><input type="time" name="end_time" value={values.end_time} onChange={handleInputChange}/></td>
                    </tr>
                </table>
            </form>
            <br />
            <button className="submit-button" type="submit" value="submit" form="attractionadd">Add Attraction <GrAddCircle/></button>
        </div>
    );}
}

export default AttractionEntry;

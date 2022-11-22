import React from 'react';
import useForm from '../../hooks/useForm.js';
import { createAPIEndpoint, ENDPOINTS } from '../../api';
import {GrAddCircle} from 'react-icons/gr';

function BreakdownEntry() {
    const getFreshModel = () => ({
        ride_id: "",
        maintainer_id: "",
        breakdown_date: "",
        breakdown_desc: ""
    });

    const {values,setValues,errors,setErrors,handleInputChange} = useForm(getFreshModel);

    const addbreakdown = (e) => {
        e.preventDefault();
        console.log(values);
        createAPIEndpoint(ENDPOINTS.breakdowns)
        .post(values)
        .then(() => {
            setValues(getFreshModel());
            alert("Successfully reported ride breakdown!\nSearch again to refresh the table.");
        })
        .catch(error => {
            console.log(error);
            alert("Failed to add breakdown report.");
        })
    };

    return (
        <div className="search-area">
            <h3>Report New Ride Breakdown</h3>
            <form name="breakdownadd" id="breakdownadd" className="entrybox" onSubmit={addbreakdown}>
                <p>*All fields are required</p>
                <table>
                    <tr>
                        <td><label>Ride ID: </label></td>
                        <td><input type="text" name="ride_id" value={values.ride_id} onChange={handleInputChange} required/></td>
                    </tr>
                    <tr>
                        <td><label>Maintainer ID: </label></td>
                        <td><input type="text" name="maintainer_id" value={values.maintainer_id} onChange={handleInputChange} required/></td>
                    </tr>
                    <tr>
                        <td><label>Breakdown Date: </label></td>
                        <td><input type="date" name="breakdown_date" value={values.breakdown_date} onChange={handleInputChange} required/></td>
                    </tr>
                    <tr>
                        <td><label>Breakdown Description: </label></td>
                        <td><input type="text" name="breakdown_desc" value={values.breakdown_desc} onChange={handleInputChange} required/></td>
                    </tr>
                </table>
            </form>
            <br />
            <button className="submit-button" type="submit" value="submit" form="breakdownadd">Add Report <GrAddCircle/></button>
        </div>
    );
}

export default BreakdownEntry;
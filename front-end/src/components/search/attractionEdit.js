import React from 'react';
import useForm from '../../hooks/useForm';
import { createAPIEndpoint, ENDPOINTS } from '../../api';

function AttractionEdit (props) {
    const getFreshModel = () => ({
        name: props.values.name,
        description: props.values.description,
        location: props.values.location,
        min_height: props.values.min_height,
        start_time: new Date(props.values.start_time).toTimeString().split(' ')[0],
        end_time: new Date(props.values.end_time).toTimeString().split(' ')[0],
    });

    const {values,setValues,errors,setErrors,handleInputChange} = useForm(getFreshModel);

    //only updates username atm
    const updateAttraction = (e) => {
        e.preventDefault();
        console.log("Updating attraction"+props.values.attraction_id, values);
        const newRecord = {
            attraction_id: props.values.attraction_id,
            newName: values.name,
            newDescription: values.description,
            newLocation: values.location,
            newMinHeight: values.min_height,
            newStartTime: values.start_time,
            newEndTime: values.end_time
        }
        console.log(newRecord);
        createAPIEndpoint(ENDPOINTS.attractionUpdate)
        .post(newRecord)
        .then(() => {
            alert("Successfully changed attraction!");
            props.editChange();
        })
        .catch(errors => {
            console.log(errors);
            alert("Failed to update attraction.")
        })
    }

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
    
    console.log(values.start_time);
    return (
        <td className="edit-box" colSpan="9">
            <p>Edit Attraction {props.values.attraction_id}</p>
            <form name="attractionedit" id="attractionedit" onSubmit={updateAttraction}>
                <div className="edit-form">
                    <div className="edit-form-item">
                        <label>Name: </label>
                        <input type="text" name="name" value={values.name} onChange={handleInputChange}/>
                    </div>
                    <div className="edit-form-item">
                        <label>Description: </label>
                        <input type="text" name="description" value={values.description} onChange={handleInputChange}/>
                    </div>
                    <div className="edit-form-item">
                        <label>Location: </label>
                        <input type="number" name="location" value={values.location} onChange={handleInputChange}/>
                    </div>
                    <div className="edit-form-item">
                        <label>Minimum Height: </label>
                        <input type="number" name="min_height" value={values.min_height} onChange={handleInputChange}/>
                    </div>
                    <div className="edit-form-item">
                        <label>Start Time: </label>
                        <input type="time" name="start_time" value={values.start_time} onChange={handleInputChange}/>
                    </div>
                    <div className="edit-form-item">
                        <label>End Time: </label>
                        <input type="time" name="end_time" value={values.end_time} onChange={handleInputChange}/>
                    </div>
                    <div className="edit-form-item">
                        <button type="submit" value="submit">Save Changes</button>
                    </div>
                    <div className="edit-form-item">
                        <button type="button" onClick={deleteAttraction}>Delete Attraction</button>
                    </div>
                    <div className="edit-form-item">
                        <button type="button" onClick={props.endEdit}>Close</button>
                    </div>
                </div>
            </form>
        </td>
    );
}

export default AttractionEdit;
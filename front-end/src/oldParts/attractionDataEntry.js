import React, {useEffect,useState} from 'react';
import '../css/formpage.css';
import '../css/dataentry.css';
import useForm from '../hooks/useForm.js';
import { createAPIEndpoint, ENDPOINTS } from '../api';

const getFreshModel = () => ({
    name: "",
    type: "",
    description: "",
    location: "",
    min_height: "",
    start_time: "",
    end_time: "",
    breakdown_nums: 0
});

function AttractionDataEntry() {
    const {values,setValues,errors,setErrors,handleInputChange} = useForm(getFreshModel);
    const [ridesList,setRidesList] = useState([]);
    const [newName,setNewName] = useState('');

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.attraction)
        .fetch()
        .then(response => {
            setRidesList(response.data);
        })
        .catch(errors => console.log(errors));
    }, [ridesList]);

    const formSubmit = () => {
        console.log(values);
        createAPIEndpoint(ENDPOINTS.attraction)
        .post(values)
        .then((response) => {
            setRidesList([
                ...ridesList,
                {
                    attraction_id: response.attraction_id,
                    name: response.name,
                    type: response.type,
                    description: response.description,
                    min_height: response.min_height,
                    start_time: response.start_time,
                    end_time: response.end_time,
                    breakdown_nums: response.breakdown_nums
                }
            ]);
            setValues(getFreshModel());
        })
        .then(() => {alert("Successfully added attraction!");})
    };

    //change ride name not attraction_id
    const updateRide = (attraction_id) => {
        console.log(attraction_id, newName);
        var newRecord = {
            attraction_id: attraction_id,
            newName: newName
        }
        console.log(newRecord);
        createAPIEndpoint(ENDPOINTS.attractionUpdate)
        .post(newRecord)
        .then(() => {alert("Successfully changed name");})
        .catch(errors => console.log(errors))
    };

    const deleteRide = (attraction_id) => {
        console.log(attraction_id);
        createAPIEndpoint(ENDPOINTS.attraction)
        .delete(attraction_id)
        .then(() => {alert("Successfully deleted!");})
        .catch(errors => console.log(errors));
    };

    return (
        <div className='outside'>
            <h1>Add New Attraction</h1>
            <div className='entry-form'>
                <label>Name:</label>
                <input type="text" name="name" value={values.name} onChange={handleInputChange}/>
                <label>Type:</label>
                <select type="text" name="type" value={values.type} onChange={handleInputChange}>
                    <option defaultValue="ride">ride</option>
                    <option value="shop">shop</option>
                    <option value="show">show</option>
                </select>
                <label>Description:</label>
                <input type="text" name="description" value={values.description} onChange={handleInputChange}/>
                <label>Location Number:</label>
                <input type="number" name="location" value={values.location} onChange={handleInputChange}/>
                <label>Minimum Height:</label>
                <input type="number" name="min_height" value={values.min_height} onChange={handleInputChange}/>
                <label>Start Time:</label>
                <input type="time" name="start_time" value={values.start_time} onChange={handleInputChange}/>
                <label>End Time:</label>
                <input type="time" name="end_time" value={values.end_time} onChange={handleInputChange}/>
                <button onClick={formSubmit}>Submit</button>
            </div>
            <br />
            <div className="things">
                <h3>Current Attractions</h3>
                {ridesList.map((val) => {
                    return (
                        <div className="thing" key={val.attraction_id}>
                            <div>
                                <h4>ID: {val.attraction_id}</h4>
                                <h4>Name: {val.name}</h4>
                                <h4>Type: {val.type}</h4>
                                <h4>Description: {val.description}</h4>
                                <h4>Minimum Height: {val.min_height}</h4>
                                <h4>Start Time: {val.start_time}</h4>
                                <h4>End Time: {val.end_time}</h4>
                                <h4>Breakdowns: {val.breakdown_nums}</h4>
                            </div>
                            <div>
                                <input type="text" placeholder="New Name" onChange={(event) => {
                                    setNewName(event.target.value);
                                }}/>
                                <button onClick={() => {updateRide(val.attraction_id)}}>Update new name</button>
                                <button onClick={() => {deleteRide(val.attraction_id)}}>Delete Ride</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default AttractionDataEntry;

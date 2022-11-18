import React, {useEffect,useState} from 'react';
import '../css/formpage.css';
import '../css/dataentry.css';
import useForm from '../hooks/useForm.js';
import { createAPIEndpoint, ENDPOINTS } from '../api';

const getFreshModel = () => ({
    ride_id: "",
    maintainer_id: "",
    breakdown_date: "",
    breakdown_desc: ""
});

function BreakdownDataEntry() {
    const {values,setValues,errors,setErrors,handleInputChange} = useForm(getFreshModel);
    const [breakdownList,setRidesList] = useState([]);

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.breakdowns)
        .fetch()
        .then(response => {
            setRidesList(response.data);
        })
        .catch(errors => console.log(errors));
    }, [breakdownList]);

    const formSubmit = () => {
        console.log(values);
        createAPIEndpoint(ENDPOINTS.breakdowns)
        .post(values)
        .then((response) => {
            setRidesList([
                ...breakdownList,
                {
                    breakdown_id: response.breakdown_id,
                    ride_id: response.ride_id,
                    ride_name: response.name,
                    ride_breakdowns: response.breakdown_nums,
                    maintainer_id: response.maintainer_id,
                    breakdown_date: response.breakdown_date,
                    breakdown_desc: response.breakdown_desc,
                    resolved: response.resolved
                }
            ]);
            setValues(getFreshModel());
        })
        .then(() => {alert("Successfully filed new breakdown report!");})
    };

    //change ride name not attraction_id
    const resolveBreakdown = (breakdown_id) => {
        console.log("Resolving Breakdown "+breakdown_id);
        var newRecord = {
            breakdown_id: breakdown_id,
            newResolved: 1
        }
        console.log(newRecord);
        createAPIEndpoint(ENDPOINTS.breakdownUpdate)
        .post(newRecord)
        .then(() => {alert("Successfully resolved breakdown!");})
        .catch(errors => console.log(errors))
    };

    return (
        <div className='outside'>
            <h1>File New Ride Breakdown</h1>
            <div className='entry-form'>
                <label>Ride ID:</label>
                <input type="text" name="ride_id" value={values.ride_id} onChange={handleInputChange}/>
                <label>Maintainer ID:</label>
                <input type="text" name="maintainer_id" value={values.maintainer_id} onChange={handleInputChange}/>
                <label>Breakdown Date:</label>
                <input type="date" name="breakdown_date" value={values.breakdown_date} onChange={handleInputChange}/>
                <label>Breakdown Description:</label>
                <input type="text" name="breakdown_desc" value={values.breakdown_desc} onChange={handleInputChange}/>
                <button onClick={formSubmit}>Submit</button>
            </div>
            <br />
            <div className="things">
                <h3>Current Breakdown Reports</h3>
                {breakdownList.map((val) => {
                    return (
                        <div className="thing" key={val.breakdown_id}>
                            <div>
                                <h4>ID: {val.breakdown_id}</h4>
                                <h4>Ride ID: {val.ride_id}</h4>
                                <h4>Ride Name: {val.ride_name}</h4>
                                <h4>Times Ride Broke Down: {val.ride_breakdowns}</h4>
                                <h4>Maintainer ID: {val.maintainer_id}</h4>
                                <h4>Breakdown Date: {val.breakdown_date}</h4>
                                <h4>Breakdown Description: {val.breakdown_desc}</h4>
                                <h4>Resolved: {val.resolved}</h4>
                            </div>
                            <div>
                                {!val.resolved && 
                                <button onClick={() => {resolveBreakdown(val.breakdown_id)}}>Resolve as Fixed</button>}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default BreakdownDataEntry;
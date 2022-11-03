import React, {useState} from 'react';
import '../css/formpage.css';
import RideSearch from '../components/searchRides.js';
import RideDataEntry from '../components/rideDataEntry';


function Ride2() {
    const [option,setOption] = useState(0);

    const changeOption = (opt) => {
        if (opt != option) {setOption(opt);}
    }

    if (option === 1) {
        return (
            <div>
                <button className="other-form-button" onClick={() => changeOption(0)}>Go Back</button>
                <RideSearch />
            </div>
        );
    }
    else if (option === 2) {
        return (
            <div>
                <button className="other-form-button" onClick={() => changeOption(0)}>Go Back</button>
                <RideDataEntry />
            </div>
        );
    }
    else {
        return (
            <div className='form-page'>
                <div className='form-box'>
                    <h2>Ride Options</h2>
                    <hr style={{border:'2px solid white'}}/>
                    <br />
                    <p>Find rides:</p>
                    <button className="other-form-button" onClick={() => changeOption(1)}>Rides Search</button>
                    <br /><br />
                    <p>Add New Rides:</p>
                    <button className="other-form-button" onClick={() => changeOption(2)}>Data Entry</button>
                </div>
            </div>
        );
    }
}

export default Ride2;
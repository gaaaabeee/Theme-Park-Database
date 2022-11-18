import React, {useState} from 'react';
import '../css/formpage.css';
import AttractionSearch from '../employeePages/AttractionPage.js';
import AttractionDataEntry from '../components/attractionDataEntry';


function Attraction() {
    const [option,setOption] = useState(0);

    const changeOption = (opt) => {
        if (opt != option) {setOption(opt);}
    }

    if (option === 1) {
        return (
            <div>
                <button className="other-form-button" onClick={() => changeOption(0)}>Go Back</button>
                <AttractionSearch />
            </div>
        );
    }
    else if (option === 2) {
        return (
            <div>
                <button className="other-form-button" onClick={() => changeOption(0)}>Go Back</button>
                <AttractionDataEntry />
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
                    <p>View Attractions:</p>
                    <button className="other-form-button" onClick={() => changeOption(1)}>Attraction Search</button>
                    <br /><br />
                    <p>Add New Attractions:</p>
                    <button className="other-form-button" onClick={() => changeOption(2)}>Attraction Data Entry</button>
                    <br /><br />
                </div>
            </div>
        );
    }
}

export default Attraction;
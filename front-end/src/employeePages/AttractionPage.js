import React, {useState} from 'react';
import '../css/formpage.css';
import AttractionSearch from '../components/searchAttractions.js';
import AttractionDataEntry from '../components/attractionDataEntry';
import BreakdownSearch from '../components/searchBreakdowns.js';
import BreakdownDataEntry from '../components/breakdownDataEntry.js';


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
    else if (option === 3) {
        return (
            <div>
                <button className="other-form-button" onClick={() => changeOption(0)}>Go Back</button>
                <BreakdownSearch />
            </div>
        )
    }
    else if (option === 4) {
        return (
            <div>
                <button className="other-form-button" onClick={() => changeOption(0)}>Go Back</button>
                <BreakdownDataEntry />
            </div>
        )
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
                    <p>View Ride Breakdowns:</p>
                    <button className="other-form-button" onClick={() => changeOption(3)}>Breakdown Search</button>
                    <br /><br />
                    <p>Report New Breakdown:</p>
                    <button className="other-form-button" onClick={() => changeOption(4)}>Breakdown Data Entry</button>
                    <br /><br />
                </div>
            </div>
        );
    }
}

export default Attraction;
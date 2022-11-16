import React, {useState} from 'react';
import '../css/formpage.css';
import BreakdownSearch from '../components/searchBreakdowns.js';
import BreakdownDataEntry from '../components/breakdownDataEntry.js';


function Breakdown() {
    const [option,setOption] = useState(0);

    const changeOption = (opt) => {
        if (opt != option) {setOption(opt);}
    }

    
    if (option === 1) {
        return (
            <div>
                <button className="other-form-button" onClick={() => changeOption(0)}>Go Back</button>
                <BreakdownSearch />
            </div>
        )
    }
    else if (option === 2) {
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
                    <h2>Ride Breakdown Options</h2>
                    <hr style={{border:'2px solid white'}}/>
                    <br />
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

export default Breakdown;
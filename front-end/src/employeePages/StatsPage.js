import React, {useState} from 'react';
import '../css/formpage.css';
import StatsOverall from '../components/statsOverall.js';
import StatsMonthly from '../components/statsMonthly.js';
import StatsDaily from '../components/statsDaily.js';

function Stats() {
    const [option,setOption] = useState(0);

    const changeOption = (opt) => {
        if (opt != option) {setOption(opt);}
    }

    if (option === 1) {
        return (
            <div>
                <button className="other-form-button" onClick={() => changeOption(0)}>Go Back</button>
                <StatsOverall />
            </div>
        );
    }
    else if (option === 2) {
        return (
            <div>
                <button className="other-form-button" onClick={() => changeOption(0)}>Go Back</button>
                <StatsMonthly />
            </div>
        );
    }
    else if (option === 3) {
        return (
            <div>
                <button className="other-form-button" onClick={() => changeOption(0)}>Go Back</button>
                <StatsDaily />
            </div>
        );
    }
    else {
        return (
            <div className='form-page'>
                <div className='form-box'>
                    <h2>Statistics:</h2>
                    <hr style={{border:'2px solid white'}}/>
                    <br />
                    <p>Overall Park Diagnostics:</p>
                    <button className="other-form-button" onClick={() => changeOption(1)}>Overall</button>
                    <br /><br />
                    <p>Diagnostics by Month:</p>
                    <button className="other-form-button" onClick={() => changeOption(2)}>Monthly</button>
                    <br /><br />
                    <p>Diagnostics by Day:</p>
                    <button className="other-form-button" onClick={() => changeOption(3)}>Daily</button>
                </div>
            </div>
        );
    }
}

export default Stats;
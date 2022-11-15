import React, {useState} from 'react';
import '../css/formpage.css';
import StatsOverall from '../components/statsOverall.js';
import StatsMonthly from '../components/statsMonthly.js';
import StatsDaily from '../components/statsDaily.js';
import StatsToday from '../components/statsToday.js';
import AttractionPastMonth from '../components/attractionPastMonth';

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
    else if (option === 4) {
        return (
            <div>
                <button className="other-form-button" onClick={() => changeOption(0)}>Go Back</button>
                <StatsToday />
            </div>
        );
    }
    else if (option === 5) {
        return (
            <div>
                <button className="other-form-button" onClick={() => changeOption(0)}>Go Back</button>
                <AttractionPastMonth />
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
                    <p>View Overall Park Diagnostics:</p>
                    <button className="other-form-button" onClick={() => changeOption(1)}>Park Report</button>
                    <br /><br />
                    <p>View Monthly Reports:</p>
                    <button className="other-form-button" onClick={() => changeOption(2)}>Monthly Reports</button>
                    <br /><br />
                    <p>View Daily Reports:</p>
                    <button className="other-form-button" onClick={() => changeOption(3)}>Daily Reports</button>
                    <br /><br />
                    <p>View Report from Today:</p>
                    <button className="other-form-button" onClick={() => changeOption(4)}>Today's Report</button>
                    <br /><br />
                    <p>View Attraction Popularity from Past 30 Days:</p>
                    <button className="other-form-button" onClick={() => changeOption(5)}>Popularity Past 30 Days</button>
                </div>
            </div>
        );
    }
}

export default Stats;
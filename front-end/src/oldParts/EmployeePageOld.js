import React, {useState} from 'react';
import '../css/formpage.css';
import EmployeeDataEntry from '../components/employeeDataEntry.js';
import EmployeeSearch from '../employeePages/EmployeePage.js';
import JobTitleSearch from '../components/jobTitleSearch.js';


function Employee() {
    const [option,setOption] = useState(0);

    const changeOption = (opt) => {
        if (opt != option) {setOption(opt);}
    }

    if (option === 1) {
        return (
            <div>
                <button className="other-form-button" onClick={() => changeOption(0)}>Go Back</button>
                <EmployeeSearch />
            </div>
        );
    }
    else if (option === 2) {
        return (
            <div>
                <button className="other-form-button" onClick={() => changeOption(0)}>Go Back</button>
                <EmployeeDataEntry />
            </div>
        );
    }
    else if (option === 3) {
        return (
            <div>
                <button className="other-form-button" onClick={() => changeOption(0)}>Go Back</button>
                <JobTitleSearch />
            </div>
        );
    }
    else {
        return (
            <div className='form-page'>
                <div className='form-box'>
                    <h2>Employee Options</h2>
                    <hr style={{border:'2px solid white'}}/>
                    <br />
                    <p>See employees:</p>
                    <button className="other-form-button" onClick={() => changeOption(1)}>Employee Search</button>
                    <br /><br />
                    <p>Find Under Job Title (ignore):</p>
                    <button className="other-form-button" onClick={() => changeOption(3)}>Job Search</button>
                    <br /><br />
                    <p>Add New Employees (ignore):</p>
                    <button className="other-form-button" onClick={() => changeOption(2)}>Data Entry</button>
                </div>
            </div>
        );
    }
}

export default Employee;
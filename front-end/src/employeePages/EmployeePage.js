import React, {useState} from 'react';
import '../css/formpage.css';
import EmployeeDataEntry from '../components/employeeDataEntry.js';
import EmployeeSearch from '../components/searchEmployees.js';


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
    else {
        return (
            <div className='form-page'>
                <div className='form-box'>
                    <h2>Employee Options</h2>
                    <hr style={{border:'2px solid white'}}/>
                    <br />
                    <p>Find employees:</p>
                    <button className="other-form-button" onClick={() => changeOption(1)}>Employee Search</button>
                    <br /><br />
                    <p>Add New Employees and View All Current Employees:</p>
                    <button className="other-form-button" onClick={() => changeOption(2)}>Data Entry</button>
                </div>
            </div>
        );
    }
}

export default Employee;
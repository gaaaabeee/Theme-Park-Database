import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import useForm from '../hooks/useForm.js';
import '../css/formpage.css';
import { createAPIEndpoint, ENDPOINTS, BASE_URL } from '../api/index.js';
import useStateContext from '../hooks/useStateContext.js';
import EmployeeSearch from '../employeePages/FindEmployeesPage.js';
import EmployeeDataEntry from '../employeePages/EmployeeDataEntry.js';


function Employee() {
    const [option,setOption] = useState(0);
    console.log(option);

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
        return <div>Month Search</div>;
    }
    else if (option === 3) {
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
                    <p>Find employees by category:</p>
                    <button className="other-form-button" onClick={() => changeOption(1)}>Employee Search</button>
                    <br /><br />
                    <p>Find entries by month:</p>
                    <button className="other-form-button" onClick={() => changeOption(2)}>Month Search</button>
                    <br /><br />
                    <p>Add New Employees and View All Current Employees:</p>
                    <button className="other-form-button" onClick={() => changeOption(3)}>Data Entry</button>
                </div>
            </div>
        );
    }
}

export default Employee;
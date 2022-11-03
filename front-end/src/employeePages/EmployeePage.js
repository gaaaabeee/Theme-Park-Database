import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import useForm from '../hooks/useForm.js';
import '../css/formpage.css';
import { createAPIEndpoint, ENDPOINTS, BASE_URL } from '../api/index.js';
import useStateContext from '../hooks/useStateContext.js';


function Employee() {


    return (
        <div className='form-page'>
            <div className='form-box'>
                <h2>Employee Options</h2>
                <hr style={{border:'2px solid white'}}/>
                <br /><br />
                <p>Find employees by category:</p>
                <Link className="other-form-button" to="/findemployee">Employee Search</Link>
                <br /><br />
                <p>Find entries by month:</p>
                <Link className="other-form-button" to="/signup">Month Search</Link>
            </div>
        </div>
    );
}

export default Employee;
import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import useForm from '../hooks/useForm.js';
import '../css/formpage.css';
import { createAPIEndpoint, ENDPOINTS, BASE_URL } from '../api/index.js';
import useStateContext from '../hooks/useStateContext.js';

//signup OK page


function SignClear() {

    return (
        <div className='form-page'>
            <div className='form-box'>
                <h2>Sign up Successful!</h2>
                <br /><br />
                <br /><br />
                <p>Want to log in?</p>
                <Link className="other-form-button" to="/login">Log In</Link>
            </div>
        </div>
    );
}

export default SignClear;
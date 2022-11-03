import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import useForm from '../hooks/useForm.js';
import '../css/formpage.css';
import { createAPIEndpoint, ENDPOINTS, BASE_URL } from '../api/index.js';
import useStateContext from '../hooks/useStateContext.js';
import CustomerSearch from '../components/searchCustomers.js';


function Customer() {
    const [option,setOption] = useState(0);

    const changeOption = (opt) => {
        if (opt != option) {setOption(opt);}
    }

    if (option === 1) {
        return (
            <div>
                <button className="other-form-button" onClick={() => changeOption(0)}>Go Back</button>
                <CustomerSearch />
            </div>
        );
    }
    else {
        return (
            <div className='form-page'>
                <div className='form-box'>
                    <h2>Customer Options</h2>
                    <hr style={{border:'2px solid white'}}/>
                    <br />
                    <p>Find customers:</p>
                    <button className="other-form-button" onClick={() => changeOption(1)}>Customer Search</button>
                    <br /><br />
                </div>
            </div>
        );
    }
}

export default Customer;
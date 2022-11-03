import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import '../css/formpage.css';
import useStateContext from '../hooks/useStateContext.js';

function Logout() {
    const {context, setContext} = useStateContext();
    const navigate = useNavigate();

    const logout = () => {
        setContext({login_id: 0, account: ""});
        navigate("/");
        window.location.reload(false);
    };

    return (
        <div className='form-page'>
            <div className='form-box'>
                <p>Are you sure you want to log out?</p>
                <button type="button" className="logout-button" onClick={logout}>Log Out</button>
            </div>
        </div>
    );
}

export default Logout;
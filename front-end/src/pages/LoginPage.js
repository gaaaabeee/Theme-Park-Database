import React from 'react';
import {Link} from 'react-router-dom';
import '../css/formpage.css';

//login page

function Login() {
    return (
        <div class='form-page'>
            <div class='form-box'>
                <h2>Log In</h2>
                <hr style={{border:'2px solid white'}}/>
                <div class='form-inner-box'>
                    <form name="loginForm" method="post" id="loginForm">
                        <label>Email: </label><br />
                        <input type="email" name="email" placeholder="example@email.com" size="30"/><br /><br />
                        <label>Password: </label><br />
                        <input type="password" name="password" size="30"/><br /><br />
                    </form>
                </div>
                <button class="submit-button" type="submit" value="Submit" form="loginForm">Sign In</button>
                <br /><br />
                <p>Don't have an account?</p>
                <Link class="other-form-button" to="/signup">Create New Account</Link>
            </div>
        </div>
    );
}

export default Login;
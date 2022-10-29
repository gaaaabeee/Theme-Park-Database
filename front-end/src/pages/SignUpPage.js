import React from 'react';
import {Link} from 'react-router-dom';
import '../css/formpage.css';

// sign up page

function Signup() {
    return (
        <div class='form-page'>
            <div class='form-box'>
                <h2>Sign Up</h2>
                <hr style={{border:'2px solid white'}}/>
                <div class='form-inner-box'>
                    <form name="signupForm" method="post" id="signupForm"> 
                        <label>First Name: </label><br />
                        <input type="text" name="fname" size="30"/><br /><br />
                        <label>Last Name: </label><br />
                        <input type="text" name="lname" size="30"/><br /><br />
                        <label>Email: </label><br />
                        <input type="email" name="email" placeholder="example@email.com" size="30"/><br /><br />
                        <label>Password: </label><br />
                        <input type="password" name="password" size="30"/><br /><br />
                    </form>
                </div>
                <button class="submit-button" type="submit" value="Submit" form="signupForm">Create New Account</button>
                <br /><br />
                <p>Already have an account?</p>
                <Link class="other-form-button" to="/login">Log In</Link>
            </div>
        </div>
    );
}

export default Signup;
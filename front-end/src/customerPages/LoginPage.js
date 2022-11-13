import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import useForm from '../hooks/useForm.js';
import '../css/formpage.css';
import { createAPIEndpoint, ENDPOINTS } from '../api/index.js';
import useStateContext from '../hooks/useStateContext.js';

//login page

const getFreshModel = () => ({
    email: "",
    password: ""
});

function Login() {

    const {context, setContext} = useStateContext();
    const navigate = useNavigate();
    const {values,setValues,errors,setErrors,handleInputChange} = useForm(getFreshModel);

    //when form submits
    const login = (e) => {
        e.preventDefault();
        if (validate()) {
            //code for when user has valid login info
            createAPIEndpoint(ENDPOINTS.customerLogin)
            .post(values)
            .then(response => {
                setContext({login_id: response.data[0].customer_id, account: "customer"});
                navigate('/');
                alert("Successfully logged in!");
                window.location.reload(false);}) 
            .catch(error => {
                console.log(error);
                alert("Username or Password is incorrect");})
        }
    };

    //check if fields are correct
    const validate = () => {
        let temp = {};
        temp.email = (/\S+@\S+\.\S+/).test(values.email) ? "" : "Not a valid email.";
        temp.password = values.password != "" ? "" : "You must enter a password.";
        setErrors(temp);
        return Object.values(temp).every(x => x == "");
    };

    return (
        <div className='form-page'>
            <div className='form-box'>
                <h2>Log In</h2>
                <hr style={{border:'2px solid white'}}/>
                <div className='form-inner-box'>
                    <form name="loginForm" method="post" id="loginForm" onSubmit={login}>
                        <label>Email: </label><br />
                        <input type="email" name="email" value={values.email} onChange={handleInputChange} placeholder="ex: example@email.com" size="30" required/><br />
                        <p>{errors.email}</p><br />
                        <label>Password: </label><br />
                        <input type="password" name="password" value={values.password} onChange={handleInputChange} size="30" required/><br />
                        <p>{errors.password}</p><br />
                    </form>
                </div>
                <button className="submit-button" type="submit" value="Submit" form="loginForm">Sign In</button>
                <br /><br />
                <p>Don't have an account?</p>
                <Link className="other-form-button" to="/signup">Create New Account</Link>
                <br /><br />
                <p>Are you an employee? Log in here.</p>
                <Link className="other2-form-button" to="/employeelogin">Employee Log In</Link>
            </div>
        </div>
    );
}

export default Login;
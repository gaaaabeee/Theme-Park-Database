import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import useForm from '../hooks/useForm.js';
import '../css/formpage.css';
import { createAPIEndpoint, ENDPOINTS } from '../api/index.js';
import useStateContext from '../hooks/useStateContext.js';

//login page

const getFreshModel = () => ({
    username: "",
    password: ""
});

function EmployeeLogIn() {

    const {context, setContext} = useStateContext();
    const navigate = useNavigate();

    const {values,setValues,errors,setErrors,handleInputChange} = useForm(getFreshModel);

    //when form submits
    const employeelogin = (e) => {
        e.preventDefault();
        if (validate()) {
            //code for when user has valid login info
            createAPIEndpoint(ENDPOINTS.employeeLogin)
            .post(values)
            .then(response => {
                setContext({login_id: response.data[0].employee_id, account: "employee"});
                navigate('/employee');
                window.location.reload(false);}) 
            .catch(error => console.log(error))
        }
    };

    //check if fields are correct
    const validate = () => {
        let temp = {};
        temp.lname = values.username != "" ? "" : "You must enter a username.";
        temp.password = values.password != "" ? "" : "You must enter a password.";
        setErrors(temp);
        return Object.values(temp).every(x => x == "");
    };

    return (
        <div className='form-page'>
            <div className='form-box'>
                <h2>Employee Log In</h2>
                <hr style={{border:'2px solid white'}}/>
                <div className='form-inner-box'>
                    <form name="loginForm" method="post" id="loginForm" onSubmit={employeelogin}>
                        <label>Username: </label><br />
                        <input type="text" name="username" value={values.username} onChange={handleInputChange} required/><br />
                        <p>{errors.username}</p><br />
                        <label>Password: </label><br />
                        <input type="password" name="password" value={values.password} onChange={handleInputChange} size="30" required/><br />
                        <p>{errors.employee_id}</p><br />
                    </form>
                </div>
                <button className="submit-button" type="submit" value="Submit" form="loginForm">Sign In</button>
            </div>
        </div>
    );
}

export default EmployeeLogIn;
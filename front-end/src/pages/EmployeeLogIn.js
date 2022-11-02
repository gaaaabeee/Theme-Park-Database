import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import useForm from '../hooks/useForm.js';
import '../css/formpage.css';
import { createAPIEndpoint, ENDPOINTS, BASE_URL } from '../api/index.js';
import useStateContext from '../hooks/useStateContext.js';

//login page

const getFreshModel = () => ({
    lname: "",
    employee_id: ""
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
            createAPIEndpoint(ENDPOINTS.employee)
            .post(values)
            .then(response => {
                setContext({employee_id: response.data.employee_id});
                navigate('/employee');
                console.log(context);}) 
            .catch(error => console.log(error))
        }
    };

    //check if fields are correct
    const validate = () => {
        let temp = {};
        temp.lname = (/\S+@\S+\.\S+/).test(values.lname) ? "" : "Not a valid name";
        temp.employee_id = values.employee_id != "" ? "" : "You must enter an ID.";
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
                        <label>Last Name: </label><br />
                        <input type="lname" name="lname" value={values.lname} onChange={handleInputChange} required/><br />
                        <p>{errors.lname}</p><br />
                        <label>Employee ID: </label><br />
                        <input type="employee_id" name="employee_id" value={values.employee_id} onChange={handleInputChange} size="30" required/><br />
                        <p>{errors.employee_id}</p><br />
                    </form>
                </div>
                <button className="submit-button" type="submit" value="Submit" form="loginForm">Sign In</button>
            </div>
        </div>
    );
}

export default EmployeeLogIn;
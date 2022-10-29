import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import useForm from '../hooks/useForm.js';
import '../css/formpage.css';
import { createAPIEndpoint, ENDPOINTS, BASE_URL } from '../api/index.js';
import useStateContext from '../hooks/useStateContext.js';

// sign up page

const getFreshModel = () => ({
    fname: "",
    lname: "",
    height: "",
    email: "",
    password: ""
});

function Signup() {
    const {context, setContext} = useStateContext();
    const navigate = useNavigate();
    
    const {values,setValues,errors,setErrors,handleInputChange} = useForm(getFreshModel);

    //when form submits
    const signup = (e) => {
        e.preventDefault();
        if (validate()) {
            //code for when user has valid sign up info
            createAPIEndpoint(ENDPOINTS.participant)
            .post(values)
            .then(response => {
                setContext({customer_id: response.data.customer_id});
                navigate('/');
                console.log(context);})
            .catch(error => console.log(error))
        }
    };

    //check if fields are correct
    const validate = () => {
        let temp = {};
        temp.fname = (/^[a-zA-Z-' ]*$/).test(values.fname) ? "" : "Not a valid first name.";
        temp.lname = (/^[a-zA-Z-' ]*$/).test(values.lname) ? "" : "Not a valid first name.";
        if (values.height != "") {
            temp.height = (/^\d{1}('\d{1,2})?$/).test(values.height) ? "" : "Not a valid height";
        } else {
            temp.height = "";
        }
        temp.email = (/\S+@\S+\.\S+/).test(values.email) ? "" : "Not a valid email.";
        temp.password = values.password != "" ? "" : "You must enter a password.";
        setErrors(temp);
        return Object.values(temp).every(x => x == "");
    };

    return (
        <div className='form-page'>
            <div className='form-box'>
                <h2>Sign Up</h2>
                <hr style={{border:'2px solid white'}}/>
                <div className='form-inner-box'>
                    <form name="signupForm" method="post" id="signupForm" onSubmit={signup}> 
                        <label>First Name: </label><br />
                        <input type="text" name="fname" onChange={handleInputChange} size="30" required/><br />
                        <p>{errors.fname}</p><br />
                        <label>Last Name: </label><br />
                        <input type="text" name="lname" onChange={handleInputChange} size="30" required/><br />
                        <p>{errors.lname}</p><br />
                        <label>Height: </label><br />
                        <input type="text" name="height" onChange={handleInputChange} size="10" placeholder="ex: 6'10"/><br />
                        <p>{errors.height}</p><br />
                        <label>Email: </label><br />
                        <input type="email" name="email" onChange={handleInputChange} placeholder="ex: example@email.com" size="30" required/><br />
                        <p>{errors.email}</p><br />
                        <label>Password: </label><br />
                        <input type="password" name="password" onChange={handleInputChange} size="30" required/><br />
                        <p>{errors.password}</p><br />
                    </form>
                </div>
                <button className="submit-button" type="submit" value="Submit" form="signupForm">Create New Account</button>
                <br /><br />
                <p>Already have an account?</p>
                <Link className="other-form-button" to="/login">Log In</Link>
            </div>
        </div>
    );
}

export default Signup;
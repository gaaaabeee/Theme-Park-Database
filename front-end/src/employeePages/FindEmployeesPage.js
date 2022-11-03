import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {Link, useNavigate} from 'react-router-dom';
import useForm from '../hooks/useForm.js';
import '../css/formpage.css';
import { createAPIEndpoint, ENDPOINTS } from '../api/index.js';
import useStateContext from '../hooks/useStateContext.js';

function EmployeeSearch(){
    const [data, setData]= useState([]);
    function findcustomer(){
        createAPIEndpoint(ENDPOINTS.employee)
        .get()
        .then(response => {
            setData(response.Data)})
        .catch(error => console.log(error))
        const arr = data.map((data,index) => {
            return(
                <tr>
                <td>data.customer_id</td>
                <td>data.fname</td>
                <td>data.email</td>
                <td>data.password</td>
                <td>data.height</td>
                <td>data.DOB</td>
                <td>data.tickets_bought</td>
                </tr>
            )
        })
    }
    return(
        <div className='form-page'>
            <h2>Employee Search</h2>
            <button onClick={findcustomer} className="submit-button" type="submit" >Get Customers</button>
            <table>
                <tr>
                    <th>Customer ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Height</th>
                    <th>DOB</th>
                    <th>Tickets Bought</th>
                </tr>
            {arr}
            </table>
        </div>

    )

}

export default EmployeeSearch;
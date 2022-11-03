import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {Link, useNavigate} from 'react-router-dom';
import useForm from '../hooks/useForm.js';
import '../css/dataentry.css';
import { createAPIEndpoint, ENDPOINTS, BASE_URL } from '../api/index.js';
import useStateContext from '../hooks/useStateContext.js';



function EmployeeSearch(){
const [data, setData]= useState([]);
function findcustomer(){
    createAPIEndpoint(ENDPOINTS.employee)
    .fetch()
    .then(response => {
        setData(response.data)})
    .catch(error => console.log(error))}
    const renderTable = () =>{
        return data.map(elem =>{
            return(
            <tr>
            <td style={{border: '1px solid white'}}>{elem.employee_id}</td>
            <td style={{border: '1px solid white'}}>{elem.fname}</td>
            <td style={{border: '1px solid white'}}>{elem.lname}</td>
            <td style={{border: '1px solid white'}}>{elem.dob}</td>
            <td style={{border: '1px solid white'}}>{elem.supervisor_id}</td>
            <td style={{border: '1px solid white'}}>{elem.job_title}</td>
            <td style={{border: '1px solid white'}}>{elem.username}</td>
            <td style={{border: '1px solid white'}}>{elem.password}</td>
            </tr>
        )
    })}

return(
    <div className='entry-form'>
        
        <h2>Employee Search Real</h2>
        <button onClick={findcustomer} className="submit-button" type="submit" >Get Customers</button>
        <br /><br />
        <br /><br />
        <table>
            <thead>
            <tr>
                <th>Employee ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Date of Birth</th>
                <th>Supervisor ID</th>
                <th>Job Title</th>
                <th>Username</th>
                <th>Password</th>
            </tr>
            </thead>
            <tbody>{renderTable()}</tbody>
        </table>
    </div>

)

}

export default EmployeeSearch;
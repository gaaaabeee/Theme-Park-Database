import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {Link, useNavigate} from 'react-router-dom';
import useForm from '../hooks/useForm.js';
import '../css/dataentry.css';
import { createAPIEndpoint, ENDPOINTS, BASE_URL } from '../api/index.js';
import useStateContext from '../hooks/useStateContext.js';



function CustomerSearch(){
const [data, setData]= useState([]);
function findcustomer(){
    createAPIEndpoint(ENDPOINTS.customer)
    .fetch()
    .then(response => {
        setData(response.data)})
    .catch(error => console.log(error))}
    const renderTable = () =>{
        return data.map(elem =>{
            return(
            <tr>
            <td style={{border: '1px solid white'}}>{elem.customer_id}</td>
            <td style={{border: '1px solid white'}}>{elem.fname}</td>
            <td style={{border: '1px solid white'}}>{elem.lname}</td>
            <td style={{border: '1px solid white'}}>{elem.email}</td>
            <td style={{border: '1px solid white'}}>{elem.password}</td>
            <td style={{border: '1px solid white'}}>{elem.height}</td>
            <td style={{border: '1px solid white'}}>{elem.tickets_bought}</td>
            </tr>
        )
    })}

return(
    <div className='entry-form'>
        
        <h2>Customer Search</h2>
        <button onClick={findcustomer} className="submit-button" type="submit" >Get Customers</button>
        <br /><br />
        <br /><br />
        <table>
            <thead>
            <tr>
                <th>Customer ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Height</th>
                <th>Tickets</th>
            </tr>
            </thead>
            <tbody>{renderTable()}</tbody>
        </table>
    </div>

)

}

export default CustomerSearch;
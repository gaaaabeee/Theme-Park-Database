import React, {useState} from 'react';
import '../css/reporttable.css';
import { createAPIEndpoint, ENDPOINTS } from '../api/index.js';

function JobTitleSearch() {
    const [data, setData] = useState([]);
    const [title,setTitle] = useState("");

    //backend: update api
    function findemployee() {
        createAPIEndpoint(ENDPOINTS.jobSearch+"/"+title)
        .fetch()
        .then(response => {
            setData(response.data)})
        .catch(error => console.log(error))}

        const renderTable = () => {
            return data.map(elem => {
                return(
                    <tr>
                        <td>{elem.employee_id}</td>
                        <td>{elem.fname}</td>
                        <td>{elem.lname}</td>
                        <td>{new Date(elem.dob).toLocaleDateString()}</td>
                        <td>{elem.supervisor_id}</td>
                        <td>{elem.job_title}</td>
                        <td>{elem.username}</td>
                        <td>{elem.password}</td>
                    </tr>
            )
        })}

    return (
        <div className='searchbox'>
            <h2>Job Title Search</h2>
            <div>
                <form name="jobsearch" id="jobsearch">
                    <label>Job Title:</label>
                    <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </form>
            </div><br/>
            <button onClick={findemployee} className="submit-button" type="button">Search Employees</button>
            <br /><br />
            <br /><br />
            <table className="result-table">
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
    );
}

export default JobTitleSearch;
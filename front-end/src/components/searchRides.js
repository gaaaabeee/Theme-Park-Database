import React, {useState} from 'react';
import '../css/dataentry.css';
import '../css/reporttable.css';
import { createAPIEndpoint, ENDPOINTS } from '../api/index.js';

function RideSearch(){
const [data, setData] = useState([]);
function findride(){
    createAPIEndpoint(ENDPOINTS.ride)
    .fetch()
    .then(response => {
        setData(response.data)})
    .catch(error => console.log(error))}
    const renderTable = () =>{
        return data.map(elem =>{
            return(
                <tr>
                    <td style={{border: '1px solid white'}}>{elem.attraction_id}</td>
                    <td style={{border: '1px solid white'}}>{elem.rname}</td>
                    <td style={{border: '1px solid white'}}>{elem.breakdown_id}</td>
                    <td style={{border: '1px solid white'}}>{elem.breakdown_date}</td>
                    <td style={{border: '1px solid white'}}>{elem.maintainer_id}</td>
                </tr>
        )
    })}

return(
    <div className='entry-form'>
        <h2>Rides Search</h2>
        <button onClick={findride} className="submit-button" type="submit" >Get Rides</button>
        <br /><br />
        <br /><br />
        <table>
            <thead>
            <tr>
                <th>Attraction ID</th>
                <th>Ride Name</th>
                <th>Breakdown Date</th>
                <th>Breakdown ID</th>
                <th>Maintainer ID</th>
            </tr>
            </thead>
            <tbody>{renderTable()}</tbody>
        </table>
    </div>

)

}

export default RideSearch;
import React, {useState} from 'react';
import '../css/reporttable.css';
import { createAPIEndpoint, ENDPOINTS } from '../api/index.js';

function CustomerSearch(){
    const [data, setData]= useState([]);

    const blankFilters = {
        id: "",
        name: "",
        description: "",
        location: "",
        min_height: "",
        start_time: "",
        end_time: "",
        breakdown_nums: ""
    };

    const [filters, setFilters] = useState(blankFilters);
    const updateFilters = (obj) => {setFilters({...filters,...obj});}

    const findride = () => {
        createAPIEndpoint(ENDPOINTS.ride)
        .fetch()
        .then(response => {
            setData(response.data)})
        .catch(error => console.log(error))
    }

    const renderTable = () => {
        let info = data;
        if (filters.id != "") { 
            info = info.filter((item) => {
                return (item.attraction_id == filters.id);
            });
        }
        if (filters.name != "") {
            info = info.filter((item) => {
                return (item.name.toLowerCase().startsWith(filters.name.toLowerCase()));
            });
        }
        if (filters.description != "") {
            info = info.filter((item) => {
                return (item.description.toLowerCase().includes(filters.description.toLowerCase()));
            });
        }
        if (filters.location != "") {
            info = info.filter((item) => {
                return (item.location == parseInt(filters.location));
            });
        }
        if (filters.min_height != "") {
            info = info.filter((item) => {
                return (item.min_height.toString().startsWith(filters.min_height));
            });
        }
        if (filters.breakdown_nums != "") {
            info = info.filter((item) => {
                return (item.breakdown_nums == parseInt(filters.breakdown_nums));
            });
        }
        //start time filter
        //end time filter
        return info.map(elem => {
            return (
                <tr>
                    <td>{elem.attraction_id}</td>
                    <td>{elem.name}</td>
                    <td>{elem.description}</td>
                    <td>{elem.location}</td>
                    <td>{elem.min_height}</td>
                    <td>{elem.start_time}</td>
                    <td>{elem.end_time}</td>
                    <td>{elem.breakdown_nums}</td>
                </tr>
            );}
        )
    }

    return (
        <div className='searchbox'>
            <h2>Ride Search</h2>
            <div>
                <p>*You can search by exact matches or by ranges. Only search by one or the other.</p>
                <form name="ridesearch" id="ridesearch">
                    <table className="filter-table">
                        <tr>
                            <th>ID:</th>
                            <th>Name:</th>
                            <th>Description:</th>
                        </tr>
                        <tr>
                            <td><input type="text" name="customer_id" value={filters.id} onChange={(e) => updateFilters({id:e.target.value})}/></td>
                            <td><input type="text" name="fname" value={filters.name} onChange={(e) => updateFilters({name:e.target.value})}/></td>
                            <td><input type="text" name="lname" value={filters.description} onChange={(e) => updateFilters({description:e.target.value})}/></td>
                        </tr>
                        <tr>
                            <th>Location</th>
                            <th>Minimum Height</th>
                            <th>Breakdowns</th>
                        </tr>
                        <tr>
                            <td><input type="text" name="location" value={filters.location} onChange={(e) => updateFilters({location:e.target.value})}/></td>
                            <td><input type="text" name="min_height" value={filters.min_height} onChange={(e) => updateFilters({min_height:e.target.value})}/></td>
                            <td><input type="text" name="breakdown_nums" value={filters.breakdown_nums} onChange={(e) => updateFilters({breakdown_nums:e.target.value})}/></td>
                        </tr>
                        <tr>
                            <th>Start Time</th>
                            <th>End Time</th>
                        </tr>
                        <tr>
                            <td><input type="time" name="start_time" value={filters.start_time} onChange={(e) => updateFilters({start_time:e.target.value})}/></td>
                            <td><input type="time" name="end_time" value={filters.end_time} onChange={(e) => updateFilters({end_time:e.target.value})}/></td>
                        </tr>
                    </table>
                </form>
            </div><br/>
            <button onClick={findride} className="submit-button" type="button">Search Rides</button>
            <br /><br />
            <br /><br />
            <table className="result-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Location</th>
                        <th>Minimum Height</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Breakdowns</th>
                    </tr>
                </thead>
                <tbody>{renderTable()}</tbody>
            </table>
        </div>

    )

}

//doesnt work
function compareHeight(height1,height2) {
    let inches1,inches2,theight1,theight2;
    let tempin1 = (height1%1).toString().slice(2);
    if (tempin1.charAt(1) == "0") {
        tempin1 = tempin1.slice(0,1);
    } else {
        tempin1 = tempin1.slice(0,2);
    }
    inches1 = parseInt(tempin1);
    theight1 = (parseInt(height1)*30.48)+(inches1*2.54)
    let tempin2 = (height2%1).toString().slice(2);
    if (tempin2.charAt(1) == "0") {
        tempin2 = tempin2.slice(0,1);
    } else {
        tempin2 = tempin2.slice(0,2);
    }
    inches2 = parseInt(tempin2);
    theight2 = (parseInt(height2)*30.48)+(inches2*2.54)
    console.log(theight1,theight2);
    if (theight1 > theight2) {return 1;}
    else if (theight1 == theight2) {return 0;}
    return 1;
}

export default CustomerSearch;
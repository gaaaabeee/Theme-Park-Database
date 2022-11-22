import React, {useState,useEffect} from 'react';
import '../css/ridepage.css';
import {createAPIEndpoint,ENDPOINTS} from '../api/index.js';
import {BsSearch} from 'react-icons/bs';

//rides page

function Rides() {
    const [rides,setRides] = useState([]);
    const [search,setSearch] = useState("");
    const [filter,setFilter] = useState(0);

    //filters ride list when using search filters
    const filterData = (info) => {
        if (search != "") {
            info = info.filter((item) => {
                return (item.name.toLowerCase().startsWith(search.toLowerCase()))
            })
        }
        if (filter == 1) {
            info = info.filter((item) => {
                return (item.min_height >= 5)
            })
        }
        else if (filter == 2) {
            info = info.filter((item) => {
                return (item.min_height < 5)
            })
        }
        info.sort((a,b) => {
            const name1 = a.name.toLowerCase();
            const name2 = b.name.toLowerCase();
            return (name1 < name2) ? -1 : (name1 > name2) ? 1 : 0;
        });
        return info;
    }

    //gets ride list from server
    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.rides)
        .fetch()
        .then(response => {
            console.log(response.data);
            setRides(filterData(response.data));
        })
        .catch(error => console.log(error))
    },[search,filter]);

    //returns list component of each ride
    const renderRideList = () => {
        return rides.map((item) => {
            let min_height = item.min_height.toString().replace(".","\"");
            const values = {name: item.name, description: item.description, min_height: min_height, message: item.message};
            return (<RideLi values={values}/>);
        })
    }

    return (
        <div>
            <div className="ridepage-header">
                <h1>Our Rides</h1>
                <p>Check out the list of all of our rides! We have rides for all ages.</p>
            </div>
            <div className="ride-search">
                <div className="ride-search-label">
                    Search <BsSearch/>
                </div>
                <div className="ride-search-box">
                    <input className="ride-search-input" type="text" name="ride_name" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search Ride Name"/>
                </div>
                <div className="ride-search-label">
                    Filter By
                </div>
                <div className="ride-search-filter">
                    <select type="number" name="ride_class" value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option defaultValue="0">All Rides</option>
                        <option value="1">Thrill Rides</option>
                        <option value="2">Family Rides</option>
                    </select>
                </div>
            </div>
            <div style={{height:"80px"}}></div>
            <ul className="ride-list">
                {renderRideList()}
            </ul>
        </div>
    );
}

//list component for one ride
function RideLi(props) {
    const imgName = props.values.name.replaceAll(" ","_")+".jpg";
    let rideImg;
    try {
        //get ride image if exists
        rideImg = (<img src={require('../images/rides/'+imgName)} alt="Image" className="ride-image" width="250px" height="150px"/>);
    } catch (error) {
        //no ride image, use blank image
        console.log(error);
        rideImg = (<div className="noImage"></div>);
    }

    return (
        <li className="ride-item">
            <div className="ride-img-box">
                {rideImg}
            </div>
            <div className="ride-text">
                <p className="ride-name">{props.values.name}</p>
                <p>{props.values.description}</p>
                {props.values.message && 
                <p>{props.values.message}</p>}
                <p>Minimum Height: {props.values.min_height}ft</p>
            </div>
        </li>
    );
}

export default Rides;
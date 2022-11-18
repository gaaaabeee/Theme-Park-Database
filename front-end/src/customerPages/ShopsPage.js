import React, {useState,useEffect} from 'react';
import '../css/ridepage.css';
import {createAPIEndpoint,ENDPOINTS} from '../api/index.js';
import {BsSearch} from 'react-icons/bs';

function Shops() {
    const [shops,setShops] = useState([]);
    const [search,setSearch] = useState("");

    const filterData = (info) => {
        if (search != "") {
            info = info.filter((item) => {
                return (item.name.toLowerCase().startsWith(search.toLowerCase()))
            })
        }
        info.sort((a,b) => {
            const name1 = a.name.toLowerCase();
            const name2 = b.name.toLowerCase();
            return (name1 < name2) ? -1 : (name1 > name2) ? 1 : 0;
        });
        return info;
    }

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.shops)
        .fetch()
        .then(response => {
            console.log(response.data);
            setShops(filterData(response.data));
        })
        .catch(error => console.log(error))
    },[search]);

    const renderRideList = () => {
        return shops.map((item) => {
            let start_time = new Date(item.start_time).toLocaleTimeString();
            let end_time = new Date(item.end_time).toLocaleTimeString();
            const values = {name: item.name, description: item.description, start_time: start_time, end_time: end_time};
            return (<ShopLi values={values}/>);
        })
    }

    return (
        <div>
            <div className="ridepage-header">
                <h1>Our Shops</h1>
                <p>Check out the list of all of our shops and restaurants! We have a variety of places to eat and buy merchandise.</p>
            </div>
            <div className="ride-search">
                <div className="ride-search-label">
                    Search <BsSearch/>
                </div>
                <div className="ride-search-box">
                    <input className="ride-search-input" type="text" name="ride_name" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search Shop Name"/>
                </div>
            </div>
            <div style={{height:"80px"}}></div>
            <ul className="ride-list">
                {renderRideList()}
            </ul>
        </div>
    );
}

function ShopLi(props) {
    const imgName = props.values.name.replaceAll(" ","_")+".jpg";
    let shopImg;
    try {
        shopImg = (<img src={require('../images/shops/'+imgName)} alt="Image" className="ride-image" width="250px" height="150px"/>);
    } catch (error) {
        console.log(error);
        shopImg = (<div className="noImage"></div>);
    }

    return (
        <li className="ride-item">
            <div className="ride-img-box">
                {shopImg}
            </div>
            <div className="ride-text">
                <p className="ride-name">{props.values.name}</p>
                <p>{props.values.description}</p>
                <p>Opens at {props.values.start_time} and closes at {props.values.end_time}</p>
            </div>
        </li>
    );
}

export default Shops;
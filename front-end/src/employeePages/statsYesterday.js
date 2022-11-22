import React, {useState,useEffect} from 'react';
import '../css/todaypage.css';
import { createAPIEndpoint, ENDPOINTS } from '../api/index.js';
import { TodayValueBox } from '../components/report/todayGridBox';

const getFreshModel = () => ({
    date: "",
    dayname: "",
    entries: "0",
    revenue: "0",
    holiday: "no",
    open: "yes",
    rainy: "no",
    mostPopularRide: ""
})

function StatsLastOpen() {
    const [data, setData]= useState(getFreshModel);
    const [range,setRange] = useState([]);
    const [repDate,setRepDate] = useState("");
    const [breakdownList,setBreakdownList] = useState([]);
    const [rides,setRides] = useState([]);
    const [shops,setShops] = useState([]);

    useEffect(() => {
        const today = new Date();
        const monthAgo = new Date();
        monthAgo.setDate(monthAgo.getDate()-30);
        const d = today.toISOString().split("T")[0];
        const d2 = monthAgo.toISOString().split("T")[0];
        createAPIEndpoint(ENDPOINTS.days+'/'+d2+'/'+d)
        .fetch()
        .then(response => {
            console.log("response: ",response.data);
            setRange(response.data);
        })
        .catch(error => {
            console.log(error);
            alert("Could not fetch dates from server.")
        })
        
    },[]);

    useEffect(() => {
        for (let i = range.length-1; i >= 0; i--) {
            if (range[i].most_popular_ride != null && range[i].open) {
                console.log(range[i]);
                setData(range[i]);
                setRepDate(new Date(range[i].date).toISOString().split("T")[0]);
                break;
            }
        }
    },[range]);

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.breakdowns)
        .fetch()
        .then(response => {
            console.log(response.data);
            setBreakdownList(response.data.filter((item) => {
                return new Date(item.breakdown_date).toISOString().split("T")[0] == repDate;
            }))
        })
        .catch(errors => console.log(errors));

        createAPIEndpoint(ENDPOINTS.attractionUsage+repDate)
        .fetch()
        .then(response => {
            console.log(response.data);
            setRides(response.data.filter((item) => {return item.type == "ride"}));
            setShops(response.data.filter((item) => {return item.type == "shop"}));
        })
        .catch(errors => console.log(errors));
    },[repDate]);

    const renderRideTable = () => {
        return rides.map((elem) => {
            return (
                <tr>
                    <td>{elem.name}</td>
                    <td>{elem.attraction_id}</td>
                    <td>{elem.uses}</td>
                </tr>
            );
        })
    };
    const renderShopTable = () => {
        return shops.map((elem) => {
            return (
                <tr>
                    <td>{elem.name}</td>
                    <td>{elem.attraction_id}</td>
                    <td>${elem.revenue}</td>
                </tr>
            );
        })
    };
    const renderBreakdownList = () => {
        if (breakdownList.length > 0) {
            return breakdownList.map(elem => {
                return (
                    <tr key={elem.breakdown_id}>
                        <td>{elem.breakdown_id}</td>
                        <td>{elem.ride_id}</td>
                        <td>{elem.name}</td>
                        <td>{elem.breakdown_nums}</td>
                        <td>{elem.maintainer_id}</td>
                        <td>{new Date(elem.breakdown_date).toLocaleString()}</td>
                        <td>{elem.breakdown_desc}</td>
                        <td>{elem.resolved ? "Yes" : "No"}</td>
                    </tr>
                );
            })
        } else {
            return (<tr>No Breakdowns</tr>);
        }
    }

    return (
        <div className="searchpage">
            <div className="search-header">
                <h1>Report from Last Park Opening</h1>
                <p className="search-info">View Park Report from the last full day the park was open.<br/>
                Information is gathered from each park day at 8:10 PM (10 minutes after closing). 
                If information has not yet been gathered for today then it will show the report from yesterday, or
                 the last time the park was opened if it was closed yesterday.</p>
            </div>
            <br/>
            <div className="month-header">
                <p className="time-period">Park Last Open on {data.dayname} {new Date(data.date).toLocaleDateString()}</p>
            </div>
            <div className="today-report-grid">
                <TodayValueBox label="Entries" value={data.entries}/>
                <TodayValueBox label="Revenue" value={'$'+data.revenue}/>
                <TodayValueBox label="New Breakdowns" value={data.new_breakdowns}/>
                <TodayValueBox label="Holiday?" value={data.holiday ? "Yes" : "No"}/>
                <TodayValueBox label="Rainout?" value={data.rainy_date ? "Yes" : "No"}/>
                <TodayValueBox label="Most Popular Ride" value={data.most_popular_ride}/>
            </div>
            <div className="flex-result-chart">
                <div className="table-title">Reported Breakdowns on this Day</div>
                <table className='result-table'>
                    <thead>
                        <tr>
                            <th>Breakdown ID</th>
                            <th>Ride ID</th>
                            <th>Ride Name</th>
                            <th>Times Ride Broke Down</th>
                            <th>Maintainer ID</th>
                            <th>Breakdown Date</th>
                            <th>Breakdown Description</th>
                            <th>Resolved</th>
                        </tr>
                    </thead>
                    <tbody>{renderBreakdownList()}</tbody>
                </table>
            </div>
            <div className="flex-result-charts">
                <div className="flex-result-chart">
                    <div className="table-title">Number of Times Rides were Ridden</div>
                    <table className="result-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Attraction ID</th>
                                <th>Times Ridden on this Day</th>
                            </tr>
                        </thead>
                        <tbody>{renderRideTable()}</tbody>
                    </table>
                </div>
                <div className="flex-result-chart">
                    <div className="table-title">Revenue Made from Shops</div>
                    <table className="result-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Attraction ID</th>
                                <th>Revenue from this Day</th>
                            </tr>
                        </thead>
                        <tbody>{renderShopTable()}</tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default StatsLastOpen;
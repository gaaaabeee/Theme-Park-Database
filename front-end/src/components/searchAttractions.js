import React, {useEffect, useState} from 'react';
import '../css/reporttable.css';
import AttractionSearchBox from './attractionSearchBox';
import AttractionEntry from './attractionEntry';
import AttractionEdit from './attractionEdit';
import { createAPIEndpoint, ENDPOINTS } from '../api/index.js';

function AttractionSearch(){
    const [data, setData]= useState([]);
    const [filters, setFilters] = useState();
    const [doSearch,setDoSearch] = useState(false);
    const [editId,setEditId] = useState(null);

    const getFromSearch = (filter) => {
        console.log(filter);
        setFilters(filter);
        setDoSearch(!doSearch);
        setEditId(null);
    }

    const searchAttractions = () => {
        createAPIEndpoint(ENDPOINTS.attraction)
        .fetch()
        .then(response => {
            console.log(response.data);
            setData(filterData(response.data))
        })
        .catch(error => {
            console.log(error);
            alert("Failed to fetch attraction list from server.");
        })
    }

    useEffect(() => {
        if (filters) {
            searchAttractions();
            console.log(data);
        }
    },[filters,doSearch]);

    const filterData = (info) => {
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
        if (filters.type != "") {
            info = info.filter((item) => {
                return (item.type == filters.type);
            })
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
        if (filters.start_time != "") {
            let times = filters.start_time.split(":");
            let hour = parseInt(times[0]);
            let minute = parseInt(times[1]);
            const startTime = new Date('0001-01-01T00:00:00');
            startTime.setHours(hour,minute);
            info = info.filter((item) => {
                return (new Date(item.start_time) >= startTime);
            })
        }
        if (filters.end_time != "") {
            let times = filters.end_time.split(":");
            let hour = parseInt(times[0]);
            let minute = parseInt(times[1]);
            const endTime = new Date('0001-01-01T00:00:00');
            endTime.setHours(hour,minute);
            info = info.filter((item) => {
                return (new Date(item.end_time) <= endTime);
            })
        }
        if (filters.breakdown_nums != "") {
            info = info.filter((item) => {
                return (item.breakdown_nums == parseInt(filters.breakdown_nums));
            });
        }
        return info;
    }

    const editPopup = (e) => {
        setEditId(e.target.value);
    }

    const endEdit = () => {
        setEditId(null);
    }

    const editChange = () => {
        setEditId(null);
        setDoSearch(!doSearch);
    }

    const renderTable = () => {
        return data.map(elem => {
            return (
                <>
                    <tr key={elem.attraction_id} className="result-row">
                        <td>{elem.attraction_id}</td>
                        <td>{elem.name}</td>
                        <td>{elem.type}</td>
                        <td>{elem.description}</td>
                        <td>{elem.location}</td>
                        <td>{elem.min_height}</td>
                        <td>{new Date(elem.start_time).toLocaleTimeString()}</td>
                        <td>{new Date(elem.end_time).toLocaleTimeString()}</td>
                        <td>{elem.breakdown_nums}</td>
                        <td><button type="button" value={elem.attraction_id} onClick={editPopup}>Edit</button></td>
                    </tr>
                    {editId == elem.attraction_id &&
                    <tr className="edit-row">
                        <AttractionEdit values={elem} endEdit={endEdit} editChange={editChange}/>
                    </tr>}
                </>
            );}
        )
    }

    return (
        <div className='searchpage'>
            <div className='optionbox'>
                {<AttractionSearchBox returnFilters={getFromSearch}/>}
                {<AttractionEntry/>}
            </div>
            <br /><br />
            <br /><br />
            <div>
                <table className="result-table">
                    <thead>
                        <tr>
                            <th>Attraction ID</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Description</th>
                            <th>Location</th>
                            <th>Minimum Height</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Breakdowns</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>{renderTable()}</tbody>
                </table>
            </div>
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

export default AttractionSearch;
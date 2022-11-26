import React, {useEffect, useState} from 'react';
import '../css/reporttable.css';
import useStateContext from '../hooks/useStateContext';
import AttractionSearchBox from '../components/search/attractionSearchBox';
import AttractionEntry from '../components/search/attractionEntry';
import AttractionEdit from '../components/search/attractionEdit';
import AttractionDelete from '../components/search/attractionDelete';
import { createAPIEndpoint, ENDPOINTS } from '../api/index.js';
//employee page for seeing attractions in the database

function Attraction(){
    const [data, setData]= useState([]);
    const [filters, setFilters] = useState();
    const [doSearch,setDoSearch] = useState(false);
    const [sortF,setSortF] = useState("attraction id");
    const [sortOrder,setSortOrder] = useState(0);
    const [editId,setEditId] = useState(null);
    const [editId2,setEditId2] = useState(null);

    //get search filters from search box
    const getFromSearch = (filter) => {
        console.log(filter);
        setFilters(filter);
        setDoSearch(!doSearch);
        setEditId(null);
        setEditId2(null);
    }

    //get list of attractions from server
    const searchAttractions = () => {
        createAPIEndpoint(ENDPOINTS.attraction)
        .fetch()
        .then(response => {
            console.log(response.data);
            setData(sortData(filterData(response.data)));
        })
        .catch(error => {
            console.log(error);
            alert("Failed to fetch attraction list from server.");
        })
    }

    //gets attraction list whenever search options are updated
    useEffect(() => {
        if (filters) {
            searchAttractions();
            console.log(data);
        }
    },[filters,doSearch,sortOrder]);

    //filters attraction list to match search filters
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
        if (filters.min_minheight != "" || filters.min_maxheight != "") {
            let minheight, maxheight;
            if (filters.min_minheight == "") {minheight = [0,0];}
            else {minheight = heightToNum(filters.min_minheight);}
            if (filters.min_maxheight == "") {maxheight = [10,10];}
            else {maxheight = heightToNum(filters.min_maxheight);}
            info = info.filter((item) => {
                let h = heightToNum(item.min_height);
                return (((h[0] == minheight[0]) ? (h[1] >= minheight[1]) : (h[0] >= minheight[0])) && ((h[0] == maxheight[0]) ? (h[1] <= maxheight[1]) : (h[0] <= maxheight[0])));
            })
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
        if (filters.minbreakdowns != "" || filters.maxbreakdowns != "") {
            let minbreakdowns, maxbreakdowns;
            if (filters.minbreakdowns == "") {minbreakdowns = 0;}
            else {minbreakdowns = parseInt(filters.minbreakdowns);}
            if (filters.maxbreakdowns == "") {maxbreakdowns = 99999;}
            else {maxbreakdowns = parseInt(filters.maxbreakdowns);}
            info = info.filter((item) => {
                return (item.breakdown_nums >= minbreakdowns && item.breakdown_nums <= maxbreakdowns);
            })
        }
        return info;
    }

    //sorts attraction list by specified column
    const sortData = (info) => {
        if (sortF == "attraction id") {
            info.sort((a,b) => {
                return sortAttractionId(a,b,sortOrder);
            })
        }
        else if (sortF == "name") {
            info.sort((a,b) => {
                return sortName(a,b,sortOrder);
            })
        }
        else if (sortF == "type") {
            info.sort((a,b) => {
                return sortType(a,b,sortOrder);
            })
        }
        else if (sortF == "description") {
            info.sort((a,b) => {
                return sortDescription(a,b,sortOrder);
            })
        }
        else if (sortF == "height") {
            info.sort((a,b) => {
                return sortHeight(a,b,sortOrder);
            })
        }
        else if (sortF == "location") {
            info.sort((a,b) => {
                return sortLocation(a,b,sortOrder);
            })
        }
        else if (sortF == "start time") {
            info.sort((a,b) => {
                return sortStartTime(a,b,sortOrder);
            })
        }
        else if (sortF == "end time") {
            info.sort((a,b) => {
                return sortEndTime(a,b,sortOrder);
            })
        }
        else if (sortF == "breakdowns") {
            info.sort((a,b) => {
                return sortBreakdowns(a,b,sortOrder);
            })
        }
        return info;
    }

    //activate editing component for attraction
    const editPopup = (e) => {
        setEditId(e.target.value);
    }
    const editPopup2 = (e) => {
        setEditId2(e.target.value);
        
    }

    //close editing component
    const endEdit = () => {
        setEditId(null);
        setEditId2(null);
    }

    //called when saving edits
    const editChange = () => {
        setEditId(null);
        setDoSearch(!doSearch);
    }

    //return table of attractions
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
                        //karen edit 
                        <td><button type="button" value={elem.attraction_id} onClick={editPopup2}>Delete</button></td>
                    </tr>
                    {editId == elem.attraction_id &&
                    <tr className="edit-row">
                        <AttractionEdit values={elem} endEdit={endEdit} editChange={editChange}/>
                    </tr>}
                     //karen edit
                     {editId2 == elem.attraction_id &&
                    <tr className="edit-row">
                        <AttractionDelete values={elem} endEdit={endEdit} editChange={editChange}/>
                    </tr>}
                </>
            );}
        )
    }

    //sets sort by column
    const setSort = (field) => {
        setSortF(field);
        setDoSearch(!doSearch);
    }

    return (
        <div className='searchpage'>
            <div className="search-header">
                <h1>Attractions</h1>
                <p className="search-info">On this page you can view current attractions, add new attractions, and edit and delete existing attractions.</p>
                <p><u>Key:</u> <b>Name</b> = attraction name, <b>Description</b> = about attraction, <b>Type</b> = what the attraction is, <b>Location</b> = used as reference for the map,<br/>
                <b>Minimum Height</b> = how tall you must be to go on the ride (0 if not a ride), <b>Start Time</b> = when the attraction opens, <b>End Time</b> = when the attraction closes<br/>
                <b>Breakdowns</b> = how many times this attraction has broken down</p>
            </div>
            <div className='optionbox'>
                {<AttractionSearchBox returnFilters={getFromSearch}/>}
                {<AttractionEntry/>}
            </div>
            <br /><br />
            <br /><br />
            <div>
                <p>To edit or delete an attraction, click "Edit" on that row. Edit any fields then click "Save Changes". Click "Delete Attraction" to delete it permenantly.<br/>
                Sort by a field by clicking on the column header.</p>
                <label>Sort:</label>
                <select className="tableOption" type="number" name="sortOrder" onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="0">Ascending</option>
                    <option value="1">Descending</option>
                </select>
                <table className="result-table">
                    <thead>
                        <tr>
                            <th><button type="button" className="sortB" onClick={() => setSort("attraction id")}>Attraction ID</button></th>
                            <th><button type="button" className="sortB" onClick={() => setSort("name")}>Name</button></th>
                            <th><button type="button" className="sortB" onClick={() => setSort("type")}>Type</button></th>
                            <th><button type="button" className="sortB" onClick={() => setSort("description")}>Description</button></th>
                            <th><button type="button" className="sortB" onClick={() => setSort("location")}>Location</button></th>
                            <th><button type="button" className="sortB" onClick={() => setSort("height")}>Minimum Height</button></th>
                            <th><button type="button" className="sortB" onClick={() => setSort("start time")}>Start Time</button></th>
                            <th><button type="button" className="sortB" onClick={() => setSort("end time")}>End Time</button></th>
                            <th><button type="button" className="sortB" onClick={() => setSort("breakdowns")}>Breakdowns</button></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>{renderTable()}</tbody>
                </table>
            </div>
        </div>
    )
}

//sort functions

function sortAttractionId(a,b,order) {
    let a_v = parseInt(a.attraction_id);
    let b_v = parseInt(b.attraction_id);
    if (order == 1) {
        return (b_v < a_v) ? -1 : (b_v > a_v) ? 1 : 0;
    }
    return (a_v < b_v) ? -1 : (a_v > b_v) ? 1 : 0;
}

function sortName(a,b,order) {
    let a_v = a.name;
    let b_v = b.name;
    if (order == 1) {
        return (b_v < a_v) ? -1 : (b_v > a_v) ? 1 : 0;
    }
    return (a_v < b_v) ? -1 : (a_v > b_v) ? 1 : 0;
}

function sortType(a,b,order) {
    let a_v = a.type;
    let b_v = b.type;
    if (order == 1) {
        return (b_v < a_v) ? -1 : (b_v > a_v) ? 1 : 0;
    }
    return (a_v < b_v) ? -1 : (a_v > b_v) ? 1 : 0;
}

function sortDescription(a,b,order) {
    let a_v = a.description;
    let b_v = b.description;
    if (order == 1) {
        return (b_v < a_v) ? -1 : (b_v > a_v) ? 1 : 0;
    }
    return (a_v < b_v) ? -1 : (a_v > b_v) ? 1 : 0;
}

function sortStartTime(a,b,order) {
    let a_v = new Date(a.start_time);
    let b_v = new Date(b.start_time);
    if (order == 1) {
        return b_v - a_v;
    }
    return a_v - b_v;
}

function sortEndTime(a,b,order) {
    let a_v = new Date(a.end_time);
    let b_v = new Date(b.end_time);
    if (order == 1) {
        return b_v - a_v;
    }
    return a_v - b_v;
}

function sortHeight(a,b,order) {
    let a_v = heightToNum(a.min_height);
    let b_v = heightToNum(b.min_height);
    if (order == 1) {
        return ((b_v[0] == a_v[0]) ? ((b_v[1] < a_v[1]) ? -1 : ((b_v[1] > a_v[1]) ? 1 : 0)) : ((b_v[0] < a_v[0]) ? -1 : ((b_v[0] > a_v[0]) ? 1 : 0)));
    }
    return ((a_v[0] == b_v[0]) ? ((a_v[1] < b_v[1]) ? -1 : ((a_v[1] > b_v[1]) ? 1 : 0)) : ((a_v[0] < b_v[0]) ? -1 : ((a_v[0] > b_v[0]) ? 1 : 0)));
}

function sortLocation(a,b,order) {
    let a_v = parseInt(a.location);
    let b_v = parseInt(b.location);
    if (order == 1) {
        return (b_v < a_v) ? -1 : (b_v > a_v) ? 1 : 0;
    }
    return (a_v < b_v) ? -1 : (a_v > b_v) ? 1 : 0;
}

function sortBreakdowns(a,b,order) {
    let a_v = parseInt(a.breakdown_nums);
    let b_v = parseInt(b.breakdown_nums);
    if (order == 1) {
        return (b_v < a_v) ? -1 : (b_v > a_v) ? 1 : 0;
    }
    return (a_v < b_v) ? -1 : (a_v > b_v) ? 1 : 0;
}


//separates height into ft and inches
function heightToNum(height) {
    let ft, inc;
    let hs = height.toString();
    if (hs.includes(".")) {
        let h = height.toString().split(".");
        ft = parseInt(h[0]);
        inc = parseInt(h[1]);
    } else {
        ft = height;
        inc = 0;
    }
    return [ft,inc];
}

export default Attraction;

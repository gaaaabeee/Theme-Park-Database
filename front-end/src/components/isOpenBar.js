import React, {useState,useEffect} from 'react';
import {createAPIEndpoint,ENDPOINTS} from '../api';

//says at top if amusement park is opened or closed today
function IsOpen() {
    const [open,setOpen] = useState("");
    const [today,setToday] = useState(new Date());

    const t = new Date();
    if (t.toDateString() != today.toDateString()) {
        setToday(t);
    }

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.days+'/'+today.toISOString().split("T")[0])
    .fetch()
    .then(response => {
        setOpen((response.data[0].open) ? "Open" : "Closed");
    })
    .catch(error => {
        console.log(error);
        setOpen("Closed");
    })
    },[today]);

    return (
        <div className="opened-header">
            <h4>We are {open} today!</h4>
            <p>Park opens 8:00 AM and closes 8:00 PM every day.</p>
        </div>
    );
}

export default IsOpen;
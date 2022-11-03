import React from 'react';
import LargeAd from '../components/largeAd.js';
import mediumAd from '../components/mediumAd.js';
import {LeftSmallAd,RightSmallAd} from '../components/smallAd.js';
import {LeftMedAd,RightMedAd} from '../components/mediumAd.js';
import '../css/home.css';



const ticketreg = {
    title: "Purchase Single Tickets: $20",
    description: "Purchase tickets individually. Tickets include full 1-day access to all park amenities including rides, shows, and attractions.",
    link: "/tickets",
    buttonText: "Buy Single Tickets >"
}

const ticketgroup = {
    title: "Purchase Ticket Group Pack: 5 for $85",
    description: "Purchase group packs of tickets for a discounted price (5 pack)! Tickets include full 1-day access to all park amenities including rides, shows, and attractions.",
    link: "/map",
    buttonText: "Purchase Group Pack >"
}

function Tickets() {
    return (
        <div className='form-page'>
                <br /><br />
                <h1>Tickets Page</h1>
                <hr className="line-break" />
                <div className="medad-box">
                    <LeftMedAd value={ticketreg} />
                    <RightMedAd value={ticketgroup} />
                </div>
            </div>
    );
}
    

export default Tickets;

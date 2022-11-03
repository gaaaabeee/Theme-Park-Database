import React from 'react';
import LargeAd from '../components/largeAd.js';
import {LeftSmallAd,RightSmallAd} from '../components/smallAd.js';
import About from '../components/about.js';
import '../css/home.css';
import eventAdImg from '../images/homepage_event_ad.jpg';
import restaurantAdImg from '../images/homepage_restaurant_ad.jpg';
import rideAdImg from '../images/rideAdImg.jpg';

//home page

//info for each ad
const eventAd = {
    title: "Ongoing Halloween Event!",
    description: "During the month of October we are celebrating Halloween with many exclusive events and deals! Visit now to check out our special Spooky Skeleton Parade, our Pumpkin Carving Contest, and more!!",
    link: "/events",
    buttonText: "See All Events >",
    image: "url("+eventAdImg+")"
};
const restaurantAd = {
    title: "Restaurant Ad",
    description: "More about this restaurant",
    link: "/shops",
    buttonText: "See More Shops >",
    image: "url("+restaurantAdImg+")"
};

const rideAd = {
    title: "Ride Ad",
    description: "More about this ride",
    link: "/rides",
    buttonText: "See More Rides >",
    image: "url("+rideAdImg+")"
};

const ticketAd = {
    title: "Group Ticket Discount!!",
    description: "Get $15 off for every 5 tickets bought!",
    link: "/tickets",
    buttonText: "Buy Tickets Now >"
}

const mapAd = {
    title: "Plan Your Visit!",
    description: "Check out our map to see where our rides and shops are located!",
    link: "/map",
    buttonText: "See the Map >"
}

//says at top if amusement park is opened or closed today
function IsOpen() {
    return (<div className="opened-header">We are Opened/Closed today!</div>);
}

function Home() {
    return (
        <div>
            <IsOpen />
            <LargeAd value={eventAd} />
            <hr className="line-break" />
            <div className="smallad-box">
                <LeftSmallAd value={ticketAd} />
                <RightSmallAd value={mapAd} />
            </div>
            <hr className="line-break" />
            <LargeAd value={restaurantAd} />
            <hr className="line-break" />
            <LargeAd value={rideAd} />
            <hr className="line-break" />
            <About />
            <hr className="line-break" />
        </div>
    );
}

export default Home;

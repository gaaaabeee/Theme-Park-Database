import React from 'react';
import '../css/home.css';
import LargeAd from '../components/largeAd.js';
import {LeftSmallAd,RightSmallAd} from '../components/smallAd.js';
import About from '../components/about.js';
import IsOpen from '../components/isOpenBar.js';
import eventAdImg from '../images/homepage_event_ad.jpg';
import restaurantAdImg from '../images/homepage_restaurant_ad.jpg';
import rideAdImg from '../images/rideAdImg.jpg';
import {GiTicket,GiGalaxy,GiPorcupinefish} from 'react-icons/gi';
import {FaMap} from 'react-icons/fa';
import {BiGhost} from 'react-icons/bi';

//home page

//info for each ad
const eventAd = {
    title: "Ongoing Halloween Event!",
    description: "During the month of October we are celebrating Halloween with many exclusive events and deals! Visit now to check out our special Spooky Skeleton Parade, our Pumpkin Carving Contest, and more!!",
    link: "/events",
    buttonText: "See All Events >",
    image: "url("+eventAdImg+")",
    icon: <BiGhost/>
};
const restaurantAd = {
    title: "Serving sushi!",
    description: "During this month, Fancy Restaurant has brought in the best sushi chefs in the area to work at our restaurant! Many new items are on the menu just for this month even including a special pufferfish sashimi! Don't worry, it's perfectly safe.",
    link: "/shops",
    buttonText: "See More Shops >",
    image: "url("+restaurantAdImg+")",
    icon: <GiPorcupinefish/>
};

const rideAd = {
    title: "Homelander strikes again!",
    description: "Screams are heard across the world on our insane Homelander rollercoaster. It is one of the fastest roller coasters in the world and has become one of our most popular rides instantly! You are guaranteed to be in shock!",
    link: "/rides",
    buttonText: "See More Rides >",
    image: "url("+rideAdImg+")",
    icon: <GiGalaxy/>
};

const ticketAd = {
    title: "Group Ticket Discount!!",
    description: "Get $15 off for every 5 tickets bought for a limited time!",
    link: "/tickets",
    buttonText: "Buy Tickets Now >",
    icon: <GiTicket/>
}

const mapAd = {
    title: "Plan Your Visit!",
    description: "Check out our map to see where our rides and shops are located!",
    link: "/map",
    buttonText: "See the Map >",
    icon: <FaMap/>
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

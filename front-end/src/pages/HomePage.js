import React from 'react';
import LargeAd from '../components/largeAd.js';
import SmallAd from '../components/smallAd.js';
import '../css/home.css';
import eventAdImg from '../images/homepage_event_ad.jpg';
import restaurantAdImg from '../images/homepage_restaurant_ad.jpg';

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
            <LargeAd value={restaurantAd} />
            <hr className="line-break" />
        </div>
    );
}

export default Home;
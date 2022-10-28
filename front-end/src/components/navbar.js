import React from 'react';
import {Link} from 'react-router-dom';
import '../css/navbar.css';

function Navbar() {
    return (
        <div id='navbox'>
            <ul id='navbar'>
                <NavButton link="/" text="Home" />
                <NavButton link="/tickets" text="Buy Tickets" />
                <NavButton link="/rides" text="Rides" />
                <NavButton link="/shops" text="Shops and Restaurants" />
                <NavButton link="/events" text="Events" />
                <NavButton link="/map" text="Map" />
            </ul>
        </div>
    );
}

function NavButton(props) {
    return (
        <li style={{float:'left'}}>
            <Link id='navbutton' to={props.link}>{props.text}</Link>
        </li>
    );
}

export default Navbar;
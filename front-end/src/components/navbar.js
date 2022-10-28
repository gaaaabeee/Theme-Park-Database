import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import '../css/navbar.css';

//navigation bar at top of screen

//navigation container
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

//navigation button
function NavButton(props) {
    return (
        <li style={{float:'left'}}>
            <NavLink id='navbutton' to={props.link}>{props.text}</NavLink>
        </li>
    );
}

export default Navbar;
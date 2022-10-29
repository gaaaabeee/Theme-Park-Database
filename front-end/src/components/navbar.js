import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import '../css/navbar.css';

//navigation bar at top of screen

//navigation container
function Navbar() {
    return (
        <div id='navbox'>
            <ul id='navbar'>
                <NavButton link="/" text="Home" align="left"/>
                <NavButton link="/tickets" text="Buy Tickets" align="left"/>
                <NavButton link="/rides" text="Rides" align="left"/>
                <NavButton link="/shops" text="Shops and Restaurants" align="left"/>
                <NavButton link="/events" text="Events" align="left"/>
                <NavButton link="/map" text="Map" align="left"/>
                <NavButton link="/signup" text="Sign Up" align="right"/>
                <NavButton link="/login" text="Log In" align="right"/>
            </ul>
        </div>
    );
}

//navigation button
function NavButton(props) {
    const align = {float: props.align};
    return (
        <li style={align}>
            <NavLink id='navbutton' to={props.link}>{props.text}</NavLink>
        </li>
    );
}

export default Navbar;
import React from 'react';
import {Link} from 'react-router-dom';


const shadowColor = '#7A0707';

function Navbar() {
    const navbox = {
        backgroundColor: 'red',
        height: '60px',
        border: '1px solid ' + shadowColor
    };
    const navbarstyle = {
        listStyleType: 'none',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
    }
    return (
        <div style={navbox}>
            <ul style={navbarstyle}>
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
    const navbuttonstyle = {
        display: 'block',
        color: 'white',
        textAlign: 'center',
        padding: '10px 25px',
        textDecoration: 'none',
        fontSize: '24px',
        borderStyle: "none solid none none",
        borderWidth: '1px',
        borderColor: shadowColor,
        boxShadow: '1px 1px 3px 1px ' + shadowColor
    };
    return (
        <li style={{float:'left'}} className='navbutton'>
            <Link style={navbuttonstyle} to={props.link}>{props.text}</Link>
        </li>
    );
}

export default Navbar;
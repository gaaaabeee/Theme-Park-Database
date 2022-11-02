import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import '../css/navbar.css';
import useStateContext from '../hooks/useStateContext.js';

//navigation bar at top of screen

//navigation container
function Navbar() {
    const {context,setContext} = useStateContext();
    const [loginId, setLoginId] = useState(context.login_id);
    const [account, setAccount] = useState(context.account);

    let signupOrProfile, loginOrLogout;
    if (loginId) {
        signupOrProfile = <NavButton link="/profile" text="Profile" align="right" />;
        loginOrLogout = <NavButton link="/logout" text="Log Out" align="right" />;
    } else {
        signupOrProfile = <NavButton link="/signup" text="Sign Up" align="right"/>;
        loginOrLogout = <NavButton link="/login" text="Log In" align="right"/>;
    }
    if (account == "employee")
    {
        return (
            <div id='navbox'>
                <ul id='navbar'>
                    <NavButton link="/" text="Home" align="left"/>
                    <NavButton link="/employee" text="Reports" align="left"/>
                    {signupOrProfile}
                    {loginOrLogout}
                </ul>
            </div>
        );
    } else {
        return (
            <div id='navbox'>
                <ul id='navbar'>
                    <NavButton link="/" text="Home" align="left"/>
                    <NavButton link="/tickets" text="Buy Tickets" align="left"/>
                    <NavButton link="/rides" text="Rides" align="left"/>
                    <NavButton link="/shops" text="Shops and Restaurants" align="left"/>
                    <NavButton link="/events" text="Events" align="left"/>
                    <NavButton link="/map" text="Map" align="left"/>
                    {signupOrProfile}
                    {loginOrLogout}
                </ul>
            </div>
        );
    }
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
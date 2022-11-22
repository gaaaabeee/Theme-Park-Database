import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import '../css/navbar.css';
import useStateContext from '../hooks/useStateContext.js';
import {GiTicket,GiRoundStar} from 'react-icons/gi';
import {FaMap,FaHome,FaGlassMartiniAlt} from 'react-icons/fa';
import {TbRollercoaster} from 'react-icons/tb';
import {BsPersonCircle} from 'react-icons/bs';

//navigation bar at top of screen

//navigation container
function Navbar(props) {
    const {context, setContext} = useStateContext();
    const [account, setAccount] = useState(context.account);

    if (account == "employee")
    {
        return (
            <div id='navbox'>
                <ul id='navbar'>
                    <NavButton link="/employee" text="Employees" align="left"/>
                    <NavButton link="/customer" text="Customers" align="left"/>
                    <NavButton link="/attraction" text="Attractions" align="left"/>
                    <NavButton link="/breakdown" text="Breakdowns" align="left"/>
                    <NavButton link="/report/general" text="Reports" align="left"/>
                    <ProfNavButton login={props.login} />
                    <LogNavButton login={props.login} />
                </ul>
            </div>
        );
    } else {
        return (
            <div id='navbox'>
                <ul id='navbar'>
                    <NavButton link="/" text="Home" align="left" icon={<FaHome/>}/>
                    <NavButton link="/tickets" text="Buy Tickets" align="left" icon={<GiTicket/>}/>
                    <NavButton link="/rides" text="Rides" align="left" icon={<TbRollercoaster/>}/>
                    <NavButton link="/shops" text="Shops and Restaurants" align="left" icon={<FaGlassMartiniAlt/>}/>
                    <NavButton link="/events" text="Events" align="left" icon={<GiRoundStar/>}/>
                    <NavButton link="/map" text="Map" align="left" icon={<FaMap/>}/>
                    <ProfNavButton login={props.login} />
                    <LogNavButton login={props.login} />
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
            <NavLink className='navbutton' to={props.link}>{props.text} {props.icon}</NavLink>
        </li>
    );
}

//log in or log out
function LogNavButton(props) {
    const [loggedin, setLoggedin] = useState(props.login);
    if (loggedin) {
        return <NavButton link="/logout" text="Log Out" align="right" />;
    } else {
        return <NavButton link="/login" text="Log In" align="right"/>;
    }
}

//sign up or profile
function ProfNavButton(props) {
    const [loggedin, setLoggedin] = useState(props.login);
    if (loggedin) {
        return <NavButton link="/profile" text="Profile" align="right" icon={<BsPersonCircle/>}/>;
    } else {
        return <NavButton link="/signup" text="Sign Up" align="right"/>;
    }
}

export default Navbar;
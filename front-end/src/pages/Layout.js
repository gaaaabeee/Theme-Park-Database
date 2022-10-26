import React from 'react';
import {Outlet} from 'react-router-dom';
import Navbar from '../components/navbar.js';
import headerimg from '../images/headerimg.jpg';

function Layout() {
    return (
        <>
            <header>
                <TopHeader />
                <Navbar />
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <BottomFooter />
            </footer>
        </>
    );
}

function TopHeader() {
    const headerstyle = {
        border: '5px solid red',
        height: '180px',
        position: 'relative',
        textAlign: 'center'
    };
    const logostyle = {
        position:'absolute',
        top:'50%',
        left:'50%',
        transform:'translate(-50%,-50%)',
        color: 'white',
        fontSize: '70px',
        fontFamily: "Bungee Spice",
        textShadow: "8px 10px 0 black"
    };
    return (
        <div style={headerstyle}>
            <img src={headerimg} style={{width:'100%',height:'100%'}}></img>
            <div style={logostyle}>Amusement Park</div>
        </div>
    );
}

function BottomFooter() {
    const footerstyle = {
        backgroundColor: 'red',
        height: '200px'
    };
    return (
        <footer style={footerstyle}></footer>
    );
}

export default Layout;


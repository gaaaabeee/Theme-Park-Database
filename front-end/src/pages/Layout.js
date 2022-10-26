import React from 'react';
import {Outlet} from 'react-router-dom';
import Navbar from '../components/navbar.js';
import headerimg from '../images/headerimg.jpg';

function Layout() {
    return (
        <header>
            <TopHeader />
            <Navbar />
            <Outlet />
            <Footer />
        </header>
    );
}

function TopHeader() {
    const headerstyle = {
        border: '5px solid red',
        height: '150px'
    };
    return (
        <div style={headerstyle}>
            <img src={headerimg}></img>
        </div>
    );
}

function Footer() {
    const footerstyle = {
        backgroundColor: 'red',
        height: '200px'
    };
    return (
        <footer style={footerstyle}></footer>
    );
}

export default Layout;


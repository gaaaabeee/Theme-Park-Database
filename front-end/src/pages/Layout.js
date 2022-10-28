import React from 'react';
import {Outlet} from 'react-router-dom';
import Navbar from '../components/navbar.js';
import headerimg from '../images/headerimg.jpg';
import '../css/layout.css';

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
    return (
        <div id='topheader'>
            <img src={headerimg} style={{width:'100%',height:'100%'}} alt='header'></img>
            <div id='logo'>Amusement Park</div>
        </div>
    );
}

function BottomFooter() {
    return (
        <footer id='bottomfooter'></footer>
    );
}

export default Layout;


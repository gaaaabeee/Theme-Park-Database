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
            <div id='headerlogo'>Amusement Park</div>
        </div>
    );
}

function BottomFooter() {
    return (
        <footer id='bottomfooter'>
            <pre id='footertext'>
                <span id='footerlogo'>Amusement Park</span><br />
                123456 John Doe Ln, Houston, TX 77494<br />
                832-111-1111        amusementpark@gmail.com
            </pre>
            <p style={{position:'absolute',bottom:'0%',left:'1%'}}>Hi there! This website was made by Vuong Nguyen, Avery Lindseth, Chuong Tran, Gabe Gauthier, and Karen Beck.</p>
        </footer>
    );
}

export default Layout;


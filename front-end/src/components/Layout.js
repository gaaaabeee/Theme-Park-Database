import React from 'react';
import Navbar from './navbar.js';
import bottomimage from '../images/bottomimage.png';
import bgHeader from '../images/headerimg.jpg';
import header from '../images/header.png'; 
import '../css/layout.css';

//layout of every page, includes header, navbar, and footer

function TopHeader(props) {
    const bgImg = "url("+bgHeader+")";
    return (
        <header>
            <div id='topheader' style={{backgroundImage: bgImg}}>
                <img src={header} style={{width:'1200px',height:'170px'}} alt='header'></img>
        
            </div>
            <Navbar login={props.login}/>
        </header>
    );
}

function BottomFooter() {
    return (
        <footer id='bottomfooter'>
            <div id='footerimage'>
                <img src={bottomimage} style={{ width:'100%',height:'100%'}} alt='bottom'></img>
            </div>
            <br />
            <pre id='footertext' >
            <span id='footerlogo'>HELLO WORLD</span><br />
                123456 John Doe Ln, Houston, TX 77494<br />
                832-111-1111 | HelloWorldPark@gmail.com
            </pre>
            
            <br/>
            <p style={{position:'absolute',bottom:'0%',left:'25%'}}>Hi there! This website was made by Vuong Nguyen, Avery Lindseth, Chuong Tran, Gabe Gauthier, and Karen Beck.</p>
        </footer>
    );
}

export {TopHeader,BottomFooter};


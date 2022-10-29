import React, {useState} from 'react';
//import ReactDOM from 'react-dom/client';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import {TopHeader,BottomFooter} from './pages/Layout.js';
import Home from './pages/HomePage.js';
import Tickets from './pages/TicketPage.js';
import Rides from './pages/RidePage.js';
import Shops from './pages/ShopsPage.js';
import Events from './pages/EventsPage.js';
import Map from './pages/MapPage.js';
import Login from './pages/LoginPage.js';
import Signup from './pages/SignUpPage.js';
import Profile from './pages/ProfilePage.js';
import Employee from './pages/EmployeePage.js';

function App() {
    return (
        <BrowserRouter>
            <TopHeader />
            <Routes>
                <Route index path='/' element={<Home />}></Route>
                <Route path='/tickets' element={<Tickets />}></Route>
                <Route path='/rides' element={<Rides />}></Route>
                <Route path='/shops' element={<Shops />}></Route>
                <Route path='/events' element={<Events />}></Route>
                <Route path='/map' element={<Map />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/signup' element={<Signup />}></Route>
            </Routes>
            <BottomFooter />
        </BrowserRouter>
    )
}

export default App;
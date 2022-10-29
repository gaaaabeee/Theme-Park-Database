import React, {useState} from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import useStateContext from './hooks/useStateContext.js';
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
import Logout from './pages/LogoutPage.js';
import Employee from './pages/EmployeePage.js';

function App() {
    const {context,setContext} = useStateContext();

    let loginOrProfile, signupOrLogout;
    if (context.customer_id != 0)
    {
        loginOrProfile = (<Route path='/profile' element={<Profile />}></Route>);
        signupOrLogout = (<Route path='/logout' element={<Logout />}></Route>);
    }
    else {
        
        loginOrProfile = (<Route path='/login' element={<Login />}></Route>);
        signupOrLogout = (<Route path='/signup' element={<Signup />}></Route>);
    }

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
import React from 'react';
//import ReactDOM from 'react-dom/client';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Layout from './pages/Layout.js';
import Home from './pages/HomePage.js';
import Tickets from './pages/TicketPage.js';
import Rides from './pages/RidePage.js';
import Shops from './pages/ShopsPage.js';
import Events from './pages/EventsPage.js';
import Map from './pages/MapPage.js';
import './index.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />}></Route>
                    <Route path='/tickets' element={<Tickets />}></Route>
                    <Route path='/rides' element={<Rides />}></Route>
                    <Route path='/shops' element={<Shops />}></Route>
                    <Route path='/events' element={<Events />}></Route>
                    <Route path='/map' element={<Map />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
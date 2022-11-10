import {Routes,Route} from "react-router-dom";
import Home from '../customerPages/HomePage.js';
import Tickets from '../customerPages/TicketPage.js';
import Rides from '../customerPages/RidePage.js';
import Shops from '../customerPages/ShopsPage.js';
import Events from '../customerPages/EventsPage.js';
import Map from '../customerPages/MapPage.js';
import Login from '../customerPages/LoginPage.js';
import Signup from '../customerPages/SignUpPage.js';
import Profile from '../customerPages/ProfilePage.js';
import Logout from '../customerPages/LogoutPage.js';
import Employee from '../employeePages/EmployeePage.js';
import EmployeeLogIn from '../employeePages/EmployeeLogIn.js';
import SignClear from '../customerPages/SignClearPage.js';
import Customer from '../employeePages/CustomerPage.js';
import Ride2 from '../employeePages/RidesPage.js';
import Stats from '../employeePages/RidesPage.js';

function WebRoutes() {
    return (
        <Routes>
            <Route index path='/' element={<Home />}></Route>
            <Route path='/tickets' element={<Tickets />}></Route>
            <Route path='/rides' element={<Rides />}></Route>
            <Route path='/shops' element={<Shops />}></Route>
            <Route path='/events' element={<Events />}></Route>
            <Route path='/map' element={<Map />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/logout' element={<Logout />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/employeelogin' element={<EmployeeLogIn />}></Route>
            <Route path='/signclear' element={<SignClear />}></Route>
            <Route path='/profile' element={<Profile />}></Route>
            <Route path='/employee' element={<Employee />}></Route>
            <Route path='/customer' element={<Customer />}></Route>
            <Route path='/rides2' element={<Ride2 />}></Route>
            <Route path='/stats' element={<Stats />}></Route>
        </Routes>
    );
}

export default WebRoutes;
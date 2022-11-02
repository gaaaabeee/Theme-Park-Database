import {Routes,Route} from "react-router-dom";
import Home from '../pages/HomePage.js';
import Tickets from '../pages/TicketPage.js';
import Rides from '../pages/RidePage.js';
import Shops from '../pages/ShopsPage.js';
import Events from '../pages/EventsPage.js';
import Map from '../pages/MapPage.js';
import Login from '../pages/LoginPage.js';
import Signup from '../pages/SignUpPage.js';
import Profile from '../pages/ProfilePage.js';
import Logout from '../pages/LogoutPage.js';
import Employee from '../pages/EmployeePage.js';
import EmployeeLogIn from '../pages/EmployeeLogIn.js';
import SignClear from '../pages/SignClearPage.js';
import EmployeeSearch from '../pages/FindEmployeesPage.js';

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
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/employeelogin' element={<EmployeeLogIn />}></Route>
            <Route path='/signclear' element={<SignClear />}></Route>
            <Route path='/profile' element={<Profile />}></Route>
            <Route path='/employee' element={<Employee />}></Route>
            
        </Routes>
    );
}

export default WebRoutes;
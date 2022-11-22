import { Route, Routes } from "react-router-dom";
import StatsOverall from '../employeePages/statsOverall.js';
import StatsTimePeriod from "../employeePages/statsTimePeriod.js";
import StatsMonthly from '../employeePages/statsMonthly.js';
import StatsDaily from '../employeePages/statsDaily.js';
import AttractionPastMonth from '../employeePages/attractionPastMonth';
import StatsLastOpen from "../employeePages/statsYesterday.js";

function ReportWebRoutes() {
    return (
        <Routes>
            <Route index path='/general' element={<StatsOverall/>}></Route>
            <Route path='/time_period_reports' element={<StatsTimePeriod/>}></Route>
            <Route path='/monthly_reports' element={<StatsMonthly/>}></Route>
            <Route path='/daily_reports' element={<StatsDaily/>}></Route>
            <Route path='/last_open_report' element={<StatsLastOpen/>}></Route>
            <Route path='/attractions_past_month' element={<AttractionPastMonth/>}></Route>
        </Routes>
    );
}

export default ReportWebRoutes;
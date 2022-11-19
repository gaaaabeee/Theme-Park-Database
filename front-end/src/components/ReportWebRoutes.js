import { Route, Routes } from "react-router-dom";
import StatsOverall from '../employeePages/statsOverall.js';
import StatsTimePeriod from "../employeePages/statsTimePeriod.js";
import StatsMonthly from '../employeePages/statsMonthly.js';
import StatsDaily from '../employeePages/statsDaily.js';
import StatsToday from '../employeePages/statsToday.js';
import AttractionPastMonth from '../employeePages/attractionPastMonth';

function ReportWebRoutes() {
    return (
        <Routes>
            <Route index path='/general' element={<StatsOverall/>}></Route>
            <Route path='/time_period_reports' element={<StatsTimePeriod/>}></Route>
            <Route path='/monthly_reports' element={<StatsMonthly/>}></Route>
            <Route path='/daily_reports' element={<StatsDaily/>}></Route>
            <Route path='/todays_report' element={<StatsToday/>}></Route>
            <Route path='/attractions_past_month' element={<AttractionPastMonth/>}></Route>
        </Routes>
    );
}

export default ReportWebRoutes;
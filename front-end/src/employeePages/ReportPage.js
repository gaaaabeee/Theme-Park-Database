import React, {useEffect} from 'react';
import '../css/reporttable.css';
import '../css/report.css';
import {useNavigate} from "react-router-dom";
import ReportNavbar from '../components/reportNavbar';
import ReportWebRoutes from '../components/ReportWebRoutes';

function Report() {
    const navigate = useNavigate();
   
    useEffect(() => {
        navigate('/report/general');
    },[]);

    return (
        <div className="report-page">
            <div className='left-side'>
                <ReportNavbar/>
            </div>
            <div className="report-box">
                <ReportWebRoutes/>
            </div>
        </div>
    );
}

export default Report;
import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import '../css/navbar.css';

function ReportNavbar() {
    return (
        <div id="vnavbox">
            <ul id="vnavbar">
                <ReportNavButton link="/report/general" text="General"/>
                <ReportNavButton link="/report/monthly_reports" text="Monthly Reports"/>
                <ReportNavButton link="/report/daily_reports" text="Daily Reports"/>
                <ReportNavButton link="/report/todays_report" text="Today's Report"/>
                <ReportNavButton link="/report/attractions_past_month" text="Attraction Popularity"/>
            </ul>
        </div>
    );
}

function ReportNavButton(props) {
    return (
        <li>
            <NavLink className="vnavbutton" to={props.link}>{props.text}</NavLink>
        </li>
    );
}

export default ReportNavbar;
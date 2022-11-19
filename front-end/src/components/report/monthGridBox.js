import React from 'react';

function MonthValueBox(props) {
    return (
        <div className="small-value-box month-report-grid-item">
            <div className="small-value-box-label">{props.label}</div>
            <div className="small-value-box-value"><b>{props.value}</b></div>
        </div>
    );
}

function MonthChartBox(props) {
    return (
        <div className="month-report-grid-chart month-report-grid-item">

        </div>
    );
}

export {MonthValueBox,MonthChartBox};
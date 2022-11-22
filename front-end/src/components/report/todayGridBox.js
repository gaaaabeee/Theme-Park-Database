import React from 'react';

function TodayValueBox(props) {
    return (
        <div className="med-value-box today-report-grid-item">
            <div className="med-value-box-label">{props.label}</div>
            <div className="med-value-box-value"><b>{props.value}</b></div>
        </div>
    );
}

export {TodayValueBox};
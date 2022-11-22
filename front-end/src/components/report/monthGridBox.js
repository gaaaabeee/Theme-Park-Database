import React from 'react';
import {Line} from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip} from 'chart.js';

function MonthValueBox(props) {
    return (
        <div className="small-value-box month-report-grid-item">
            <div className="small-value-box-label">{props.label}</div>
            <div className="small-value-box-value"><b>{props.value}</b></div>
        </div>
    );
}

function MonthChartBox(props) {
    ChartJS.register(CategoryScale,LinearScale,LineElement,PointElement,Title,Tooltip);

    const chartOptions = {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: props.titles.xTitle,
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 20,
                    }
                }
            },
            y: {
                title: {
                    display: true,
                    text: props.titles.yTitle
                }
            }
        },
        plugins: {
            title: {
                display: true,
                text: props.titles.title,
                font: {
                    size: 20
                }
            },
        },
    };

    const chartData = {
        labels: props.data.labels,
        datasets: [
            {
                data: props.data.values,
                borderColor: '#FF0000',
                backgroundColor: '#FF0000'
            }
        ]
    };

    return (
        <div className="month-report-grid-chart month-report-grid-item">
            <Line options={chartOptions} data={chartData}/>
        </div>
    );
}

export {MonthValueBox,MonthChartBox};
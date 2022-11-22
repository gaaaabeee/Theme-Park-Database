import React, {useState,useEffect} from 'react';
import { createAPIEndpoint,ENDPOINTS } from '../../api';
import {Bar} from 'react-chartjs-2';
import {Chart as ChartJS,BarController,BarElement,CategoryScale,LinearScale,Title,Tooltip} from 'chart.js';

function YearCharts() {
    ChartJS.register(BarController,BarElement,CategoryScale,LinearScale,Title,Tooltip);
    const todaysYear = new Date().getFullYear();
    const [year,setYear] = useState(todaysYear);
    const [entryChart,setEntryChart] = useState({labels:[],values:[]});
    const [revenueChart,setRevenueChart] = useState({labels:[],values:[]});
    const [breakdownChart,setBreakdownChart] = useState({labels:[],values:[]});
    const [rainChart,setRainChart] = useState({labels:[],values:[]});
    const entryChartTitles = {
        title: "Entries Each Month",
        xTitle: "Month",
        yTitle: "Entries",
        color: 265
    }

    const revChartTitles = {
        title: "Revenue Each Month",
        xTitle: "Month",
        yTitle: "Revenue ($)",
        color: 132
    }

    const breakdownChartTitles = {
        title: "New Breakdowns Each Month",
        xTitle: "Month",
        yTitle: "Entries",
        color: 16
    }

    const rainChartTitles = {
        title: "Rainy Days Each Month",
        xTitle: "Month",
        yTitle: "Revenue ($)",
        color: 190
    }

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.yearly+year)
        .fetch()
        .then(response => {
            const months = response.data.map((item) => {return item.month});
            setEntryChart({labels:months,values:response.data.map((item) => {return item.entries})});
            setRevenueChart({labels:months,values:response.data.map((item) => {return item.revenue})});
            setBreakdownChart({labels:months,values:response.data.map((item) => {return item.breakdowns})});
            setRainChart({labels:months,values:response.data.map((item) => {return item.rainouts})});
        })
        .catch(error => console.log(error))
    },[]);

    return (
        <div className="year-report-grid">
            <YearChart data={entryChart} titles={entryChartTitles}/>
            <YearChart data={revenueChart} titles={revChartTitles}/>
            <YearChart data={breakdownChart} titles={breakdownChartTitles}/>
            <YearChart data={rainChart} titles={rainChartTitles}/>
        </div>
    );
}

function YearChart(props) {
    const chartOptions = {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: props.titles.xTitle
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
        datasets: [{
            data: props.data.values,
            borderColor: function(context) {
                const index = context.dataIndex;
                const hue = props.titles.color;
                const saturation = 100 - index*3;
                const lightness = 40 + index*2;
                return "hsl("+hue+','+saturation+'%,'+lightness+'%)';
            },
            backgroundColor: function(context) {
                const index = context.dataIndex;
                const hue = props.titles.color;
                const saturation = 100 - index*3;
                const lightness = 40 + index*2;
                return "hsla("+hue+','+saturation+'%,'+lightness+'%,0.7)';
            },
            borderWidth: 2,
        }]
    };

    return (
        <div className="year-report-grid-chart">
            <Bar options={chartOptions} data={chartData}/>
        </div>
    );
}

export default YearCharts;
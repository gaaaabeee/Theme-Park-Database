import React, {useState,useEffect} from 'react';
import { createAPIEndpoint,ENDPOINTS } from '../../api';
import {Line} from 'react-chartjs-2';
import {Chart as ChartJS,LineController,LineElement,PointElement,CategoryScale,LinearScale,Title,Tooltip} from 'chart.js';

function GeneralCharts() {
    ChartJS.register(LineController,LineElement,PointElement,CategoryScale,LinearScale,Title,Tooltip);
    const [entry7D,setEntry7D] = useState({labels:[],values:[]});
    const [entry30D,setEntry30D] = useState({labels:[],values:[]});
    const [entry6M,setEntry6M] = useState({labels:[],values:[]});
    const [rev7D,setRev7D] = useState({labels:[],values:[]});
    const [rev30D,setRev30D] = useState({labels:[],values:[]});
    const [rev6M,setRev6M] = useState({labels:[],values:[]});
    const [br7D,setBr7D] = useState({labels:[],values:[]});
    const [br30D,setBr30D] = useState({labels:[],values:[]});
    const [br6M,setBr6M] = useState({labels:[],values:[]});

    const entry7DTitles = {
        title: "Entries Past 7 Days",
        xTitle: "Date",
        yTitle: "Entries",
        color: "#0445B0"
    };

    const entry30DTitles = {
        title: "Entries Past 30 Days",
        xTitle: "Date",
        yTitle: "Entries",
        color: "#0445B0"
    };

    const entry6MTitles = {
        title: "Entries Past 6 Months",
        xTitle: "Date",
        yTitle: "Entries",
        color: "#0445B0"
    };

    const rev7DTitles = {
        title: "Revenue Past 7 Days",
        xTitle: "Date",
        yTitle: "Revenue ($)",
        color: "#018135"
    };

    const rev30DTitles = {
        title: "Revenue Past 30 Days",
        xTitle: "Date",
        yTitle: "Revenue ($)",
        color: "#018135"
    };

    const rev6MTitles = {
        title: "Revenue Past 6 Months",
        xTitle: "Date",
        yTitle: "Revenue ($)",
        color: "#018135"
    };

    const br7DTitles = {
        title: "New Breakdowns Past 7 Days",
        xTitle: "Date",
        yTitle: "Breakdowns",
        color: "#CD0303"
    };

    const br30DTitles = {
        title: "New Breakdowns Past 30 Days",
        xTitle: "Date",
        yTitle: "Breakdowns",
        color: "#CD0303"
    };

    const br6MTitles = {
        title: "New Breakdowns Past 6 Months",
        xTitle: "Date",
        yTitle: "Breakdowns",
        color: "#CD0303"
    };

    useEffect(() => {
        const today = new Date();
        const day7 = new Date();
        day7.setDate(day7.getDate() - 7);
        const day30 = new Date();
        day30.setDate(day30.getDate() - 30);
        const month6 = new Date();
        month6.setMonth(month6.getMonth()-6);

        createAPIEndpoint(ENDPOINTS.days+'/'+day7.toISOString().split("T")[0]+'/'+today.toISOString().split("T")[0])
        .fetch()
        .then(response => {
            const labels = response.data.map((item) => {return item.date.split("T")[0]});
            setEntry7D({labels: labels,values:response.data.map((item) => {return item.entries})});
            setRev7D({labels: labels,values:response.data.map((item) => {return item.revenue})});
            setBr7D({labels: labels,values:response.data.map((item) => {return item.new_breakdowns})});
        })
        .catch(error => console.log(error));

        createAPIEndpoint(ENDPOINTS.days+'/'+day30.toISOString().split("T")[0]+'/'+today.toISOString().split("T")[0])
        .fetch()
        .then(response => {
            const labels = response.data.map((item) => {return item.date.split("T")[0]});
            setEntry30D({labels: labels,values:response.data.map((item) => {return item.entries})});
            setRev30D({labels: labels,values:response.data.map((item) => {return item.revenue})});
            setBr30D({labels: labels,values:response.data.map((item) => {return item.new_breakdowns})});
        })
        .catch(error => console.log(error));

        createAPIEndpoint(ENDPOINTS.days+'/'+month6.toISOString().split("T")[0]+'/'+today.toISOString().split("T")[0])
        .fetch()
        .then(response => {
            const labels = response.data.map((item) => {return item.date.split("T")[0]});
            setEntry6M({labels: labels,values:response.data.map((item) => {return item.entries})});
            setRev6M({labels: labels,values:response.data.map((item) => {return item.revenue})});
            setBr6M({labels: labels,values:response.data.map((item) => {return item.new_breakdowns})});
        })
        .catch(error => console.log(error));
    },[]);

    return (
        <div className="general-report-grid">
            <GenChart data={entry7D} titles={entry7DTitles}/>
            <GenChart data={rev7D} titles={rev7DTitles}/>
            <GenChart data={br7D} titles={br7DTitles}/>
            <GenChart data={entry30D} titles={entry30DTitles}/>
            <GenChart data={rev30D} titles={rev30DTitles}/>
            <GenChart data={br30D} titles={br30DTitles}/>
            <GenChartLarge data={entry6M} titles={entry6MTitles}/>
            <GenChartLarge data={rev6M} titles={rev6MTitles}/>
            <GenChartLarge data={br6M} titles={br6MTitles}/>
        </div>
    );
}

function GenChart(props) {
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
        datasets: [
            {
                data: props.data.values,
                borderColor: props.titles.color,
                backgroundColor: props.titles.color
            }
        ]
    };

    return (
        <div className="general-report-grid-chart">
            <Line options={chartOptions} data={chartData}/>
        </div>
    );
}

function GenChartLarge(props) {
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
        datasets: [
            {
                data: props.data.values,
                borderColor: props.titles.color,
                backgroundColor: props.titles.color
            }
        ]
    };

    return (
        <div className="general-report-grid-chart-large">
            <Line options={chartOptions} data={chartData}/>
        </div>
    );
}

export default GeneralCharts;
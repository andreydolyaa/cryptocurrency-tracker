

import React, { useEffect, useRef, useState } from 'react';
import { cryptoService } from '../../services/cryptoService';
// import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Charts.scss';
import loading from '../../assets/icons/loading.gif';
import { Line } from 'react-chartjs-2';



export default function Charts(props) {
    const daysRef = useRef();
    const [history, setHistory] = useState(null);
    const [days, setDays] = useState(30);
    

    useEffect(() => {
        const fetchData = async () => {
            var history = await cryptoService.historicalData(props.match.params.id, days);
            setHistory(history);
        }
        fetchData();
    }, [days])



    const handleHistoryDays = () => {
        setDays(+daysRef.current.value);
    }


    const getChartData = () => {
        if (history.prices) {
            var options = {
                labels: history.prices.map(day => new Intl.DateTimeFormat('en-GB').format(day[0])),
                datasets: [{
                    label: 'Price',
                    lineTension: 1,
                    borderWidth: 1,
                    fill: true,
                    backgroundColor: 'rgba(100,181,246,0.5)',
                    borderColor: '#0068FF',
                    borderCapStyle: 'butt',
                    borderDash: [0],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: '#003AFF',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 5,
                    pointRadius: 2,
                    pointHitRadius: 1,
                    // maintainAspectRatio:false,
                    // responsive:true,
                    data: history.prices.map(day => day[1].toFixed(4)),
                }]
            }
        }
        return options;
    }


    if (!history) return <div className="loading"><p>Loading...</p><img src={loading} /></div>
    else return (
        <div className="chart">
            <div className="intro">
                <h2 className="title">{props.match.params.id}'s Price chart</h2>
                <select name="days" onChange={handleHistoryDays} ref={daysRef}>
                    <option className="option" value="30">30d</option>
                    <option className="option" value="90">90d</option>
                    <option className="option" value="365">1y</option>
                    <option className="option" value="1095">3yrs</option>
                    <option className="option" value="2800">All</option>
                </select>
            </div>



            <div className="tes">
                <Line data={getChartData}  width={900} height={650} />
            </div>

        </div>
    )
}


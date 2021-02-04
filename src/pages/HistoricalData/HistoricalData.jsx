

import React, { useEffect, useState } from 'react';
import { cryptoService } from '../../services/cryptoService';
import './HistoricalData.scss';
import loading from '../../assets/icons/loading.gif';



export default function HistoricalData(props) {
    const [history, setHistory] = useState();
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    useEffect(() => {
        const fetchData = async () => {
            var history = await cryptoService.historicalData(props.match.params.id, 100);
            setHistory(history);
        }
        fetchData();
    }, [])

    if(!history) return <div className="loading"><p>Loading...</p><img src={loading}/></div>
    else return (
        <div className="hd">
        <div className="historical-data">
            <h1 className="title">Historical Data For {props.match.params.id}</h1>
            <table className="history-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Highest Price(24h)</th>
                        <th>Market Cap</th>
                        <th>Volume</th>
                    </tr>
                </thead>
                {history &&
                    <tbody>
                        <tr>
                            <td>
                                {history.prices.map((day, idx) => <div key={day[0]}>{idx + 1}</div>)}
                            </td>
                            <td>
                                {history.prices.map(day => <div key={day[0]}>{new Intl.DateTimeFormat('en-GB').format(day[0])}</div>)}
                            </td>
                            <td>
                                {history.prices.map(day => <div key={day[0]}>{formatter.format(day[1])}</div>)}
                            </td>
                            <td>
                                {history.market_caps.map(day => <div key={day[0]}>{formatter.format(day[1])}</div>)}
                            </td>
                            <td>
                                {history.total_volumes.map(day => <div key={day[0]}>{formatter.format(day[1])}</div>)}
                            </td>
                        </tr>
                    </tbody>}
            </table>
        </div>
        </div>
    )
}

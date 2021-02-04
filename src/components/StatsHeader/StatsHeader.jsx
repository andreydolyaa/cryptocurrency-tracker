


import React, { useState } from 'react';
import './StatsHeader.scss';
import { MoonIcon } from '@primer/octicons-react';
import { useEffect } from 'react';
import { cryptoService } from '../../services/cryptoService';

export default function StatsHeader() {
    const [currenciesData, setCurrencies] = useState();
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    useEffect(() => {
        const fetchData = async () => {
            var currenciesNum = await cryptoService.globalStats();
            setCurrencies(currenciesNum);
        }
        fetchData();
    }, [])

 

    function formatNum(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return (
        <div className="stats-header-main">

            <div className="stats-header">
                {currenciesData &&
                    <div className="stats">
                        <p>Cryptocurrencies: <span>{formatNum(currenciesData.data.active_cryptocurrencies)}</span></p>
                        <p>Markets: <span>{formatNum(currenciesData.data.markets)}</span></p>
                        <p>Market Cap: <span>
                            {formatter.format(currenciesData.data.total_market_cap.usd)}
                        </span></p>
                        <p>24h Vol: <span>{formatter.format(currenciesData.data.total_volume.usd)}</span></p>
                        <p>BTC Dominance: <span>{currenciesData.data.market_cap_percentage.btc.toFixed(2)}%</span></p>
                    </div>
                }


                
            </div>

        </div>
    )
}

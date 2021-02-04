

import React from 'react';
import './Sidebar.scss';
import { useEffect } from 'react';

export default function Sidebar({ currencyData, priceData ,match}) {



    useEffect(() => {
        console.log(currencyData);
        console.log(priceData);
    }, [])


    return (
        <div className="sidebar">




            {currencyData && priceData &&
                <div className="inner">
                    <h2>{currencyData.symbol.toUpperCase()} Price Statistics</h2>

                    <div className="div">
                        <span>{currencyData.name} Price</span>
                        <p>${priceData[match.params.id].usd.toLocaleString()}</p>
                    </div>
                    <div className="change div">
                        <span>Price Change 24h</span>
                        <div className="change-items">
                            <p>${currencyData.market_data.price_change_24h.toLocaleString()}</p>
                            <p style={{ color: priceData[match.params.id].usd_24h_change < 0 ? '#FF4343' : '#00BD1F' }}>
                            {priceData[match.params.id].usd_24h_change.toFixed(2)}%</p>
                        </div>
                    </div>
                    <div className="div">
                        <span>24h Low / 24h High</span>
                        <p>${currencyData.market_data.low_24h.usd.toLocaleString()} / ${currencyData.market_data.high_24h.usd.toLocaleString()}</p>
                    </div>
                    <div className="div">
                        <span>Trading Volume 24h</span>
                        <p>${priceData[match.params.id].usd_24h_vol.toLocaleString()}</p>
                    </div>
                    <div className="div">
                        <span>Market Rank</span>
                        <p>#{currencyData.market_cap_rank}</p>
                    </div>

                    <div className="cap div">
                        <span>Market Cap</span>
                        <div className="cap-items">
                            <p>${currencyData.market_data.market_cap.usd.toLocaleString()}</p>
                            <p style={{ color: currencyData.market_data.market_cap_change_percentage_24h_in_currency.usd < 0 ? '#FF4343' : '#00BD1F' }}>
                            {currencyData.market_data.market_cap_change_percentage_24h_in_currency.usd.toFixed(2)}%</p>
                        </div>
                    </div>


                </div>
            }





        </div>
    )
}

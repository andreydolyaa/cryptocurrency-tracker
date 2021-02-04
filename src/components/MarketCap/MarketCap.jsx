

import React, { useState } from 'react';
import './MarketCap.scss';
import loading from '../../assets/icons/loading.gif';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { cryptoService } from '../../services/cryptoService';
// { price, match, currency }

export default function MarketCap(props) {
    const history = useHistory();
    const [price, setPrice] = useState();
    const [currency, setCurrency] = useState();

    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    function formatNum(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    useEffect(() => {
        const fetchData = async () => {
            const currencyData = await cryptoService.loadCurrency(props.match.params.id);
            const priceData = await cryptoService.loadCurrencyVsSupported(props.match.params.id, 'USD');
            setPrice(priceData);
            setCurrency(currencyData);
        }
        fetchData();
    }, [])

    if (!props.match.params.id) return <div className="loading"><p>Loading...</p><img src={loading} /></div>
    return (
        <div className="market-cap">
            {price && currency && props.match.params.id &&
                <div className="inner">

                    <div className="card">
                        <div className="badger">
                            <p className="title-info">Price Change </p>
                            <p className="semi-badge">24h</p>
                        </div>
                        <p className="reg">Current :{formatter.format(currency.market_data.current_price.usd)}</p>
                        <p className="reg-1" style={{ color: currency.market_data.price_change_24h < 0 ? '#FF4343' : '#00BD1F' }}>
                            {formatter.format(currency.market_data.price_change_24h)}
                        </p>
                    </div>


                    
                    <div className="card">
                        <p className="title-info">Market Cap</p>
                        <p className="reg">{formatter.format(price[props.match.params.id].usd_market_cap)}</p>
                        <p className="reg-1" style={{ color: price[props.match.params.id].usd_24h_change < 0 ? '#FF4343' : '#00BD1F' }}>
                            {price[props.match.params.id].usd_24h_change.toFixed(2)}%
                        </p>
                    </div>


                    <div className="card">
                        <p className="title-info">Circulating Supply</p>
                        <p className="reg">{currency.market_data.circulating_supply.toLocaleString()} {currency.symbol.toUpperCase()}</p>
                        {currency.market_data.max_supply !== null &&
                            <p className="reg" className="title-info-sec">
                                Max Supply {formatNum(currency.market_data.max_supply)} {currency.symbol.toUpperCase()}
                            </p>
                        }
                        {currency.market_data.max_supply === null &&
                            <p className="reg" className="title-info-sec">Max Supply ---</p>
                        }
                    </div>


                    <div className="card">
                        <div className="badger">
                            <p className="title-info">Volume</p>
                            <p className="semi-badge">24h</p>
                        </div>
                        <p className="reg">{formatter.format(price[props.match.params.id].usd_24h_vol)}</p>
                        <p className="reg-1" style={{ color: currency.market_data.price_change_24h < 0 ? '#FF4343' : '#00BD1F' }}>{currency.market_data.price_change_percentage_24h.toFixed(2)}%</p>
                    </div>


                </div>
            }
        </div>
    )
}


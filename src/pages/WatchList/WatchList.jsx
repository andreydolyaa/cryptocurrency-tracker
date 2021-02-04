

import React, { useEffect } from 'react';
import './WatchList.scss';
import { useState } from 'react';
import { cryptoService } from '../../services/cryptoService';
import Badge from '../../components/Badge/Badge';
import { TrashcanIcon, EyeIcon } from '@primer/octicons-react';
import { localStorageService } from '../../services/localStorageService';
import loading from '../../assets/icons/loading.gif';

export default function WatchList() {
    const [currencies, setCurrencies] = useState();
    var [remove, setDelete] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const currencyData = await cryptoService.loadWatchList();
            setCurrencies(currencyData);
        }
        console.log(currencies);
        fetchData();
    }, [remove])


    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });


    const removeFromWatchList = (name) => {
        var watchList = localStorageService.load('watchList');
        var idx = watchList.findIndex(coin => coin === name);
        watchList.splice(idx, 1);
        localStorageService.save('watchList', watchList);
        setDelete(remove = !remove);
    }

    if (!currencies || currencies.length === 0) return <div className="loading"><p>Loading...</p><img src={loading} /></div>
    else return (
        <div className="watch-list">
            <h2>Watch List</h2>
            {currencies &&
                <div className="inner">
                    {currencies.map(currency => {
                        return (
                            <div key={currency.id} className="watchlist-item">
                                <div className="remove" onClick={() => removeFromWatchList(currency.name)}><TrashcanIcon size={16} /></div>
                                <div className="img-title">
                                    <img src={currency.image} />
                                    <p>{currency.name}</p>
                                    <p className="symbol">{currency.symbol.toUpperCase()}</p>
                                </div>
                                <div className="price-div">
                                    <p className="price">{formatter.format(currency.current_price)}</p>
                                    <div className="badge-perc">
                                        <p style={{ color: currency.price_change_percentage_24h < 0 ? '#FF4343' : '#00BD1F' }}>
                                            {currency.price_change_percentage_24h.toFixed(2)}%</p>
                                        <Badge name={"24h"} bgc={"#000000"} color={"#fff"} className="badge" />
                                    </div>
                                </div>
                                <p >Price Change 24h: <span style={{ color: currency.price_change_percentage_24h < 0 ? '#FF4343' : '#00BD1F' }}>
                                    {formatter.format(currency.price_change_24h)}</span></p>
                                <p>Market Cap: {formatter.format(currency.market_cap)}</p>
                                <p>Volume: {formatter.format(currency.total_volume)}</p>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}

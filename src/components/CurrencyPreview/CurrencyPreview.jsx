


import React from 'react';
import './CurrencyPreview.scss';
import { Sparklines, SparklinesLine, SparklinesSpots, SparklinesBars } from 'react-sparklines';
import { StarIcon, StarFillIcon } from '@primer/octicons-react';
import { useHistory } from 'react-router-dom';
import { localStorageService } from './../../services/localStorageService';
import { useEffect } from 'react';
import { useState } from 'react';



export default function CurrencyPreview({ currency,changeView }) {
    const STORAGE_KEY = 'watchList';
    const history = useHistory();
    const [storageData, setStorageData] = useState([]);
    var [update, setUpdate] = useState(false);
    var [view,setView] = useState(false);

    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    useEffect(() => {
        console.log(changeView);
        setStorageData(localStorageService.load(STORAGE_KEY));
    }, [update])


    const toCurrencyDetails = (currencyName) => {
        var currency = '';
        if (currencyName === 'XRP') currency = 'ripple';
        else if (currencyName === 'Binance Coin') currency = 'binancecoin'
        else currency = currencyName;
        if (currency.indexOf(' ') === -1) {
            history.push({
                pathname: `/currency/${currency.toLowerCase()}`,
                state: { currency }
            });
        }
        else {
            var formattedName = currency.replace(/\s/g, "-");
            history.push({
                pathname: `/currency/${formattedName.toLowerCase()}`,
                state: { currency }
            });
        }
    }

    const addToWatchList = (currency, ev) => {
        setUpdate(update = !update);
        ev.stopPropagation();
        var data = localStorageService.load(STORAGE_KEY);
        if (!data) {
            data = []
            data.push(currency);
            localStorageService.save(STORAGE_KEY, data);
        }
        else {
            if (data.includes(currency)) {
                var idx = data.findIndex(coin => coin === currency);
                data.splice(idx, 1);
                localStorageService.save(STORAGE_KEY, data);
            }
            else {
                data.push(currency);
                localStorageService.save(STORAGE_KEY, data);
            }
        }
    }


    // <tr className="currency-preview"
    return (
        <tr className={changeView ? 'currency-preview-t' : 'currency-preview'} onClick={() => toCurrencyDetails(currency.name)}>
            <td>
                <div className="icon" onClick={(event) => addToWatchList(currency.name, event)}>
                    {storageData !== null && storageData.includes(currency.name) ?
                        <StarFillIcon size={16} className="icon-watch" /> : <StarIcon size={16} />}
                </div>
            </td>

            <td className="rank"><span>Ranked: </span>#{currency.market_cap_rank}</td>

            <td className="title">
                <img src={currency.image}></img>
                <p>{currency.name}</p>
                <span>{currency.symbol.toUpperCase()}</span>
            </td>

            <td className="price" onClick={() => toCurrencyDetails(currency.name)}>{formatter.format(currency.current_price)}</td>
            <td className="price" style={{ color: currency.price_change_percentage_24h < 0 ? '#FF4343' : '#00BD1F' }}>{currency.price_change_percentage_24h.toFixed(2)}%</td>
            <td><span className="mobile-view-text">Market Cap: </span> {formatter.format(currency.market_cap)}</td>
            <td>
            <span className="mobile-view-text">Volume: </span>{formatter.format(currency.total_volume)}
                <p className="sub-id"> {(currency.total_volume / currency.current_price).toLocaleString()} {currency.symbol.toUpperCase()}</p>
            </td>

            <td>
                <div className="graph">
                    <Sparklines data={currency.sparkline_in_7d.price.map(price => price)}>
                        <SparklinesLine color={currency.sparkline_in_7d.price[0] < currency.sparkline_in_7d.price[currency.sparkline_in_7d.price.length - 1] ? 'green' : 'red'} />
                        <SparklinesSpots />
                        <SparklinesBars />
                    </Sparklines>
                </div>
            </td>

        </tr>
    )
}

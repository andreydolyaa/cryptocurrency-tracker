


import React, { useEffect, useRef, useState } from 'react';
import './CurrenciesList.scss';
import CurrencyPreview from './../CurrencyPreview/CurrencyPreview';
import DisplayNum from '../DisplayNum/DisplayNum';
import { TriangleDownIcon, TriangleUpIcon, StarIcon } from '@primer/octicons-react';
import { Link } from 'react-router-dom';
import loading from '../../assets/icons/loading.gif';
import Search from './../Search/Search';

export default function CurrenciesList({ currencies, numOfCurrencies, handleSort, startSort, updateRate, search }) {
    var [toggleNameIcon, setToggleNameIcon] = useState(false);
    var [togglePriceIcon, setTogglePriceIcon] = useState(false);
    var [toggle24hIcon, setToggle24hIcon] = useState(false);
    var [toggleMarketCapIcon, setToggleMarketCapIcon] = useState(false);
    var [toggleVolumeIcon, setToggleVolumeIcon] = useState(false);

    useEffect(() => {

    }, [])

    const sortBy = (data) => {
        if (data === 'name') setToggleNameIcon(toggleNameIcon = !toggleNameIcon);
        else if (data === 'price') setTogglePriceIcon(togglePriceIcon = !togglePriceIcon);
        else if (data === '24h') setToggle24hIcon(toggle24hIcon = !toggle24hIcon);
        else if (data === 'marketCap') setToggleMarketCapIcon(toggleMarketCapIcon = !toggleMarketCapIcon);
        else if (data === 'volume') setToggleVolumeIcon(toggleVolumeIcon = !toggleVolumeIcon);
        handleSort(data);
    }


    if (!currencies.length) return (
        <div className="list">
        <div className="options">
                <div className="watch-link"><Link to="/watch-list"><StarIcon size={16} className="ics" /> Watchlist</Link></div>
                <div className="rows"><DisplayNum numOfCurrencies={numOfCurrencies} /></div>
            </div>
            <div className="mobile-search"><Search search={search} /></div>
            <div className="loading"><p>Loading...</p><img src={loading} /></div>
        </div>
    )
    else return (
        <div className="list">
            <div className="options">
                <div className="watch-link"><Link to="/watch-list"><StarIcon size={16} className="ics" /> Watchlist</Link></div>
                <div className="rows"><DisplayNum numOfCurrencies={numOfCurrencies} /></div>
            </div>
            <div className="mobile-search"><Search search={search} /></div>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>#Rank</th>
                        <th onClick={() => sortBy("name")}>Name
                            {toggleNameIcon ? <TriangleDownIcon size={16} /> : <TriangleUpIcon size={16} />}
                        </th>
                        <th onClick={() => sortBy("price")}>Price
                            {togglePriceIcon ? <TriangleDownIcon size={16} /> : <TriangleUpIcon size={16} />}
                        </th>
                        <th onClick={() => sortBy("24h")}>24h
                            {toggle24hIcon ? <TriangleDownIcon size={16} /> : <TriangleUpIcon size={16} />}
                        </th>
                        <th onClick={() => sortBy("marketCap")}>Market Cap
                            {toggleMarketCapIcon ? <TriangleDownIcon size={16} /> : <TriangleUpIcon size={16} />}
                        </th>
                        <th onClick={() => sortBy("volume")}>Volume
                            {toggleVolumeIcon ? <TriangleDownIcon size={16} /> : <TriangleUpIcon size={16} />}
                        </th>
                        <th>Last 7 Days</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currencies.map(currency =>
                            <CurrencyPreview currency={currency} key={currency.id} />)
                    }
                </tbody>
            </table>
        </div>
    )
}

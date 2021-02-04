import React, { useEffect, useState } from 'react';
import './Trade.scss';
import loading from '../../assets/icons/loading.gif';
import defaultIcon from '../../assets/icons/bitbank.webp';
import { cryptoService } from '../../services/cryptoService';
import { LinkExternalIcon } from '@primer/octicons-react';

export default function Trade(props) {
    const [currencyData, setCurrency] = useState();
    const [exchanges, setExchanges] = useState();
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    useEffect(() => {
        const fetchData = async () => {
            const currencyData = await cryptoService.loadCurrency(props.match.params.id);
            const exchangesData = await cryptoService.getExchanges(100);
            setCurrency(currencyData);
            setExchanges(exchangesData);
        }
        fetchData();
    }, [])

    function exchangeImage(exchange) {
        var res = exchanges.find(ex => ex.name.toLowerCase() === exchange.toLowerCase());
        if (res) return res.image;
        else return defaultIcon
    }

    if (!currencyData || !exchanges) return <div className="loading"><p>Loading...</p><img src={loading} /></div>
    else return (
        <div className="trade">
            {currencyData &&
                <div className="container">
                    {currencyData.tickers.map((pair, idx) => {
                        return (
                            <div key={idx} className="trade-item">


                                <img src={exchangeImage(pair.market.name)} alt="" />

                                <div className="inner">
                                    <p className="market">{pair.market.name}</p>
                                    <div>
                                        <p className="pair">{pair.target} / {pair.base.length > 4 ? pair.base.substring(0, 3) : pair.base}</p>
                                    </div>
                                    <div>
                                        <p>Vol: {formatter.format(pair.volume)}</p>
                                    </div>
                                </div>

                                <div className="vol">
                                    <p><span>BTC:</span> {pair.converted_volume.btc}</p>
                                    <p><span>ETH:</span> {pair.converted_volume.eth}</p>
                                    <p><span>USD:</span> {formatter.format(pair.converted_volume.usd)}</p>
                                </div>

                                <div className="redirect">
                                    <a href={pair.trade_url !== null ? pair.trade_url : 'Not Available'}>
                                        {pair.trade_url !== null ? "Trade" : 'Not Available'} <LinkExternalIcon size={16} /></a>
                                </div>

                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}

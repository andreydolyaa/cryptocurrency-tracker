

import React from 'react';
import './Exchanges.scss';
import { useEffect } from 'react';
import { useState } from 'react';
import { cryptoService } from '../../services/cryptoService';
import { LinkExternalIcon } from '@primer/octicons-react';
import loading from '../../assets/icons/loading.gif';

export default function Exchanges(props) {
    const [exchanges, setExchanges] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const exchangesData = await cryptoService.getExchanges(100);
            setExchanges(exchangesData);
        }
        fetchData();
    }, [])

    if (!exchanges) return <div className="loading"><p>Loading...</p><img src={loading} /></div>
    else return (
        <div className="exchanges">
            <h3>Cryptocurrency Exchanges</h3>
            {exchanges &&
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Exchange Score</th>
                            <th>Volume 24h</th>
                            <th>Established</th>
                            <th>Country Operating</th>
                            <th>URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exchanges.map((exchange, idx) => {
                            return (
                                <tr key={idx} className="tr">
                                    <td>{idx + 1}</td>
                                    <td className="title-img"><img src={exchange.image} /> <p>{exchange.name}</p></td>
                                    <td className="score"><p>{exchange.trust_score}</p></td>
                                    <td>{exchange.trade_volume_24h_btc.toFixed(2)} BTC</td>
                                    <td>{exchange.year_established}</td>
                                    <td>{exchange.country}</td>
                                    <td className="url"><a href={exchange.url}>{exchange.url} <LinkExternalIcon size={16} /></a></td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            }
        </div>
    )
}

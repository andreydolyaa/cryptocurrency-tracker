

import React, { useEffect, useState } from 'react';
import './Links.scss';
import loading from '../../assets/icons/loading.gif';
import { cryptoService } from '../../services/cryptoService';

export default function Links(props) {
    const [currencyData, setCurrency] = useState();
    useEffect(() => {
        const fetchData = async () => {
            const currencyData = await cryptoService.loadCurrency(props.match.params.id);
            setCurrency(currencyData);
        }
        fetchData();
    }, [])

    if (!currencyData) return <div className="loading"><p>Loading...</p><img src={loading} /></div>
    else return (
        <div className="links">
            {currencyData &&
                <div className="inner">
                    <div className="inner-links">
                        <h1>Blockchain Explorers</h1>
                        {currencyData.links.blockchain_site.map((site, idx) => {
                            return (
                                <a key={idx} href={site}>{site}</a>
                            )
                        })}
                    </div>
                    <div className="website">
                        <h2>Official Website <a href={currencyData.links.homepage}>{currencyData.links.homepage}</a></h2>
                    </div>
                </div>
            }
        </div>
    )
}

// <h1 className="title">{props.match.params.id}'s Information Resources</h1>
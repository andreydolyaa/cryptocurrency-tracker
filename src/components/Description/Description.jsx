

import React, { useState } from 'react';
import './Description.scss';
import { useEffect } from 'react';
import { cryptoService } from '../../services/cryptoService';
import parse from 'html-react-parser';
import loading from '../../assets/icons/loading.gif';


export default function Description(props) {
    const [currencyData, setCurrency] = useState();

    useEffect(() => {
        console.log(props);
        const fetchData = async () => {
            const currencyData = await cryptoService.loadCurrency(props.match.params.id);
            setCurrency(currencyData);

        }
        fetchData();
    }, [])

    if (!currencyData) return <div className="loading"><p>Loading...</p><img src={loading}/></div>
    else return (
        <div className="description">
        <h1 className="title">About {props.match.params.id}</h1>
            <div className="inner">
                {currencyData &&
                    parse(`<p>${currencyData.description.en}</p>`)
                }
            </div>
        </div>
    )
}



import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { cryptoService } from '../../services/cryptoService';
import './OtherCurrencies.scss';

export default function OtherCurrencies(props) {
    const [currencies, setCurrencies] = useState();
    const currencyRef = useRef();
    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            const currenciesData = await cryptoService.loadCurrencies();
            setCurrencies(currenciesData);
        }
        fetchData();
    }, [])

    const selectCurrencyHandler = () => {
        history.push({
            pathname: `/currency/${currencyRef.current.value.toLowerCase()}`,
            props
        })

    }
    return (
        <div>
            <div>
                {currencies &&
                    <select name="currencies" onChange={selectCurrencyHandler} ref={currencyRef}>
                        <option defaultValue>Find Currency</option>
                        {currencies.map(currency => {
                            return (<option key={currency.id} value={currency.name}>{currency.name}</option>)
                        })}
                    </select>
                }
            </div>
        </div>
    )
}

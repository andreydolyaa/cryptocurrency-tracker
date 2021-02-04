

import React, { useRef, useState } from 'react';
import './Calculator.scss'
import { useEffect } from 'react';
import { cryptoService } from '../../services/cryptoService';
import loading from '../../assets/icons/loading.gif';

export default function Calculator() {
    const [res, setRes] = useState();
    const [x, setX] = useState(0);
    const [currencies, setCurrencies] = useState();
    const currencyOne = useRef('bitcoin');
    const currencyTwo = useRef('eth');


    useEffect(() => {
        const fetchData = async () => {
            const currenciesData = await cryptoService.loadCurrencies(100);
            setCurrencies(currenciesData);
        }
        fetchData();
    }, [])


    useEffect(() => {
        from();
    }, [x])

    const setMultiplier = (ev) => {
        setX(+ev.target.value);
    }

    const from = async () => {
        if (currencyOne.current.value && currencyTwo.current.value) {
            var fromCurrency = await cryptoService.loadVsPrice(currencyOne.current.value, currencyTwo.current.value);
            var val = fromCurrency[currencyOne.current.value.toLowerCase()][currencyTwo.current.value];
            var res = x * val;
            setRes(res); // NAMING ERROR //CURRENCY NAME FIX NEEDED
        }
        return res;
    }

    if (!currencies) return <div className="loading"><p>Loading...</p><img src={loading} /></div>
    else return (
        <div className="calculator">

            {currencies &&
                <div className="inner">
                    <h1>Exchange Calculator</h1>


                    <div className="calc">


                        <div className="option-one">
                            <input type="number" onChange={setMultiplier} defaultValue={1} />
                            <select className="select" name="currencyOne" ref={currencyOne} onChange={from}>
                                {currencies.map(currency => {
                                    return (
                                        <option key={currency.id}
                                            value={currency.name}>
                                            {currency.symbol.toUpperCase()}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>

                        <div className="eq">=</div>

                        <div className="option-two">
                            <input type="text" defaultValue={res} readOnly />
                            <select className="select" name="currencyOne" ref={currencyTwo} onChange={from}>
                                <option value="eth">ETH</option>
                                {currencies.map((currency) => {
                                    return (
                                        <option key={currency.id}
                                            value={currency.symbol}>
                                            {currency.symbol.toUpperCase()}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>



                    </div>


                </div>
            }
        </div>
    )
}

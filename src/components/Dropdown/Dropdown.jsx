

import React, { useEffect, useRef, useState } from 'react';
import './Dropdown.scss';
import { TriangleDownIcon } from '@primer/octicons-react';
import { cryptoService } from '../../services/cryptoService';

export default function Dropdown(props) {
    const globalRef = useRef();
    const [exchange, setExchange] = useState();
    var [dropdown, setDropdown] = useState(false);
    var [exchangesDropdown, setExchangesDropdown] = useState(false);
    const [currency, setCurrency] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const exchangeData = await cryptoService.getExchanges();
            const currencyData = await cryptoService.loadCurrency(props.match.params.id);
            setCurrency(currencyData);
            setExchange(exchangeData);
        }
        fetchData();
    }, [])

    useEffect(() => {
        document.addEventListener("mousedown", onOutSideClick);
    },[])

    const toggleDropdown = () => {
        setDropdown(dropdown = !dropdown);
        setExchangesDropdown(false);
    }

    const exchangesToggle = () => {
        setExchangesDropdown(exchangesDropdown = !exchangesDropdown);
        setDropdown(false);
    }

    const onOutSideClick = (ev) => {
        if (globalRef.current && !globalRef.current.contains(ev.target)) {
            setDropdown(false);
            setExchangesDropdown(false);
        }
    }


    return (
        <div ref={globalRef}>
            <div className="buttons">
                <button onClick={toggleDropdown}>Buy <TriangleDownIcon size={16} /></button>
                <button>Markets <TriangleDownIcon size={16} /></button>
                <button onClick={exchangesToggle}>Exchanges <TriangleDownIcon size={16} /></button>
            </div>


            {exchange &&
                <div className="dropdown" style={{ display: exchangesDropdown ? 'flex' : 'none' }}>
                    {exchange.map(ex => {
                        return (
                            <div className="exhchanges-dropdown" key={ex.name}>
                                <div className="img">
                                    <img src={ex.image} alt="" />
                                    <h2><a href={ex.url}>{ex.name}</a>
                                        <p>Established {ex.year_established}</p>
                                        <p>Trust Score Rank #{ex.trust_score_rank} </p>
                                    </h2>
                                </div>
                            </div>
                        )
                    })}
                </div>
            }
            {exchange &&
                <div className="dropdown" style={{ display: dropdown ? 'flex' : 'none' }}>
                    <div className="logo">
                        <img src={exchange[0].image}></img>
                        <h2>{exchange[0].name} Cryptocurrency Exchange</h2>
                    </div>
                    <div className="link">
                        <p>Obtain {currency.name} at {exchange[0].name} / The largest Cryptocurrency Exchange market</p>
                        <button><a href={exchange[0].url}>{exchange[0].url}</a></button>
                    </div>
                </div>}

        </div>
    )
}

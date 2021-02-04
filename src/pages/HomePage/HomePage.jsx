

import React, { useEffect, useState } from 'react';
import { cryptoService } from './../../services/cryptoService';
import CurrenciesList from './../../components/CurrenciesList/CurrenciesList';
import './HomePage.scss';
import Subscribe from '../../components/Subscribe/Subscribe';
import StatsHeader from '../../components/StatsHeader/StatsHeader';



export default function HomePage({ searchData,search }) {
    const [currencies, setCurrencies] = useState([]);
    const [numOfCurrencies, setNumOfCurrencies] = useState(20);
    const [sortCurrency, setSort] = useState('');
    var [startSort, setStartSort] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const data = await cryptoService.loadCurrencies(numOfCurrencies, searchData, sortCurrency, startSort);
            setCurrencies(data);
        }
        fetchData();

    }, [searchData, numOfCurrencies, sortCurrency, startSort]);

    const handleNumOfCurrencies = (num) => {
        setNumOfCurrencies(+num);
    }

    const handleSort = (data) => {
        setStartSort(startSort = !startSort);
        setSort(data);
    }

    return (
        <div className="home-page">
        <div className="stats">
        
        </div>
            <CurrenciesList currencies={currencies}
                numOfCurrencies={handleNumOfCurrencies}
                handleSort={handleSort}
                startSort={startSort}
                search={search}
            />
            <Subscribe />
        </div>
    )
}

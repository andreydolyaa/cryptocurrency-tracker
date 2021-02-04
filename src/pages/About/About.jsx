

import React from 'react';
import './About.scss';

export default function About() {
    return (
        <div className="about">
            <h2>About</h2>
            <ol>
                <li>This is a Cryptocurrency information site, which includes all the
                cryptocurrencies on the market, exchanges, and all the information needed about each currency.
            </li>
                <li>This app is heavily inspired by Coinmarketcap.com and it's built for learning purposes only.</li>
                <li>This app uses - Javascript, React.js & SASS.</li>
                <li>All the information about the exchanges and the currencies comes from the CoinGeko API, Github API and Messari news API.</li>
                <li>All the code can be found on my <a href="https://github.com/andreydolyaa?tab=repositories">https://github.com/andreydolyaa?tab=repositories</a></li>
                <li>Developed By Andrey Dolya, 2021.</li>
            </ol>
        </div>
    )
}



import React from 'react';
import './AppFooter.scss';
import { Link } from 'react-router-dom';


export default function AppFooter() {
    return (
        <div className="footer">
            <div className="inner">


                <div className="logo">
                    <h2>CryptoScan</h2>
                </div>

                <div>
                    <ul>
                    <li><h3>App</h3></li>
                        <li><Link to="/">Cryptocurrencies</Link></li>
                        <li><Link to="/exchanges">Exchanges</Link></li>
                        <li><Link to="/calculator">Calculator</Link></li>
                        <li><Link to="/news">News</Link></li>
                    </ul>
                </div>


                <div>
                    <ul>
                    <li><h3>Contact Us</h3></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>


                <div>
                <ul>
                <li><h3>Social</h3></li>
                <li><a href="https://github.com/andreydolyaa/cryptocurrency-tracker"><i className="fab fa-github"></i> Github</a></li>
                <li><a href="https://www.linkedin.com/in/andrey-dolya-250130203/"><i className="fab fa-linkedin"></i> Linkedin</a></li>
                </ul>
                </div>


            </div>
        </div>
    )
}

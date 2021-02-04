

import React from 'react';
import './AppFooter.scss';
import logo from '../../assets/icons/chart.png';


export default function AppFooter() {
    return (
        <div className="footer">
            <div className="inner">


                <div className="logo">
                    <img src={logo} />
                    <h2>CryptoScan</h2>
                </div>

                <div>
                    <ul>
                    <li><h3>App</h3></li>
                        <li><a href="">Cryptocurrencies</a></li>
                        <li><a href="">Exchanges</a></li>
                        <li><a href="">Calculator</a></li>
                        <li><a href="">News</a></li>
                    </ul>
                </div>


                <div>
                    <ul>
                    <li><h3>Contact Us</h3></li>
                        <li><a href="">About</a></li>
                        <li><a href="">Contact</a></li>
                    </ul>
                </div>


                <div>
                <ul>
                <li><h3>Social</h3></li>
                <li><a href=""><i className="fab fa-github"></i> Github</a></li>
                <li><a href=""><i className="fab fa-linkedin"></i> Linkedin</a></li>
                </ul>
                </div>


            </div>
        </div>
    )
}

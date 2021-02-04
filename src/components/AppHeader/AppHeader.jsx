

import './AppHeader.scss';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Search from './../Search/Search';
import logoImg from '../../assets/icons/chart.png';
import { ThreeBarsIcon } from '@primer/octicons-react';
import { useEffect } from 'react';


export default function AppHeader(props) {
    var [mobileMenu, setMobileMenu] = useState(false);


    const toggleMobile = () => {
        setMobileMenu(mobileMenu = !mobileMenu);
        props.mobileMenu(mobileMenu);
    }

    return (
        <div className="app-header">

            <div className="brand">
                <div className="logo">
                    <img src={logoImg} alt="" />
                    <h2 className="title"> CryptoScan</h2>
                </div>
                <div className="items">
                    <Link to="/">Cryptocurrencies<span className="notif"></span></Link>
                    <Link to="/exchanges">Exchanges</Link>
                    <Link to="/calculator">Calculator</Link>
                    <Link to="/news">News</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                </div>

                <div className="search"><Search {...props} /></div>
                <div className="mobile-menu-btn" onClick={toggleMobile}><ThreeBarsIcon size={24} /></div>
            </div>

        </div>
    )
}

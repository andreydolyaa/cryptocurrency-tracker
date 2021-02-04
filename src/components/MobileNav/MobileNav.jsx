

import React from 'react';
import { Link } from 'react-router-dom';
import './MobileNav.scss';



export default function MobileNav(props) {
    const closeMenu = () => {
        props.mobileMenu(false);
    }
    return (
        <div className="mobile-nav">
            <Link onClick={closeMenu} to="/">Cryptocurrencies<span className="notif"></span></Link>
            <Link onClick={closeMenu} to="/exchanges">Exchanges</Link>
            <Link onClick={closeMenu} to="/calculator">Calculator</Link>
            <Link onClick={closeMenu} to="/news">News</Link>
            <Link onClick={closeMenu} to="/about">About</Link>
            <Link onClick={closeMenu} to="/contact">Contact</Link>
        </div>
    )
}

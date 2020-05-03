
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo.svg';
function Header() {
    return (
        <nav className="navbar">
            <Link to="/" className="logo-link"><img src={logo} className="logo" alt="logo" /></Link>
            {/* <input className="searchbar" type="search" placeholder="Search..."></input> */}
            <h3>Version 0.0.1</h3>
        </nav>
    );
}

export default Header;
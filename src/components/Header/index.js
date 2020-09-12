import React from 'react';
import { Link } from "react-router-dom";
import './header.scss';
function Header() {
    return (
        <div className='header-container'>
            <div><Link to='/homepage'>LOGO</Link></div>
            <div><Link to='/world'>World</Link></div>
            <div>Space</div>
        </div>
    );
}

export default Header;

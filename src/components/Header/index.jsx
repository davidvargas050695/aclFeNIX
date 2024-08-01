import React from 'react';
import './Header.css';
import { Whatshapp } from "../../components";
import LogoOnlineStore from "../../static/shoplogo.png";

const Header = () => {
    return (
        <header className="header">
            <div className="header__logo-container">
                <img src={LogoOnlineStore} alt="ONLINE STORE ECUADOR" className="header__logo" />
                <h1 className="header__title">Online Store Ecuador</h1>
            </div>
            <div className="header__cart">
                <Whatshapp />
            </div>
        </header>
    );
}

export default Header;

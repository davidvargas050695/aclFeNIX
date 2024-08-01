import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Menu.css';
import useActiveLink from './CustomHook/useActiveLink';

const Menu = () => {
    const location = useLocation();
    const [activeLink, handleLinkClick] = useActiveLink(location.pathname);

    return (
        <div className="menu">
            <nav className="menu__nav">
                <Link 
                    className={`menu__link ${activeLink === '/' ? 'active' : ''}`} 
                    to="/" 
                    onClick={() => handleLinkClick('/')}
                >
                    INICIO
                </Link>
                <Link 
                    className={`menu__link ${activeLink === '/shop' ? 'active' : ''}`} 
                    to="/shop" 
                    onClick={() => handleLinkClick('/shop')}
                >
                    PRODUCTOS
                </Link>
                <Link 
                    className={`menu__link ${activeLink === '/CartShop' ? 'active' : ''}`} 
                    to="/CartShop" 
                    onClick={() => handleLinkClick('/CartShop')}
                >
                    PEDIDO
                </Link>
                <Link 
                    className={`menu__link ${activeLink === '/contact' ? 'active' : ''}`} 
                    to="/contact" 
                    onClick={() => handleLinkClick('/contact')}
                >
                    CONTACTO
                </Link>
            </nav>
        </div>
    );
}

export default Menu;

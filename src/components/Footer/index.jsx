import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faPinterest } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__section">
                    <h2 className="footer__logo">Online Store Ecuador</h2>
                    <p className="footer__address">Dirección: 60-49 Road 11378 Ecuador</p>
                    <p className="footer__phone">Teléfono: +593 979007892</p>
                    <p className="footer__email">Correo electrónico: ventasonlineEcuador@gmail.com</p>
                </div>
                <div className="footer__section">
                    <h3 className="footer__title">Enlaces de interés</h3>
                    <ul className="footer__links">
                        <li className="footer__link-item"><Link className="footer__link" to="/">Inicio</Link></li>
                        <li className="footer__link-item"><Link className="footer__link" to="/Shop">Productos</Link></li>
                        <li className="footer__link-item"><Link className="footer__link" to="/Contact">Contactos</Link></li>
                        <li className="footer__link-item"><Link className="footer__link" to="/CartShop">Pedido</Link></li>
                    </ul>
                </div>
                <div className="footer__section">
                    <h3 className="footer__title">Suscríbete a nuestro boletín ahora</h3>
                    <p className="footer__text">Reciba actualizaciones por correo electrónico sobre nuestra última tienda y ofertas especiales.</p>
                    <form className="footer__form">
                        <input type="email" placeholder="Escribe tu email ..." className="footer__input" />
                    </form>
                    <button type="submit" className="footer__button">SUBSCRIBIR</button>
                    <div className="footer__social">
                        <a className="footer__social-link" href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebook} />
                        </a>
                        <a className="footer__social-link" href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                        <a className="footer__social-link" href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                        <a className="footer__social-link" href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faPinterest} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

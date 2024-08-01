import React from 'react';
import './Contact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faHome, faClock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FormContact } from "../../components";

const Contact = () => {
  return (
    <div className="contact">
      <div className="contact__info-container">
        <div className="contact__info">
          <FontAwesomeIcon icon={faPhone} size="2x" />
          <h4 className="contact__info-title">Teléfono</h4>
          <p className="contact__info-text">+593 979007892</p>
        </div>
        <div className="contact__info">
          <FontAwesomeIcon icon={faHome} size="2x" />
          <h4 className="contact__info-title">Dirección</h4>
          <p className="contact__info-text">60-49 Road 11378 Ecuador</p>
        </div>
        <div className="contact__info">
          <FontAwesomeIcon icon={faClock} size="2x" />
          <h4 className="contact__info-title">Atención</h4>
          <p className="contact__info-text">10:00 am to 23:00 pm</p>
        </div>
        <div className="contact__info">
          <FontAwesomeIcon icon={faEnvelope} size="2x" />
          <h4 className="contact__info-title">Correo Electrónico</h4>
          <p className="contact__info-text">ventasonlineEcuador@gmail.com</p>
        </div>
      </div>
      <FormContact />
    </div>
  );
};

export default Contact;

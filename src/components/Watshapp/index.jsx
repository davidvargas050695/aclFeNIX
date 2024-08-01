import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import './Watshapp.css';

const WhatsAppButton = () => {
  const sendMessage = () => {
    const message = encodeURIComponent('Necesitas Ayuda, Sí es así, comunicate con nosotros');
    const phoneNumber = '+5930979007892'; // Reemplaza esto con tu número de teléfono de WhatsApp
    const url = `https://wa.me/${phoneNumber}?text=${message}`;

    window.open(url, '_blank');
  };

  return (
    <button className="whatsapp__button" onClick={sendMessage}>
      <FontAwesomeIcon icon={faWhatsapp} />
    </button>
  );
};

export default WhatsAppButton;

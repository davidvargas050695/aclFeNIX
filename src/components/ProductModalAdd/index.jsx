import React from 'react';
import './ProductModalAdd.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const ProductModalAdd = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="product-modal">
      <div className="product-modal__content">
        <span className="product-modal__close" onClick={onClose}>&times;</span>
        <FontAwesomeIcon icon={faCheckCircle} className="product-modal__icon" />
        <h4 className="product-modal__title">Producto agregado al carrito correctamente</h4>
        <p className="product-modal__message">Ir a la sección de pedido para realizar la compra</p>
        <button className="product-modal__button" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default ProductModalAdd;

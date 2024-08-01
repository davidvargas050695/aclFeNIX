import React from 'react';
import './CartModal.css';

const CartModal = ({ product, onClose }) => {
    return (
        <div className="cart-modal">
            <div className="cart-modal__header">
                <span className="cart-modal__quantity">{product.quantity}X</span>
                <h3 className="cart-modal__name">{product.name}</h3>
                <button className="cart-modal__close-button" onClick={onClose}>X</button>
            </div>
            <div className="cart-modal__body">
                <img className="cart-modal__image" src={product.image} alt={product.name} />
                <p className="cart-modal__price">${product.price}</p>
                <p className="cart-modal__size">Size: {product.size}</p>
                <p className="cart-modal__color">Color: {product.color}</p>
            </div>
            <div className="cart-modal__footer">
                <h3 className="cart-modal__subtotal-label">SUBTOTAL:</h3>
                <h3 className="cart-modal__subtotal-value">${product.quantity * product.price}</h3>
            </div>
            <button className="cart-modal__checkout-button">CHECKOUT</button>
        </div>
    );
};

export default CartModal;

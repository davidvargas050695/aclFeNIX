import React, { useState, useEffect } from 'react';
import './CartShop.css';
import { Notification } from '../../components';

const CartShop = () => {
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    useEffect(() => {
        const cartProducts = JSON.parse(localStorage.getItem('ProductCart')) || [];
        setProducts(cartProducts);
    }, []);

    const updateQuantity = (id, delta) => {
        const newProducts = products.map(product =>
            product.id === id ? { ...product, quantity: product.quantity + delta } : product
        );
        setProducts(newProducts);
        localStorage.setItem('ProductCart', JSON.stringify(newProducts));
    };

    const removeProduct = (id) => {
        const newProducts = products.filter(product => product.id !== id);
        setProducts(newProducts);
        localStorage.setItem('ProductCart', JSON.stringify(newProducts));
    };

    const handlePurchase = () => {
        setIsModalOpen(true); // Abre el modal
        localStorage.removeItem('ProductCart'); // Borra los datos de localStorage
        setProducts([]); // Actualiza el estado para reflejar que el carrito está vacío
    };

    const subtotal = products.reduce((acc, product) => acc + product.price * product.quantity, 0);

    return (
        <div className="cart-shop">
            <div className="cart-shop__products">
                <table className="cart-shop__table">
                    <thead className="cart-shop__thead">
                        <tr className="cart-shop__tr">
                            <th className="cart-shop__th">Productos</th>
                            <th className="cart-shop__th">Imagen</th>
                            <th className="cart-shop__th">Price</th>
                            <th className="cart-shop__th">Quantity</th>
                            <th className="cart-shop__th">Total</th>
                            <th className="cart-shop__th">Action</th>
                        </tr>
                    </thead>
                    <tbody className="cart-shop__tbody">
                        {products.length > 0 ? (
                            products.map(product => (
                                <tr className="cart-shop__tr" key={product.id}>
                                    <td className="cart-shop__td">{product.name}</td>
                                    <td className="cart-shop__td"><img src={product.urlImage} alt={product.name} className="cart-shop__image" /></td>
                                    <td className="cart-shop__td">${product.price.toFixed(2)}</td>
                                    <td className="cart-shop__td">
                                        <button className="cart-shop__quantity-button" onClick={() => updateQuantity(product.id, -1)}>-</button>
                                        {product.quantity}
                                        <button className="cart-shop__quantity-button" onClick={() => updateQuantity(product.id, 1)}>+</button>
                                    </td>
                                    <td className="cart-shop__td">${(product.price * product.quantity).toFixed(2)}</td>
                                    <td className="cart-shop__td">
                                        <button className="cart-shop__remove-button" onClick={() => removeProduct(product.id)}>X</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className="cart-shop__tr">
                                <td className="cart-shop__td" colSpan="6"><p className="cart-shop__empty-message">No existen productos para comprar </p></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="cart-shop__total">
                <div className="cart-shop__subtotal">Subtotal: ${subtotal.toFixed(2)}</div>
                <div className="cart-shop__total-amount">Total: ${subtotal.toFixed(2)}</div>
                <button className="cart-shop__purchase-button" onClick={handlePurchase} disabled={products.length === 0}>Realizar Compra</button>
            </div>
            <Notification isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}

export default CartShop;

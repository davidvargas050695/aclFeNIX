import React, { useState, useEffect } from 'react';
import './Products.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { ProductModalAdd } from '../../components';

const Products = ({ products }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const CART_KEY = 'ProductCart';
    const getCartFromLocalStorage = () => {
        const cart = localStorage.getItem(CART_KEY);
        return cart ? JSON.parse(cart) : [];
    };

    const updateCartInLocalStorage = (cart) => {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    };

    const handleAddToCart = (product) => {
        const cart = getCartFromLocalStorage();
        const isProductInCart = cart.some(item => item.id === product.id);

        if (!isProductInCart) {
            cart.push(product);
            updateCartInLocalStorage(cart);
            setIsModalOpen(true);
        }
    };

    useEffect(() => {
        updateCartInLocalStorage(getCartFromLocalStorage());
    }, [products]);

    return (
        <div className="products">
            <div className="products__grid">
                {products.map(product => (
                    <div className="products__card" key={product.id}>
                        <img className="products__image" src={product.urlImage} alt={product.name} />
                        <h5 className="products__name">{product.name}</h5>
                        <p className="products__description">{product.description}</p>
                        <p className="products__price">${product.price}</p>
                        <button className="product__add-to-cart" onClick={() => handleAddToCart(product)}>
                            <FontAwesomeIcon icon={faShoppingBag} />
                            AGREGAR A PEDIDO
                        </button>
                    </div>
                ))}
            </div>
            <ProductModalAdd isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default Products;

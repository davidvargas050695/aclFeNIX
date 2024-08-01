import React, { useState } from 'react';
import './NavigateProducts.css';

const NavigateProducts = ({ onSelectCategory }) => {
    const [activeCategory, setActiveCategory] = useState(null);

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
        onSelectCategory(category);
    };

    return (
        <div className="navigate-products">
            <div className="navigate-products__header">
                <div className="navigate-products__categories">
                    <button
                        className={`navigate-products__category ${activeCategory === null ? 'active' : ''}`}
                        onClick={() => handleCategoryClick(null)}
                    >
                        Todo
                    </button>
                    <button
                        className={`navigate-products__category ${activeCategory === 1 ? 'active' : ''}`}
                        onClick={() => handleCategoryClick(1)}
                    >
                        Accesorios
                    </button>
                    <button
                        className={`navigate-products__category ${activeCategory === 2 ? 'active' : ''}`}
                        onClick={() => handleCategoryClick(2)}
                    >
                        Videojuegos
                    </button>
                    <button
                        className={`navigate-products__category ${activeCategory === 3 ? 'active' : ''}`}
                        onClick={() => handleCategoryClick(3)}
                    >
                        Zapatos
                    </button>
                    <button
                        className={`navigate-products__category ${activeCategory === 4 ? 'active' : ''}`}
                        onClick={() => handleCategoryClick(4)}
                    >
                        Bicicletas
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NavigateProducts;

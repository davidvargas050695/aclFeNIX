import React, { useState } from 'react';
import { NavigateProducts, Products, Searcher } from '../../components'
import products from '../../data/productsData';


const Shop = () => {
    const [selectedCategory,   setSelectedCategory] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState(products);

    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId);
        let filtered = products;
        if(categoryId === null) {
            setFilteredProducts(products);
        } else {
            filtered = products.filter(product => product.categoryId === categoryId);
            setFilteredProducts(filtered);
        }
    };

    const handleSearch = (searchTerm) => {
        let filtered = products;
        if (selectedCategory) {
            filtered = filtered.filter(product => product.categoryId === selectedCategory);
        }
        filtered = filtered.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    return (
        <div>
            <NavigateProducts onSelectCategory={handleCategorySelect} />
            <Searcher onSearch={handleSearch} />
            <Products products={filteredProducts} />
        </div>
    );
}

export default Shop;
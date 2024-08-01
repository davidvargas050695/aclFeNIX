import React, { useState } from 'react';
import { Carousel, Products, Searcher } from "../../components";
import slides from "../../data/sliderData";
import productsData from '../../data/productsData';
import './Home.css';

const Home = ({ setItemCount, setTotalPrice }) => {
    const [products] = useState(productsData);
    const [filteredProducts, setFilteredProducts] = useState(productsData);
    const handleSearch = (searchTerm) => {
        const filtered = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    return (
        <div>
            <Carousel slides={slides} />
            <div className="home__products-header">
                <h2 className="home__products-title">Productos destacados</h2>
            </div>
            <Searcher onSearch={handleSearch} />
            <Products products={filteredProducts} setItemCount={setItemCount} setTotalPrice={setTotalPrice} />
        </div>
    );
};

export default Home;

import React, { useState } from 'react';
import { Carousel, Products, Searcher } from "../../components";
import slides from "../../data/sliderData";
import productsData from '../../data/productsData';
import './Home.css';

const Home = ({ setItemCount, setTotalPrice }) => {

    const [table1Data, setTableData] = useState([
        { contrato: '001', cliente: 'Juan Pérez', sucursal: 'Sucursal A', identificador: '123456' },
        { contrato: '002', cliente: 'María García', sucursal: 'Sucursal B', identificador: '789012' }
    ]);
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

            <div className="home__products-header">
                <h1 className="home__products-title">Clientes Registrados</h1>
            </div>
            <Searcher onSearch={handleSearch} />
            <div className="home_table-container">
                <table className="customer__table">
                    <thead className="customer_thead">
                        <tr className="customer__tr">
                            <th className="customer_th">Contrato</th>
                            <th className="customer_th">Cliente</th>
                            <th className="customer_th">Sucursal</th>
                            <th className="customer_th">Identificador</th>
                            <th className="customer_th">Contratos</th>
                            <th className="customer_th">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="customer_tbody">

                        {table1Data.map((row, index) => (
                            <tr key={index}>
                                <td className="customer_td">{row.contrato}</td>
                                <td className="customer_td">{row.cliente}</td>
                                <td className="customer_td">{row.sucursal}</td>
                                <td className="customer_td">{row.identificador}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>

            </div>


        </div>
    );
};

export default Home;
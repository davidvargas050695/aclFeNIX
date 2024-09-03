import React, { useState, useEffect } from "react";
import Header from '../../components/Header';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faFileContract, faPuzzlePiece } from "@fortawesome/free-solid-svg-icons";
import "./HomePage.css";
import apiClient from "../../axios";

const HomePage = ({ handleLogout }) => {
    const [homeData, setHomeData] = useState({
        clients: 0,
        contracts: 0,
        modules: 0,
    });

    useEffect(() => {
        // Función para obtener los datos desde la API
        const fetchData = async () => {
            try {
                const response = await apiClient.get('admin/home_data');
                setHomeData(response.data);
            } catch (error) {
                console.error("Error al obtener los datos del servicio", error);
            }
        };

        fetchData();
    }, []); // El array vacío significa que este efecto se ejecutará solo una vez cuando el componente se monte

    return (
        <div className="home-container">
            {/* Renderiza el Header */}
            <Header title="Inicio" onLogout={handleLogout} />

            <div className="home_modules-container">
                <div className="module_item-container">
                    <div className="small-module" style={{ backgroundColor:"#071952" }}>
                        <FontAwesomeIcon icon={faUser} className="icono"  />
                    </div>
                    <div className="content">
                        <div className="content-header">
                            <p className="content-title">Compañias</p>
                            <p className="content-count">{homeData.clients}</p> {/* Mostrar el número de clientes */}
                        </div>
                        <hr />
                        <div className="content-footer">
                            <p className="content-stadistic"></p>
                        </div>
                    </div>

                </div>

                <div className="module_item-container">
                    <div className="small-module" style={{ backgroundColor:"#088395" }}>
                        <FontAwesomeIcon icon={faFileContract} className="icono" />
                    </div>
                    <div className="content">
                        <div className="content-header">
                            <p className="content-title">Contratos</p>
                            <p className="content-count">{homeData.contracts}</p> {/* Mostrar el número de contratos */}
                        </div>
                        <hr />
                        <div className="content-footer">
                            <p className="content-stadistic"></p>
                        </div>
                    </div>

                </div>

                <div className="module_item-container">
                    <div className="small-module" style={{ backgroundColor:"#37B7C3" }} >
                        <FontAwesomeIcon icon={faPuzzlePiece} className="icono" />
                    </div>
                    <div className="content">
                        <div className="content-header">
                            <p className="content-title">Modulos</p>
                            <p className="content-count">{homeData.modules}</p> {/* Mostrar el número de módulos */}
                        </div>
                        <hr />
                        <div className="content-footer">
                            <p className="content-stadistic"></p>
                        </div>
                    </div>

                </div>

            </div>
        </div >
    );
};

export default HomePage;

import React from "react";
import Header from '../../components/Header';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faFileContract, faPuzzlePiece } from "@fortawesome/free-solid-svg-icons";
import "./HomePage.css";

const HomePage = ({ handleLogout }) => {
    return (
        <div className="home-container">
            {/* Renderiza el Header */}
            <Header title="Inicio" onLogout={handleLogout} />

            <div className="home_modules-container">
                <div className="module_item-container">
                    <div className="small-module" style={{ backgroundColor:"#071952" }}>
                        <FontAwesomeIcon icon={faBuilding} className="icono"  />
                    </div>
                    <div className="content">
                        <div className="content-header">
                            <p className="content-title">Compañias</p>
                            <p className="content-count">200</p>
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
                            <p className="content-count">200</p>
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
                            <p className="content-count">200</p>
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

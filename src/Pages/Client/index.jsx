import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Client.css';
import Header from '../../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faBuilding, faUser } from '@fortawesome/free-solid-svg-icons';
import Table from '../../components/Table'; // Asegúrate de que el path sea correcto
import Section from '../../components/Section';
// import apiClient from "../../axios"; // Asegúrate de tener configurado tu cliente API
import { Tooltip } from "react-tooltip";

const Client = ({ handleLogout }) => {
    const [data] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const columns = [
        { title: "id", key: "id" },
        { title: "nombre", key: "nombre" },
        { title: "cedula/ruc", key: "dni" },
        { title: "contratos", key: "contratos" },
    ];

    const itemsPerPage = 50;
    const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const renderRow = (item, index) => (
        <>
            <td>{item.id}</td>
            <td>{item.nombre}</td>
            <td>{item.dni}</td>
            <td>{item.contratos}</td>
            <td>
                <div className="button-container">
                    <Tooltip id="edit-tooltip" className="custom-tooltip" />
                    <button
                        data-tooltip-id="edit-tooltip"
                        className="icon-button edit-button"
                        data-tooltip-content="Editar"
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="icon-button delete-button" onClick={() => console.log('Eliminando', item.numCont)}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                    <button className="icon-button company-button" onClick={() => console.log('Viendo compañías', item.numCont)}>
                        <FontAwesomeIcon icon={faBuilding} />
                    </button>
                </div>
            </td>
        </>
    );

    return (
        <div className="home-container">
            <Header onLogout={handleLogout} title='Clientes' />

            <div className="home-content">
                <Section>
                    <div className="filter-form">
                        <Link to="/ClientForm" className="add-client-button">
                            Crear Nuevo Cliente
                        </Link>
                    </div>
                </Section>
                <Table
                    title='Lista de Clientes'
                    rows={paginatedData}
                    columns={columns}
                    icon={faUser}
                    renderRow={renderRow}
                    currentPage={currentPage}
                    totalItems={data.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
};

export default Client;

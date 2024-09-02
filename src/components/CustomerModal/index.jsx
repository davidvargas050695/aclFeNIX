import React, { useState, useEffect } from 'react';
import './CustomerModal.css';
import Table from '../Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import apiClient from "../../axios";

const CustomerModal = ({ isOpen, closeModal, selectClient }) => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedClient, setSelectedClient] = useState(null);
    const [showNotification, setShowNotification] = useState(false);

    // Cargar todos los datos al montar el componente
    const fetchAllData = async () => {
        try {
            const response = await apiClient.get('/clients');
            if (Array.isArray(response.data)) {
                setData(response.data);
            } else {
                setData([response.data]);
            }
        } catch (error) {
            console.error("Error al obtener los datos del servicio", error);
        }
    };

    useEffect(() => {
        fetchAllData();
    }, []);

    const handleRefresh = () => {
        fetchAllData();
    };

    const columns = [
        { title: "Código", key: "code" },
        { title: "Rázon Social", key: "socialReason" },
        { title: "Cédula", key: "cif" },
        { title: "Seleccionar", key: "acciones" },
    ];

    const itemsPerPage = 50;
    const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleCheckboxChange = (client) => {
        setSelectedClient(client);
    };

    const renderRow = (item, index) => (
        <tr key={index}>
            <td>{item.code}</td>
            <td>{item.socialReason}</td>
            <td>{item.cif}</td>
            <td>
                <input
                    type="checkbox"
                    checked={selectedClient?.code === item.code}
                    onChange={() => handleCheckboxChange(item)}
                />
            </td>
        </tr>
    );

    const handleAddClick = () => {
        if (selectedClient) {
            setShowNotification(true);
        } else {
            alert('Seleccione un cliente antes de agregar.');
        }
    };

    const handleAccept = () => {
        if (selectedClient) {
            selectClient(selectedClient.code);
            closeModal();
        }
    };

    const handleCancel = () => {
        setShowNotification(false);
    };

    return (
        isOpen && (
            <div className="modal-overlay">
                <div className="modal-content">
                    <h3 className="modal-title">Clientes</h3>
                    <div className="filter-form">
                        <div className="form-group">
                            <input
                                className="customer-input"
                                type="text"
                                id="customer"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Buscar..."
                            />
                        </div>
                    </div>
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
                        onRefresh={handleRefresh}
                    />
                    <div className="basic-form-footer">
                        <button className="basic-custom-button" onClick={handleAddClick}>
                            <FontAwesomeIcon icon={faUserPlus} className="basic-shortcut-icon" />
                            Agregar
                        </button>
                    </div>
                </div>
                {showNotification && (
                    <div className="modal-overlay">
                        <div className="notification">
                            <p>Seleccionó el Cliente {selectedClient.socialReason}</p>
                            <div className="button-container-info">
                                <button className="cancel-btn-info" onClick={handleCancel}>
                                    Cancelar
                                </button>
                                <button className="ok-btn-info" onClick={handleAccept}>
                                    OK
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    );
};

export default CustomerModal;

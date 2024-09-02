import React, { useState, useEffect, useCallback } from 'react';
import './CustomerModal.css';
import Table from '../Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import apiClient from "../../axios";

const CustomerModal = ({ isOpen, closeModal, selectClient }) => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
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

    // Función que se ejecuta cuando se selecciona una fila
    const handleRowClick = (item) => {
        setSelectedClient(item);
        setShowNotification(true);
    };

    const columns = [
        { title: "Código", key: "code" },
        { title: "Rázon Social", key: "socialReason" },
        { title: "Cédula", key: "cif" }
    ];

    const itemsPerPage = 50;
    const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const renderRow = (item, index) => (
        <>
            <td onClick={() => handleRowClick(item)}>{item.code}</td>
            <td onClick={() => handleRowClick(item)}>{item.socialReason}</td>
            <td onClick={() => handleRowClick(item)}>{item.cif}</td>
        </>
    );

    const handleAccept = () => {
        if (selectedClient) {
            selectClient(selectedClient.code);
            setShowNotification(false); // Ocultar la notificación al aceptar
            closeModal();
        }
    };

    const handleCancel = () => {
        setShowNotification(false);
    };

    const handleSearch = useCallback(async () => {
        try {
            const params = new URLSearchParams();
            if (search) params.append('search', search);

            const response = await apiClient.get(`/clients?${params.toString()}`);

            if (Array.isArray(response.data)) {
                setData(response.data);
            } else {
                setData([response.data]);
            }
        } catch (error) {
            console.error("Error al obtener los datos del servicio", error);
        }
    }, [search]);

    return (
        isOpen && (
            <div className="modal-overlay">
                <div className="modal-content">
                    <h3 className="modal-title">Clientes</h3>
                    <div className="filter-form">
                        <div className="form-group">
                            <label htmlFor="customer">Cliente</label>
                            <input
                                type="text"
                                id="customer"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cliente"
                            />
                        </div>

                        <button className="search-button-modal" onClick={handleSearch}>
                            <FontAwesomeIcon icon={faSearch} className="search-icon" />
                            Buscar
                        </button>
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
                </div>
                {showNotification && selectedClient && (
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

import React, { useState, useEffect, useCallback } from 'react';
import './CustomerModal.css';
import apiClient from "../../axios";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Table from '../../components/Table';
import ClientProcess from '../Notifications/ClientProcess';
import debounce from 'lodash.debounce';
import { Tooltip } from "react-tooltip";

const CustomerModal = ({ isOpen, closeModal }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);

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

    const debouncedSearch = useCallback(
        debounce(async (searchTerm) => {
            try {
                const params = new URLSearchParams();
                if (searchTerm) params.append('search', searchTerm);

                const response = await apiClient.get(`/clients?${params.toString()}`);

                if (Array.isArray(response.data)) {
                    setData(response.data);
                } else {
                    setData([response.data]);
                }
            } catch (error) {
                console.error("Error al obtener los datos del servicio", error);
            }
        }, 300), []
    );

    useEffect(() => {
        debouncedSearch(search);
    }, [search, debouncedSearch]);



    const columns = [
        { title: "Código", key: "code" },
        { title: "Rázon Social", key: "socialReason" },
        { title: "Cédula", key: "cif" },
        { title: "Seleccionar", key: "select" }
    ];

    const itemsPerPage = 50;
    const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const renderRow = (item, index) => (
        <>
            <td>{item.code}</td>
            <td>{item.socialReason}</td>
            <td>{item.cif}</td>
          </>
    );

    return (
        isOpen && (
            <div className="modal-overlay" onClick={closeModal}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <button className="modal-close" onClick={closeModal}>X</button>
                    <div className="modal-header">
                        <h3 className="basic-info-form-title">Seleccione un Cliente</h3>
                    </div>
                    <div className="modal-body">
                        <input
                            className="modal-search"
                            type="text"
                            id="customer"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Buscar..."
                        />
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
                </div>
            </div>
        )
    );    
};
export default CustomerModal;

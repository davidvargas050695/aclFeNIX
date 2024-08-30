import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import './ModulesModal.css';
import TableModule from '../../components/TableModule';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUser } from '@fortawesome/free-solid-svg-icons';

import apiClient from "../../axios";

const ModulesModal = ({ tipocontra }) => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedModules, setSelectedModules] = useState([]);
    const navigate = useNavigate();

    const fetchAllData = async () => {
        try {
            console.log(tipocontra);
            const response = await apiClient.get(`/module_pack?tipoContra=${tipocontra}`);
            if (Array.isArray(response.data)) {
                setData(response.data);
            } else {
                setData([response.data]);
            }
        } catch (error) {
            console.error("Error al obtener los datos del servicio", error);
        }
    };
    const handleRefresh = () => {
        fetchAllData();
    };

    const handleCheckboxChange = (moduleCode) => {
        setSelectedModules(prevSelected =>
            prevSelected.includes(moduleCode)
                ? prevSelected.filter(code => code !== moduleCode)
                : [...prevSelected, moduleCode]
        );
    };

    const handleSelectAll = () => {
        if (selectedModules.length === data.length) {
            // Si todos ya están seleccionados, deselecciona todos
            setSelectedModules([]);
        } else {
            // Si no todos están seleccionados, selecciona todos
            setSelectedModules(data.map(item => item.codModulo));
        }
    };

    const columns = [
        { title: "Código", key: "code" },
        { title: "Descripción", key: "description" },
        { title: "Seleccionar", key: "acciones" },
    ];

    const itemsPerPage = 5;
    const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const renderRow = (item, index) => (
        <>
            <td>{item.codModulo}</td>
            <td>{item.description}</td>
            <td>
                <input
                    type="checkbox"
                    checked={selectedModules.includes(item.codModulo)}
                    onChange={() => handleCheckboxChange(item.codModulo)}
                />
            </td>


        </>
    );



    return (

        <div className="modal-overlay">
            <div className="modal-content-module">
                <div className="modal-content-module-body">
                    <h3 className="modal-title ">Módulos del Contrato</h3>
                    <TableModule
                        title='Módulos'
                        rows={paginatedData}
                        columns={columns}
                        icon={faUser}
                        renderRow={renderRow}
                        currentPage={currentPage}
                        totalItems={data.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={(page) => setCurrentPage(page)}
                        onRefresh={handleRefresh}
                        onSelectAll={handleSelectAll}
                        isAllSelected={selectedModules.length === data.length}
                    />

                </div>


                <div className="basic-form-footer">
                    <button className="basic-custom-button">
                        <FontAwesomeIcon icon={faPlus} className="basic-shortcut-icon" />
                        Agregar
                    </button>

                </div>

            </div>

        </div>
    );
};

export default ModulesModal;

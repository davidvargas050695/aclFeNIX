import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import './ModulesModal.css';
import SuccessProcess from '../Notifications/SuccessProcess';
import SuccessNotification from '../Notifications/SuccessNotification';
import ErrorNotification from '../Notifications/ErrorNotification';
import TableModule from '../../components/TableModule';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faCubes } from '@fortawesome/free-solid-svg-icons';

import apiClient from "../../axios";

const ModulesModal = ({ isVisible, onClose, tipocontra, numContra, channel }) => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedModules, setSelectedModules] = useState([]);
    const [numContId, setContId] = useState('');
    const [modulo, setCodigo] = useState('');
    const [numLicencias, setNumLicencias] = useState('');
    const [origen, setOrigen] = useState('');
    const [canal, setCanal] = useState('');
    const [activo, setIsActive] = useState(0);
    const [motivo, setMotivo] = useState('');
    const [isPay, setIsPay] = useState(0);
    const [maxCount, setMaxCount] = useState('');
    const [user, setUSer] = useState('');
    const [contractNumber, setContractNumber] = useState('');
    const [successVisible, setSuccessVisible] = useState(false);
    const [isErrorVisible, setIsErrorVisible] = useState(false);
    const navigate = useNavigate();

    const fetchAllData = async () => {
        try {
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

    useEffect(() => {
        if (isVisible) {
            console.log('El modal se ha abierto, recargando datos...');
            handleRefresh();
        }
    }, [isVisible]); // Incluye handleRefresh como dependencia
     // Dependencia de isVisible
    
    
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

    const handleSave = async () => {
        const payload = selectedModules.map(moduleCode => {
            const moduleData = data.find(item => item.codModulo === moduleCode);
            return {
                numContId: numContra, 
                modulo: moduleData.codModulo,
                origen: moduleData.origin,
                user: "RCH", 
                canal: channel, 
                num_licencias: moduleData.numLicencias,
                activo: moduleData.activo === 1, 
                motivo: "", 
                is_pay: moduleData.isPay === 1, 
                max_count: moduleData.maxCount,
            };
        });
        try {
            const response = await apiClient.post('/modules/bulk', payload);
            if (response.status === 200) {
                setSuccessVisible(true);
            }
        } catch (error) {
            console.error('Error al guardar el modulo', error);
            setIsErrorVisible(true);
        }
    };

    const handleCloseSuccess = () => {
        setSuccessVisible(false);
        onClose();
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
        isVisible && (
            <div className="modal-overlay">
                <div className="modal-content-module">
                    <div className="modal-content-module-body">
                        <h3 className="modal-title ">Módulos del Contrato</h3>
                        <TableModule
                            title='Módulos'
                            rows={paginatedData}
                            columns={columns}
                            icon={faCubes}
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
                        <button className="basic-custom-button" onClick={handleSave}>
                            <FontAwesomeIcon icon={faSave} className="basic-shortcut-icon" />
                            Guardar
                        </button>
                    </div>
                </div>

                <ErrorNotification
                    message="Hubo un problema al Crear el Contrato. Inténtalo de nuevo."
                    isVisible={isErrorVisible}
                    onClose={() => setIsErrorVisible(false)}
                />

                <SuccessProcess
                    message={`El Contrato se ha creado correctamente${numContra ? ` con Número de Contrato ${numContra}` : ""}.`}
                    isVisible={successVisible}
                    onClose={handleCloseSuccess}
                />

            </div>

        )

    );
};

export default ModulesModal;

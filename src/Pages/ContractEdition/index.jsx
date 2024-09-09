import React, { useState, useEffect, useCallback } from 'react';
import './ContractEdition.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header, Table, ContractForm } from '../../components';
import Section from '../../components/Section';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding,faEye, faEdit, faFileContract, faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import apiClient from "../../axios";
import { Tooltip } from "react-tooltip";
import ErrorNotification from '../../components/Notifications/ErrorNotification';
import SuccessNotification from '../../components/Notifications/SuccessNotification';

const ContractEdition = ({ handleLogout }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const location = useLocation();
  const [data, setData] = useState([]);
  const [customer] = useState(location.state?.numCont || '');
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para controlar el modal
  const navigate = useNavigate();
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(true);
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(true);

  const handleRowClick = (item) => {
    setSelectedRow(item);
    setIsModalVisible(true); // Mostrar el modal cuando se selecciona una fila
  };

  const handleRowVisualityClick = (item) => {
    setSelectedRow(item);
    setIsEdit(false);
    setIsModalVisible(true); // Mostrar el modal cuando se selecciona una fila
  };

  const handleClick = () => {
    navigate(-1);
  };

  const handleSearch = useCallback(async (page = 1) => {
    try {
      setLoading(true)
      let endPoint = `contracts/${customer}?skipLogin=true`;
      const response = await apiClient.get(endPoint);
      console.log('response::: ', response);
      if (Array.isArray(response.data.results)) {
        setData(response.data);
      } else {
        setData([response.data]);
      }
      setTotalItems(response.data.total || 1);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error("Error al obtener los datos del servicio", error);
    }
  }, [customer]);
  const onRefreshThis = () => {
    handleSearch(1)
  };
  useEffect(() => {
    handleSearch(currentPage);
  }, [handleSearch, currentPage]);

  const columns = [
    { title: "Número de contrato", key: "numCont" },
    { title: "Cliente", key: "cliente" },
    { title: "Cédula", key: "cif" },
    { title: "Acciones", key: "acciones" },
  ];
  const handleModalClose = () => {
    // Llama a la función que quieras antes de cerrar el modal
    handleSearch(currentPage);
    setIsSuccessVisible(true);
    // Luego, cierra el modal
    setIsModalVisible(false);
  };
  

  const renderRow = (item, index) => (
    <>
      <td onClick={() => handleRowClick(item)}>{item?.numCont}</td>
      <td onClick={() => handleRowClick(item)}>{item?.cliente}</td>
      <td onClick={() => handleRowClick(item)}>{item?.cif}</td>
      <td>
        <div className="button-container">
          <Tooltip id="edit-tooltip" className="custom-tooltip" />
          <button
            data-tooltip-id="edit-tooltip"
            className="icon-button edit-button"
            data-tooltip-content="Editar"
            onClick={(e) => {
              e.stopPropagation();
              handleRowClick(item)
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <Tooltip id="contract-tooltip" className="custom-tooltip" />
          <button
            className="icon-button company-button"
            onClick={(e) => {
              e.stopPropagation();
              navigate('/ModulesForm', { state: { modules: item } });
            }}
            data-tooltip-id="contract-tooltip"
            data-tooltip-content="Módulos"
          >
            <FontAwesomeIcon icon={faBuilding} />
          </button>
          <Tooltip id="edit-tooltip" className="custom-tooltip" />
          <button
            data-tooltip-id="edit-tooltip"
            className="icon-button edit-button"
            data-tooltip-content="Detalles"
            onClick={(e) => {
              e.stopPropagation(); // Evita que el clic en el botón se propague al td
              handleRowVisualityClick(item)
            }}
          >
            <FontAwesomeIcon icon={faEye} />
          </button>
        </div>
      </td>
    </>
  );

  return (
    <div className="home-container">
      <Header onLogout={handleLogout} title='Contratos' />
      <div className="home-content">
      <Section>
      <div className="button-return-container">
          <FontAwesomeIcon
            className="basic-shortcut-icon"
            style={{ cursor: 'pointer' }}
            icon={faCircleArrowLeft}
            onClick={handleClick}
          />
        </div>
        </Section>
        <Table
          title={`Detalle del Contrato (${data[0]?.numCont}) del Cliente (${data[0]?.razonSocial}) con identificación (${data[0]?.cif})`}
          rows={data}
          columns={columns}
          icon={faFileContract}
          renderRow={renderRow}
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => setCurrentPage(page)}
          selectedRow={selectedRow}
          onRefresh={onRefreshThis}
            loading={loading}
        />
      </div>

      {/* Modal */}
      {isModalVisible && (
        <div className="modal-overlay-edit">
          <div className="modal-content-edit">
          <ContractForm selectedRow={selectedRow} isEdit={isEdit} closeModal={handleModalClose} />
          </div>
        </div>
      )}

      <SuccessNotification
        message={"Se ha cargado correctamente"}
        isVisible={isSuccessVisible}
        onClose={() => setIsSuccessVisible(false)}
      />
      <ErrorNotification
        message="Ups! Ocurrio un Problema"
        isVisible={isErrorVisible}
        onClose={() => setIsErrorVisible(false)}
      />
    </div>
  );
};

export default ContractEdition;

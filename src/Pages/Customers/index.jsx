import React, { useState, useEffect, useCallback } from 'react';
import './Customer.css';
import Header from '../../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SuccessNotification from '../../components/Notifications/SuccessNotification';
import ErrorNotification from '../../components/Notifications/ErrorNotification';
import { faEdit, faTrashAlt, faUser, faFileContract, faUserPlus, faEye } from '@fortawesome/free-solid-svg-icons';
import Table from '../../components/Table'; 
import Section from '../../components/Section';
import SlideModal from '../../components/SlideModal';
import apiClient from "../../axios"; 
import { Tooltip } from "react-tooltip";
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';

const Customer = ({ handleLogout }) => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const itemsPerPage = 10;
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = async (item) => {
    if(!isModalOpen) {
      try {
        const response = await apiClient.get(`/clients/${item.code}`);
        const customer = {
          general: item,
          alternative: response.data,
        }
        setSelectedItem(customer);
        setIsModalOpen(!isModalOpen);
      } catch (error) {
        setIsErrorVisible(true);
      } finally {
        setIsSuccessVisible(true);
      }
    } else {
      setIsModalOpen(!isModalOpen);
    }
  };

  const fetchAllData = async (page = 1) => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/clients?page=${page}`);
      if (Array.isArray(response.data.results)) {
        setData(response.data.results);
        setTotalItems(response.data.total);
      } else {
        setData([response.data.results]);
        setTotalItems(1);
      }
    } catch (error) {
      setIsErrorVisible(true);
    } finally {
      setIsSuccessVisible(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData(currentPage);
  }, [currentPage]);

  const handleRefresh = () => {
    fetchAllData(currentPage);
  };
// eslint-disable-next-line react-hooks/exhaustive-deps
const debouncedSearch = useCallback(
  debounce(async (searchTerm) => {
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);

      const response = await apiClient.get(`/clients?${params.toString()}&page=${currentPage}`);

      if (Array.isArray(response.data.results)) {
        setData(response.data.results);
        setTotalItems(response.data.total); // Actualiza el total de elementos según la búsqueda
      } else {
        setData([response.data.results]);
        setTotalItems(1);
      }
    } catch (error) {
      setIsErrorVisible(true);
    }
  }, 300), [currentPage] // Dependencia en currentPage para cambiar la página en el paginado
);

  

  useEffect(() => {
    debouncedSearch(search); // Ejecuta la búsqueda cuando cambie el valor de search
  }, [search, debouncedSearch]);

  const handleDelete = async (code) => {
    try {
      const url = `/clients/${code}`;
      await apiClient.delete(url);
      // setData(data.filter(item => item.code !== code));
      // console.log(`Eliminado con éxito el cliente con código: ${code}`);
      handleRefresh();
    } catch (error) {
      setIsErrorVisible(true);
    }
  };

  const columns = [
    { title: "Código", key: "code" },
    { title: "Rázon Social", key: "socialReason" },
    { title: "Cédula", key: "cif" },
    { title: "Creado", key: "created" },
    { title: "Acciones", key: "acciones" },
  ];

  const renderRow = (item, index) => (
    <>
      <td>{item.code}</td>
      <td>{item.socialReason}</td>
      <td>{item.cif}</td>
      <td>{item.created}</td>
      <td>
        <div className="button-container">
          <Tooltip id="edit-tooltip" className="custom-tooltip" />
          <button
            data-tooltip-id="edit-tooltip"
            className="icon-button edit-button"
            data-tooltip-content="Editar"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/ClientForm/${item.code}`);
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <Tooltip id="delete-tooltip" className="custom-tooltip" />
          <button
            data-tooltip-id="delete-tooltip"
            data-tooltip-content="Eliminar"
            className="icon-button delete-button"
            onClick={() => handleDelete(item.code)}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
          <Tooltip id="contract-tooltip" className="custom-tooltip" />
          <button
            className="icon-button company-button"
            onClick={(e) => {
              e.stopPropagation();
              navigate('/Contract', { state: { customer: item.code } });
            }}
            data-tooltip-id="contract-tooltip"
            data-tooltip-content="Contratos"
          >
            <FontAwesomeIcon icon={faFileContract} />
          </button>
          <button
            className="icon-button company-button"
            onClick={() => toggleModal(item)}
            data-tooltip-id="contract-tooltip"
            data-tooltip-content="Detalle"
          >
            <FontAwesomeIcon icon={faEye} />
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
            <div className="form-group">
              <label htmlFor="customer">CLIENTES</label>
              <input
                className="customer-input"
                type="text"
                id="customer"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar..."
              />
            </div>
          </div>
          <div className="button-add">
            <button
              className="basic-custom-button"
              onClick={(e) => {
                e.stopPropagation();
                navigate('/ClientForm');
              }}
            >
              <FontAwesomeIcon className="basic-shortcut-icon" icon={faUserPlus} />
              Crear Nuevo Cliente
            </button>
          </div>
        </Section>
        
        <Table
          title="Lista de Clientes"
          rows={data}
          columns={columns}
          icon={faUser}
          renderRow={renderRow}
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onRefresh={handleRefresh}
          loading={loading}
        />
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
      <SlideModal isOpen={isModalOpen} onClose={toggleModal} title="Detalles del Cliente">
      <div className="section-container-form">
        <h4 className="section-title-form">CÓDIGO</h4>
        <hr className="section-divider-form" />
        <div className="form-group-form">
          <label>{selectedItem?.general.code}</label>
        </div>
        
        <h4 className="section-title-form">RÁZON SOCIAL</h4>
        <hr className="section-divider-form" />
        <div className="form-group-form">
          <label>{selectedItem?.general.socialReason}</label>
        </div>
        
        <h4 className="section-title-form">CÉDULA</h4>
        <hr className="section-divider-form" />
        <div className="form-group-form">
          <label>{selectedItem?.general.cif}</label>
        </div>
        
        <h4 className="section-title-form">NOMBRE COMERCIAL</h4>
        <hr className="section-divider-form" />
        <div className="form-group-form">
          <label>{selectedItem?.general.comercialName}</label>
        </div>
        <h4 className="section-title-form">DIRECCIÓN</h4>
        <hr className="section-divider-form" />
        <div className="form-group-form">
          <label>{selectedItem?.alternative.direc1 || selectedItem?.alternative.direc2}</label>
        </div>
        <h4 className="section-title-form">DISTRIBUIDOR</h4>
        <hr className="section-divider-form" />
        <div className="form-group-form">
          <label>{selectedItem?.alternative.distribuidor}</label>
        </div>
        <h4 className="section-title-form">TELÉFONO</h4>
        <hr className="section-divider-form" />
        <div className="form-group-form">
          <label>{selectedItem?.alternative.tlf1}</label>
        </div>    
        </div>
      </SlideModal>
      </div>
    </div>
  );
};

export default Customer;

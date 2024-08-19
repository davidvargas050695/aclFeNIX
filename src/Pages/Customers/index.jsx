import React, { useState, useEffect, useCallback } from 'react';
import './Customer.css';
import Header from '../../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEdit, faTrashAlt, faUser, faFileContract } from '@fortawesome/free-solid-svg-icons';
import Table from '../../components/Table'; // Asegúrate de que el path sea correcto
import Section from '../../components/Section';
import apiClient from "../../axios"; // Asegúrate de tener configurado tu cliente API
import { Tooltip } from "react-tooltip";
import { useNavigate } from 'react-router-dom'

const Customer = ({ handleLogout }) => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const handleSearch = useCallback(async () => {
    try {
      // Construir la URL con los query params
      const params = new URLSearchParams();
      if (search) params.append('search', search);

      const response = await apiClient.get(`/clients?${params.toString()}`);
      
      if (Array.isArray(response.data)) {
        setData(response.data); // Si es un array, lo dejamos tal cual
      } else {
        setData([response.data]); // Si es un objeto, lo encapsulamos en un array
      }
      
    } catch (error) {
      console.error("Error al obtener los datos del servicio", error);
    }
  }, [search]);

  useEffect(() => {
    handleSearch(); // Llama a la función handleSearch cuando se carga el componente
  }, [handleSearch]); // Añade handleSearch como dependencia

  const columns = [
    { title: "Código", key: "code" },
    { title: "Rázon Social", key: "socialReason" },
    { title: "Cédula", key: "cif" },
    { title: "Creado", key: "created" },
    { title: "Acciones", key: "acciones" },
  ];

  const itemsPerPage = 50;
  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  
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
              handleSearch();
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <Tooltip id="delete-tooltip" className="custom-tooltip" />
          <button
            data-tooltip-id="delete-tooltip"
            data-tooltip-content="Eliminar"
            className="icon-button delete-button"
            onClick={(e) => {
              e.stopPropagation();
              // Aquí va tu lógica para eliminar
              console.log('Eliminar', item.numCont);
            }}
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
        </div>
      </td>
    </>
  );
  
  const handleRefresh = () => {
    handleSearch();
  };

  return (
    <div className="home-container">
      <Header onLogout={handleLogout} title='Contratos' />
      
      <div className="home-content">
        <Section>
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
            <button className="search-button" onClick={handleSearch}>
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              Buscar
            </button>
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
          onRefresh={handleRefresh}
        />
      </div>
    </div>
  );
};

export default Customer;

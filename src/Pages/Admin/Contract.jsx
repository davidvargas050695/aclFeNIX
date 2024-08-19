import React, { useState, useEffect, useCallback } from 'react';
import './Contract.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEdit, faTrashAlt, faBuilding, faFileContract } from '@fortawesome/free-solid-svg-icons';
import Table from '../../components/Table'; // Asegúrate de que el path sea correcto
import Section from '../../components/Section';
import apiClient from "../../axios"; // Asegúrate de tener configurado tu cliente API
import { Tooltip } from "react-tooltip";

const Contract = ({ handleLogout }) => {
  const [data, setData] = useState([]);
  const [contract, setContract] = useState('');
  const [search, setSearch] = useState('');
  const location = useLocation();
  const { customer } = location.state || {};
  console.log('customer::: ', customer);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // Memoiza la función handleSearch
  const handleSearch = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (customer) params.append('customer', customer);
      const endpoint = customer ? '/contracts/1' : `/contracts/${contract}`;
      const response = await apiClient.get(`${endpoint}?${params.toString()}`);
      
      if (Array.isArray(response.data)) {
        setData(response.data);
      } else {
        setData([response.data]);
      }
      if (customer) {
        navigate(location.pathname, { replace: true, state: { ...location.state, customer: null } });
      }
    } catch (error) {
      console.error("Error al obtener los datos del servicio", error);
    }
  }, [search, contract, customer, navigate, location.pathname, location.state]);

  // Ejecuta handleSearch cuando el componente se monta
  useEffect(() => {
    handleSearch();
  }, [handleSearch]); // Incluye handleSearch en el array de dependencias

  const columns = [
    { title: "Número de contrato", key: "numCont" },
    { title: "Cliente", key: "razonSocial" },
    { title: "Cédula", key: "cif" },
    { title: "Acciones", key: "acciones" },
  ];

  const itemsPerPage = 50;
  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const renderRow = (item, index) => (
    <>
      <td>{item.numCont}</td>
      <td>{item.razonSocial}</td>
      <td>{item.cif}</td>
      <td>
        <div className="button-container">
          <Tooltip id="edit-tooltip" className="custom-tooltip" />
          <button
            data-tooltip-id="edit-tooltip"
            className="icon-button edit-button"
            data-tooltip-content="Editar"
            onClick={(e) => {
              e.stopPropagation();
              console.log('Editar', item.numCont);
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
              navigate('/ModulesForm', { state: { modules: item.modules } });
            }}
            data-tooltip-id="contract-tooltip"
            data-tooltip-content="Módulos"
          >
            <FontAwesomeIcon icon={faBuilding} />
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
          <div className="filter-form">
            <div className="form-group">
              <label htmlFor="contract">Contrato</label>
              <input
                type="text"
                id="contract"
                value={contract}
                onChange={(e) => setContract(e.target.value)}
                placeholder="Contrato"
              />
            </div>
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
          title='Lista de Contratos' 
          rows={paginatedData} 
          columns={columns} 
          icon={faFileContract}
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

export default Contract;

import React, { useState, useEffect, useCallback } from 'react';
import './Customer.css';
import Header from '../../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEdit, faTrashAlt, faUser, faFileContract, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Table from '../../components/Table'; 
import Section from '../../components/Section';
import apiClient from "../../axios"; 
import { Tooltip } from "react-tooltip";
import { useNavigate } from 'react-router-dom'
import debounce from 'lodash.debounce';

const Customer = ({ handleLogout }) => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

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

  const handleDelete = async (code) => {
    try {
      const url = `/clients/${code}`;
      await apiClient.delete(url);
      setData(data.filter(item => item.code !== code));
    } catch (error) {
      console.error(`Error al eliminar el cliente con código: ${code}`, error);
    }
  };

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

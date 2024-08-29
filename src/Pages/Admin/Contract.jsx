import React, { useState, useEffect, useCallback } from 'react';
import './Contract.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header, ActionButton, Table, ContractForm } from '../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEdit, faTrashAlt, faBuilding, faFileContract, faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import Section from '../../components/Section';
import apiClient from "../../axios";
import { Tooltip } from "react-tooltip";


const Contract = ({ handleLogout }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  const [contract, setContract] = useState('');
  const [search, setSearch] = useState('');
  const location = useLocation();
  const { customer } = location.state || {};
  console.log('customer::: ', customer);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // Función que se ejecuta cuando se selecciona una fila
  const handleRowClick = (item) => {
    console.log('item::: ', item);
    setSelectedRow(item);
  };

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
    <tr onClick={() => handleRowClick(item)} key={index}>
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
    </tr>
  );

  return (
    <div className="home-container-form">
      <Header onLogout={handleLogout} title='Contratos' />
      <div className="main-content">
        <div className="home-content-form">
          <Section>
            <div className="filter-form">
              <div className="form-group-contract ">
                <input
                  className="contract-input"
                  type="text"
                  id="contract"
                  value={contract}
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
                  navigate('/ContractNew');
                }}
              >
                <FontAwesomeIcon className="basic-shortcut-icon" icon={faFileCirclePlus} />
                Crear Nuevo Contrato
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
            selectedRow={selectedRow}
          />
        </div>
        <div className="additional-info-container">
          <div>
            <ContractForm selectedRow={selectedRow} />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Contract;
import React, { useState, useEffect, useCallback } from 'react';
import './Contract.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header, Table, ContractForm } from '../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faBuilding, faFileContract, faFileCirclePlus, faSearchPlus } from '@fortawesome/free-solid-svg-icons';
import Section from '../../components/Section';
import apiClient from "../../axios";
import { Tooltip } from "react-tooltip";


const Contract = ({ handleLogout }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [customers, setCustomers] = useState('');
  const location = useLocation();
  const [totalItems, setTotalItems] = useState(0);
  const [contract, setContract] = useState('');
  const [tempSearch, setTempSearch] = useState(''); // Temporal
  const [tempCustomers, setTempCustomers] = useState(''); // Temporal
  const { customer } = location.state || {};
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // Función que se ejecuta cuando se selecciona una fila
  const handleRowClick = (item) => {
    setSelectedRow(item);
  };

  // Memoiza la función handleSearch
  const handleSearch = useCallback(async (page = 1) => {
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (customer) params.append('customer', customer);
      if (search) params.append('search', search);
      if (customers) params.append('customer', customers);
      const endpoint = customer ? '/contracts' : `/contracts/${contract}`;
      const response = await apiClient.get(`${endpoint}?${params.toString()}&page=${page}`);
      // Realizar la solicitud a la API
      if (Array.isArray(response.data.results)) {
        setData(response.data.results);
      } else {
        setData(response.data);
      }
      setTotalItems(response.data.total); //
      if (customer) {
        navigate(location.pathname, { replace: true, state: { ...location.state, customer: null } });
      }
    } catch (error) {
      console.error("Error al obtener los datos del servicio", error);
    }
  }, [search, contract, customers, navigate, location.pathname, location.state]);

  // Ejecuta handleSearch cuando el componente se monta
  useEffect(() => {
    handleSearch(currentPage);
  }, [handleSearch, currentPage, search, customers]); // Incluye handleSearch en el array de dependencias

  const columns = [
    { title: "Número de contrato", key: "numCont" },
    { title: "Cliente", key: "razonSocial" },
    { title: "Cédula", key: "cif" },
    { title: "Acciones", key: "acciones" },
  ];

  const itemsPerPage = 10;

  const renderRow = (item, index) => (
    <>
      <td onClick={() => handleRowClick(item)}>{item.numCont}</td>
      <td onClick={() => handleRowClick(item)}>{item.razonSocial}</td>
      <td onClick={() => handleRowClick(item)}>{item.cif}</td>
      <td>
        <div className="button-container">
          <Tooltip id="edit-tooltip" className="custom-tooltip" />
          <button
            data-tooltip-id="edit-tooltip"
            className="icon-button edit-button"
            data-tooltip-content="Editar"
            onClick={(e) => {
              e.stopPropagation(); // Evita que el clic en el botón se propague al td
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
              e.stopPropagation(); // Evita que el clic en el botón se propague al td
              console.log('Eliminar', item.numCont);
            }}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
          <Tooltip id="contract-tooltip" className="custom-tooltip" />
          <button
            className="icon-button company-button"
            onClick={(e) => {
              e.stopPropagation(); // Evita que el clic en el botón se propague al td
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
  const assignSearchValues = () => {
    setSearch(tempSearch);
    setCustomers(tempCustomers);
    handleSearch(); // Ejecuta la búsqueda después de asignar los valores
  };
  return (
    <div className="home-container-form">
      <Header onLogout={handleLogout} title='Contratos' />
      <Section><div className="button-add-contract">
              <button
                className="basic-contract-button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/ContractNew');
                }}
              >
                <FontAwesomeIcon className="basic-shortcut-icon" icon={faFileCirclePlus} />
                Crear Nuevo Contrato
              </button>
            </div> </Section>
      <div className="main-content">
        <div className="home-content-form">
        <Section>
            <div className="filter-form">
              <div className="form-group-contract ">
                <input
                  className="contract-input"
                  type="text"
                  id="search"
                  value={tempSearch}
                  onChange={(e) => setTempSearch(e.target.value)}
                  placeholder="Contrato"
                />
              </div>
              <div className="form-group-contract ">
                <input
                  className="contract-input"
                  type="text"
                  id="customers"
                  value={tempCustomers}
                  onChange={(e) => setTempCustomers(e.target.value)}
                  placeholder="Cliente"
                />
              </div>
            </div>
            <div className="button-add">
              <button
                className="basic-custom-button"
                onClick={() => assignSearchValues()}
              >
                <FontAwesomeIcon className="basic-shortcut-icon" icon={faSearchPlus} />
                Buscar
              </button>
            </div>
          </Section>
          <Table
            title='Lista de Contratos'
            rows={data}
            columns={columns}
            icon={faFileContract}
            renderRow={renderRow}
            currentPage={currentPage}
            totalItems={totalItems}
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
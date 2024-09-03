import React, { useState, useEffect, useCallback } from 'react';
import './Contract.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header, Table, ContractForm } from '../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faBuilding, faFileContract, faFileCirclePlus, faSearchPlus } from '@fortawesome/free-solid-svg-icons';
import Section from '../../components/Section';
import apiClient from "../../axios";
import { Tooltip } from "react-tooltip";
import ErrorNotification from '../../components/Notifications/ErrorNotification';
import SuccessNotification from '../../components/Notifications/SuccessNotification';

const Contract = ({ handleLogout }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const location = useLocation();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(''); // Estado definitivo para la búsqueda
  const [customer, setCustomer] = useState(location.state?.customer || ''); // Estado definitivo para la búsqueda
  const [totalItems, setTotalItems] = useState(0);
  const [tempSearch, setTempSearch] = useState(''); // Temporal para el input de contrato
  const [tempCustomers, setTempCustomers] = useState(''); // Temporal para el input de cliente
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const itemsPerPage = 10;
  // Definición de la función handleRowClick
  const handleRowClick = (item) => {
    setSelectedRow(item);
    // Aquí puedes agregar cualquier lógica adicional que necesites cuando se haga clic en una fila
  };

  // Función de búsqueda
  const handleSearch = useCallback(async (page = 1) => {
    try {
      let endPoint = 'contracts/1';
      if (customer) {
        endPoint += `?customer=${customer}`;
      } else if (search) {
        endPoint += `?search=${search}`;
      }

      const response = await apiClient.get(endPoint);
      console.log('response::: ', response);
      if (Array.isArray(response.data)) {
        setData(response.data);
      } else {
        setData([response.data]);
      }
      setTotalItems(response.data.total); 
    } catch (error) {
      console.error("Error al obtener los datos del servicio", error);
    }
  }, [search, customer]);

  // Ejecuta handleSearch cuando el componente se monta
  useEffect(() => {
    handleSearch(currentPage);
  }, [handleSearch, currentPage]); 

  // Asigna los valores definitivos y ejecuta la búsqueda
  const assignSearchValues = () => {
    if (tempSearch) {
      setSearch(tempSearch);
      setCustomer(''); // Limpia cliente si hay algo en contrato
    } else if (tempCustomers) {
      setCustomer(tempCustomers);
      setSearch(''); // Limpia contrato si hay algo en cliente
    }
  };
  
  const columns = [
    { title: "Número de contrato", key: "numCont" },
    { title: "Cliente", key: "cliente" },
    { title: "Cédula", key: "cif" },
    { title: "Acciones", key: "acciones" },
  ];


  const renderRow = (item, index) => (
    <>
      <td onClick={() => handleRowClick(item)}>{item.numCont}</td>
      <td onClick={() => handleRowClick(item)}>{item.cliente}</td>
      <td onClick={() => handleRowClick(item)}>{item.cif}</td>
      <td>
        <div className="button-container">
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
    <div className="home-container-form">
      <Header onLogout={handleLogout} title='Contratos' />
      <Section>
        <div className="button-add-contract">
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
        </div>
      </Section>
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
                  onChange={(e) => {
                    setTempSearch(e.target.value);
                    setTempCustomers(''); // Limpia cliente cuando escribes en contrato
                  }}
                  placeholder="Contrato"
                />
              </div>
              <div className="form-group-contract ">
                <input
                  className="contract-input"
                  type="text"
                  id="customers"
                  value={tempCustomers}
                  onChange={(e) => {
                    setTempCustomers(e.target.value);
                    setTempSearch(''); // Limpia contrato cuando escribes en cliente
                  }}
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
      <SuccessNotification
                    message={"Datos cargados correctamente"}
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

export default Contract;

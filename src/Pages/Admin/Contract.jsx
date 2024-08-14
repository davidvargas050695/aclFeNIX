import React, { useState } from 'react';
import './Contract.css';
import Header from '../../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEdit, faTrashAlt, faBuilding, faUser } from '@fortawesome/free-solid-svg-icons';
import Table from '../../components/Table'; // Asegúrate de que el path sea correcto
import Section from '../../components/Section';
import apiClient from "../../axios"; // Asegúrate de tener configurado tu cliente API
import { Tooltip } from "react-tooltip";

const Contract = ({ handleLogout }) => {
  const [data, setData] = useState([]);
  const [contract, setContract] = useState('');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = async () => {
    try {
      // Construir la URL con los query params
      const params = new URLSearchParams();
      if (search) params.append('search', search);

      const response = await apiClient.get(`/contracts/${contract}?${params.toString()}`);
      
      if (Array.isArray(response.data)) {
        setData(response.data); // Si es un array, lo dejamos tal cual
      } else {
        setData([response.data]); // Si es un objeto, lo encapsulamos en un array
      }
    } catch (error) {
      console.error("Error al obtener los datos del servicio", error);
    }
  };

  const columns = [
    { title: "Número de contrato", key: "numCont" },
    { title: "Cliente", key: "razonSocial" },
    { title: "Cédula", key: "cif" },
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
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button className="icon-button delete-button" onClick={() => console.log('Eliminando', item.numCont)}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
          <button className="icon-button company-button" onClick={() => console.log('Viendo compañías', item.numCont)}>
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
          icon={faUser}
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

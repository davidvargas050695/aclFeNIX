import React, { useState, useEffect } from 'react';
import './Module.css';
import Header from '../../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faBuilding, faUser } from '@fortawesome/free-solid-svg-icons';
import Table from '../../components/Table'; // Asegúrate de que el path sea correcto
import Section from '../../components/Section';
import apiClient from "../../axios"; // Asegúrate de tener configurado tu cliente API
import { Tooltip } from "react-tooltip";

const Module = ({ handleLogout }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Este useEffect se ejecuta una vez cuando el componente se monta
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/modules');
        
        if (Array.isArray(response.data)) {
          setData(response.data); // Si es un array, lo dejamos tal cual
        } else {
          setData([response.data]); // Si es un objeto, lo encapsulamos en un array
        }
      } catch (error) {
        console.error("Error al obtener los datos del servicio", error);
      }
    };

    fetchData(); // Llamar a la función para obtener los datos
  }, []); // El array vacío [] asegura que este efecto se ejecute solo una vez al montar el componente

  const columns = [
    { title: "descripcion", key: "descripcion" },
    { title: "origen", key: "origen" },
    { title: "codigo", key: "codigo" },
  ];

  const itemsPerPage = 50;
  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const renderRow = (item, index) => (
    <>
      <td>{item.descripcion}</td>
      <td>{item.origen}</td>
      <td>{item.codigo}</td>
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
          </div>
        </Section>
        <Table 
          title='Lista de Módulos' 
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

export default Module;

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './ModulesForm.css';
import { faThLarge, faClipboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Header, ActionButton, Table, ContractForm } from '../../components';

const ModulesForm = ({ handleLogout }) => {
  const location = useLocation();
  const { modules } = location.state || {};
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data] = useState(modules); // Estado para almacenar los datos

  const columns = [
    { title: "Descripción", key: "descripcion" },
    { title: "Módulo", key: "modulo" },
    { title: "Origen", key: "origen" },
    { title: "Contrato", key: "numContId" },
  ];

  const itemsPerPage = 50;
  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const renderRow = (item, index) => (
    <>
      <td>{item.descripcion}</td>
      <td>{item.modulo}</td>
      <td>{item.origen}</td>
      <td>{item.numContId}</td>
    </>
  );

  // Función que se ejecuta cuando se selecciona una fila
  const handleRowClick = (item) => {
    console.log('item::: ', item);
    setSelectedRow(item);
  };

  // Función para actualizar la información
  const handleRefresh = () => {
    // Aquí puedes realizar una llamada a un servicio para obtener los datos actualizados
    // Por ejemplo, si estás usando fetch o axios:
    /*
    fetch('/api/your-endpoint')
      .then(response => response.json())
      .then(newData => {
        setData(newData);
      })
      .catch(error => {
        console.error('Error al actualizar los datos:', error);
      });
    */
    console.log("Datos actualizados"); // Simulación de actualización
  };

  return (
    <div className="home-container-form">
      <Header onLogout={handleLogout} title='Contratos' />
      <div className="actions-container-form">
        <ActionButton icon={<FontAwesomeIcon icon={faClipboard} />} text="AGREGAR MÓDULO"/>
      </div>
      <div className="main-content">
        <div className="home-content-form"> 
          <Table 
            title='Lista de contratos por módulos' 
            rows={paginatedData} 
            columns={columns} 
            icon={faThLarge}
            renderRow={renderRow}
            currentPage={currentPage}
            totalItems={data.length}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
            onRowClick={handleRowClick}
            selectedRow={selectedRow}
            onRefresh={handleRefresh} // Pasar la función de actualización al componente Table
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

export default ModulesForm;

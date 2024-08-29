import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ModulesForm.css';
import Section from '../../components/Section';
import { faThLarge, faClipboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Header, ActionButton, Table, ContractForm } from '../../components';
import { faEdit, faTrashAlt, faBan, faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from "react-tooltip";

const ModulesForm = ({ handleLogout }) => {
  const location = useLocation();
  const { modules } = location.state || {};
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data] = useState(modules); // Estado para almacenar los datos
  const navigate = useNavigate();


  const handleGoBack = () => {
    navigate(-1);
  };

  const columns = [
    { title: "Descripción", key: "descripcion" },
    { title: "Módulo", key: "modulo" },
    { title: "Origen", key: "origen" },
    { title: "Contrato", key: "numContId" },
    { title: "Acciones", key: "acciones" }
  ];

  const itemsPerPage = 50;
  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const renderRow = (item, index) => (
    <>
      <td>{item.descripcion}</td>
      <td>{item.modulo}</td>
      <td>{item.origen}</td>
      <td>{item.numContId}</td>
      <td>
        <div className="button-container">
          <Tooltip id="edit-tooltip" className="custom-tooltip" />
          <button
            data-tooltip-id="edit-tooltip"
            className="icon-button edit-button"
            data-tooltip-content="Editar"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/ModuleContract/${item.id}`);
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <Tooltip id="delete-tooltip" className="custom-tooltip" />
          <button
            data-tooltip-id="delete-tooltip"
            data-tooltip-content="Eliminar"
            className="icon-button delete-button"

          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
          <Tooltip id="contract-tooltip" className="custom-tooltip" />
          <button
            className="icon-button company-button"
            data-tooltip-id="contract-tooltip"
            data-tooltip-content="Bloquear"
          >
            <FontAwesomeIcon icon={faBan} />
          </button>
        </div>
      </td>
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
    <div className="home-container">
      <Header onLogout={handleLogout} title='Módulos por Contrato' />
      <div className="home-content">
        <Section>
          <div className="button-return-container">
            <FontAwesomeIcon
              className="basic-shortcut-icon"
              style={{ cursor: 'pointer' }}
              icon={faCircleArrowLeft}

            />
          </div>
          <div className="button-add">
            <button
              className="basic-custom-button"
              onClick={(e) => {
                e.stopPropagation();
                navigate('/ModuleList');
              }}
            >
              <FontAwesomeIcon className="basic-shortcut-icon" icon={faClipboard} />
              Agregar Módulo
            </button>
          </div>
        </Section>
        <Table
          title='Lista de módulos por contratos '
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
    </div>
  );
};

export default ModulesForm;

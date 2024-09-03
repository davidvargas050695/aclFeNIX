import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ModulesForm.css';
import ModalStatus from '../../components/Notifications/ModuleStatus';
import Section from '../../components/Section';
import { faThLarge, faClipboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Header, ActionButton, Table, ContractForm } from '../../components';
import { faEdit, faTrashAlt, faCircleCheck, faCircleXmark, faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from "react-tooltip";
import apiClient from "../../axios";

const ModulesForm = ({ handleLogout }) => {
  const location = useLocation();
  const { modules } = location.state || {};
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState(null);
  const navigate = useNavigate();
  const [data, setData] = useState(modules || []); // Estado inicial con los datos
  const [status, setStatus] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [numContId, setnumContId] = useState(null);

  useEffect(() => {
    handleRefresh(); // Cargar datos al montar el componente
  }, []);

  const handleStatusClick = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
    handleRefresh(); 
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  const handleClick = () => {
    navigate(-1);
  };

  const handleDelete = async (id) => {
    try {
      const url = `/modules/${id}`;
      await apiClient.delete(url);
      handleRefresh(); 
    } catch (error) {
      console.error('Error al eliminar el Módulo');
    }
  };

  const handleRefresh = async () => {
    try {
      const response = await apiClient.get('/modules');
      setData(response.data);
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
    }
  };

  const columns = [
    { title: "Descripción", key: "descripcion" },
    { title: "Módulo", key: "modulo" },
    { title: "Origen", key: "origen" },
    { title: "Contrato", key: "numContId" },
    { title: "Estado", key: "acciones" },
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
        {item.activo ? (
          <button
            className="status_button"
            onClick={() => handleStatusClick(item)}
            
          >
            <FontAwesomeIcon icon={faCircleCheck} style={{ color: 'green', fontSize: '24px' }} />
          </button>
        ) : (
          <button
            className="status_button"
            onClick={() => handleStatusClick(item)}
          >
            <FontAwesomeIcon className="status_icon" icon={faCircleXmark} style={{ color: 'red', fontSize: '24px' }} />
          </button>
        )}
      </td>
      <td>
        <div className="button-container">
          <Tooltip id="edit-tooltip" className="custom-tooltip" />
          <button
            data-tooltip-id="edit-tooltip"
            className="icon-button edit-button"
            data-tooltip-content="Editar"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/ModuleContract?moduleId=${item.id}`);
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <Tooltip id="delete-tooltip" className="custom-tooltip" />
          <button
            data-tooltip-id="delete-tooltip"
            data-tooltip-content="Eliminar"
            className="icon-button delete-button"
            onClick={() => handleDelete(item.id)}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      </td>
    </>
  );

  const handleRowClick = (item) => {
    console.log('item::: ', item);
    setSelectedRow(item);
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
              onClick={handleClick}
            />
          </div>
          <div className="button-add">
            <button
              className="basic-custom-button"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/ModuleContract?numContId=${numContId}`);
              }}
            >
              <FontAwesomeIcon className="basic-shortcut-icon" icon={faClipboard} />
              Agregar Módulo
            </button>
          </div>
        </Section>
        <Table
          title='Lista de módulos por contratos'
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
        {selectedItem && (
          <ModalStatus
            message={selectedItem.activo
              ? 'Módulo Activo. ¿Desea Inactivarlo?'
              : 'Módulo Inactivo. ¿Desea Activarlo?'}
            isVisible={modalVisible}
            onClose={handleCloseModal}
            numContId={selectedItem.numContId}
            modulo={selectedItem.modulo}
            activo={selectedItem.activo}
          />
        )}
      </div>
    </div>
  );
};

export default ModulesForm;
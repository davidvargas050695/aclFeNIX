import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import './Module.css';
import Header from '../../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SuccessNotification from '../../components/Notifications/SuccessNotification';
import ErrorNotification from '../../components/Notifications/ErrorNotification';
import { faEdit, faTrashAlt, faCirclePlus,faCube } from '@fortawesome/free-solid-svg-icons';
import Table from '../../components/Table'; // Asegúrate de que el path sea correcto
import Section from '../../components/Section';
import apiClient from "../../axios"; // Asegúrate de tener configurado tu cliente API
import { Tooltip } from "react-tooltip";


const Module = ({ handleLogout }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;
  // Este useEffect se ejecuta una vez cuando el componente se monta
  useEffect(() => {
    fetchData(currentPage); // Llamar a la función para obtener los datos
  }, [currentPage]); // El array vacío [] asegura que este efecto se ejecute solo una vez al montar el componente
 
  const fetchData = async (page = 1) => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/products?page=${page}`);

      if (Array.isArray(response.data.results)) {
        setData(response.data.results); // Si es un array, lo dejamos tal cual
        setTotalItems(response.data.total);
      } else {
        setData([response.data.results]); // Si es un objeto, lo encapsulamos en un array
      }
      setIsSuccessVisible(true);
    } catch (error) {
      setIsErrorVisible(true);
    } finally {
      setIsSuccessVisible(true);
      setLoading(false);
    }
  };
  const handleRefresh = () => {
    fetchData(currentPage);
  };

  const handleDelete = async (id) => {
    try {
      const url = `/products/${id}`;
      await apiClient.delete(url);
      // Después de eliminar, actualizamos la lista filtrando el elemento eliminado
      // setData(data.filter(item => item.id !== id));
      handleRefresh(); 
    } catch (error) {
      setIsErrorVisible(true);
    }
  };
  const columns = [
    { title: "descripcion", key: "descripcion" },
    { title: "origen", key: "origen" },
    { title: "codigo", key: "codigo" },
    { title: "Acciones", key: "acciones" },
  ];


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
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/ModuleNew/${item.id}`);
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

  return (
    <div className="home-container">
      <Header onLogout={handleLogout} title='Módulos' />

      <div className="home-content">
        <Section>
          <div className="filter-form">
          </div>
          <div className="button-add">
            <button
              className="basic-custom-button"
              onClick={(e) => {
                e.stopPropagation();
                navigate('/ModuleNew');
              }}
            >
              <FontAwesomeIcon className="basic-shortcut-icon" icon={faCirclePlus} />
              Crear Nuevo Módulo
            </button>
          </div>
        </Section>
        <Table
          title='Lista de Módulos'
          rows={data}
          columns={columns}
          icon={faCube}
          renderRow={renderRow}
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onRefresh={handleRefresh}
          onPageChange={(page) => setCurrentPage(page)}
          loading={loading}
        />
           <SuccessNotification
        message={"Se ha cargado correctamente"}
        isVisible={isSuccessVisible}
        onClose={() => setIsSuccessVisible(false)}
      />
      <ErrorNotification
        message="Ups! Ocurrio un Problema"
        isVisible={isErrorVisible}
        onClose={() => setIsErrorVisible(false)}
      />
      </div>
    </div>
  );
};

export default Module;

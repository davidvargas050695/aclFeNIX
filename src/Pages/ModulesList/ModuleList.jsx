import React, { useState, useEffect } from 'react';
import './ModuleList.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft, faCube } from '@fortawesome/free-solid-svg-icons';
import Table from '../../components/Table'; // Asegúrate de que el path sea correcto
import Section from '../../components/Section';
import apiClient from "../../axios"; // Asegúrate de tener configurado tu cliente API
import { Tooltip } from "react-tooltip";

const ModuleList = ({ handleLogout }) => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1); 
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/products');

        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          setData([response.data]);
        }
      } catch (error) {
        console.error("Error al obtener los datos del servicio", error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { title: "descripcion", key: "descripcion" },
    { title: "origen", key: "origen" },
    { title: "codigo", key: "codigo" },
    { title: "Seleccionar", key: "acciones" },
  ];

  const itemsPerPage = 50;
  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSelectCombo1 = () => {
    const selected = paginatedData
      .filter(item => item.origen === 'VFP')
      .map(item => item.codigo); 

    setSelectedRows(selected);
  };

  const renderRow = (item, index) => (
    <>
      <td>{item.descripcion}</td>
      <td>{item.origen}</td>
      <td>{item.codigo}</td>
      <td>
        <div className="button-container">
          <Tooltip id="edit-tooltip" className="custom-tooltip" />
          <input
            type="checkbox"
            data-tooltip-id="edit-tooltip"
            className="icon-checkbox"
            data-tooltip-content="Seleccionar"
            checked={selectedRows.includes(item.codigo)}
            onChange={() => {
              if (selectedRows.includes(item.codigo)) {
                setSelectedRows(selectedRows.filter(code => code !== item.codigo));
              } else {
                setSelectedRows([...selectedRows, item.codigo]);
              }
            }}
          />
        </div>
      </td>
    </>
  );

  return (
    <div className="home-container">
      <Header onLogout={handleLogout} title='Contratos' />
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
        </Section>
        <div className="combos-container">
          <button
            className="combo-button combo1"
            onClick={handleSelectCombo1}
          >
            Combo 1
          </button>
          <button
            className="combo-button combo2"
          >
            Combo 2
          </button>
          <button
            className="combo-button combo3"
          >
            Combo 3
          </button>
          <button
            className="combo-button combo4"
          >
            Combo 4
          </button>
        </div>
        <Table
          title='Lista de Módulos'
          rows={paginatedData}
          columns={columns}
          icon={faCube}
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

export default ModuleList;

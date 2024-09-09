import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ModulesForm.css";
import ModalStatus from "../../components/Notifications/ModuleStatus";
import Section from "../../components/Section";
import { faThLarge, faClipboard, faEye, faSearchPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Header, ActionButton, Table, ContractForm } from "../../components";
import SlideModal from '../../components/SlideModal';
import {
  faEdit,
  faTrashAlt,
  faCircleCheck,
  faCircleXmark,
  faCircleArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "react-tooltip";
import apiClient from "../../axios";

const ModulesForm = ({ handleLogout }) => {
  const location = useLocation();
  const { modules } = location.state || {};
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState(null);
  const [search, setSearch] = useState(null); // Estado definitivo para la búsqueda
  const [customer, setCustomer] = useState(null);
  const navigate = useNavigate();
  const [data, setData] = useState(modules.modules || []); // Estado inicial con los datos
  const [dataInfo, setDataInfo] = useState(modules || []);
  const [status, setStatus] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [numContId, setnumContId] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tempSearch, setTempSearch] = useState(''); // Temporal para el input de contrato
  const [tempCustomers, setTempCustomers] = useState(''); // Temporal para el input de cliente

  const handleStatusClick = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
    // handleRefresh();
  };

  const toggleModal = async (val, item) => {
    console.log('val::: ', val);
      setSelectedItem(item);
      setIsModalOpen(val);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
    onRefreshThis()
  };

  const handleClick = () => {
    navigate(-1);
  };
  const assignSearchValues = () => {
    if (tempSearch) {
      setSearch(tempSearch);
      setCustomer(''); // Limpia cliente si hay algo en contrato
    } else if (tempCustomers) {
      setCustomer(tempCustomers);
      setSearch(''); // Limpia contrato si hay algo en cliente
    } else {
      setCustomer('');
      setSearch('');
      handleSearch();
    }
    console.log('abc::: ');
  };

  const handleSearch = useCallback(async (page = 1) => {
    try {
      setLoading(true)
      let endPoint = `contracts/${modules.numCont}/modules?page=${page}`;
      if (customer) {
        endPoint += `&module=${customer}`;
      } else if (search) {
        endPoint += `&search=${search}`;
      }
      const response = await apiClient.get(endPoint);
      console.log('response::: ', response);
      if (Array.isArray(response.data.results)) {
        setData(response.data.results);
      } else {
        setData([response.data.results]);
      }
      setTotalItems(response.data.total || 1);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error("Error al obtener los datos del servicio", error);
    }
  }, [modules.numCont, customer, search]);

  useEffect(() => {
    handleSearch(currentPage); // Cargar datos al montar el componente
  }, [handleSearch, currentPage]);

  const onRefreshThis = () => {
    handleSearch(1)
  };

  const handleDelete = async (id) => {
    try {
      const url = `/modules/${id}`;
      await apiClient.delete(url);
      // handleRefresh();
    } catch (error) {
      console.error("Error al eliminar el Módulo");
    }
  };

  /* const handleRefresh = async () => {
    try {
      const response = await apiClient.get('/modules');
      setData(response.data);
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
    }
  }; */
  const columns = [
    { title: "Canal", key: "canal" },
    { title: "Módulo", key: "modulo" },
    { title: "Origen", key: "origen" },
    { title: "Contrato", key: "numContId" },
    { title: "Estado", key: "acciones" },
    { title: "Acciones", key: "acciones" },
  ];

  const itemsPerPage = 10;

  const renderRow = (item, index) => (
    <>
      <td>{item?.canal}</td>
      <td>{item?.modulo}</td>
      <td>{item?.origen}</td>
      <td>{item?.numContId}</td>
      <td>
        {item.activo ? (
          <button
            className="status_button"
            onClick={() => handleStatusClick(item)}
          >
            <FontAwesomeIcon
              icon={faCircleCheck}
              style={{ color: "green", fontSize: "24px" }}
            />
          </button>
        ) : (
          <button
            className="status_button"
            onClick={() => handleStatusClick(item)}
          >
            <FontAwesomeIcon
              className="status_icon"
              icon={faCircleXmark}
              style={{ color: "red", fontSize: "24px" }}
            />
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
          <button
            data-tooltip-id="edit-tooltip"
            className="icon-button edit-button"
            data-tooltip-content="Detalles"
            onClick={(e) => {
              e.stopPropagation(); // Evita que el clic en el botón se propague al td
              toggleModal(true, item)
            }}
          >
            <FontAwesomeIcon icon={faEye} />
          </button>
        </div>
      </td>
    </>
  );

  const handleRowClick = (item) => {
    console.log("item::: ", item);
    setSelectedRow(item);
  };

  return (
    <div className="home-container">
      <Header onLogout={handleLogout} title="Módulos por Contrato" />
      <div className="home-content">
        <Section>
          <div className="button-return-container">
            <div className="contener-return">
            <FontAwesomeIcon
              className="basic-shortcut-icon"
              style={{ cursor: "pointer" }}
              icon={faCircleArrowLeft}
              onClick={handleClick}
            />
            </div>
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
                  placeholder="Descripción"
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
                  placeholder="Módulo"
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
          </div>
          <div className="button-add">
            <button
              className="basic-custom-button"
              onClick={(e) => {
                e.stopPropagation();
                navigate('/ModuleContract', { state: { modules: modules } });
              }}
            >
              <FontAwesomeIcon
                className="basic-shortcut-icon"
                icon={faClipboard}
              />
              Agregar Módulo
            </button>
          </div>
        </Section>
        <Table
          title={`Lista de módulos del contrato (${dataInfo.numCont}) del Cliente (${dataInfo?.razonSocial}) con identificación (${dataInfo?.cif})`}
          rows={data}
          columns={columns}
          icon={faThLarge}
          renderRow={renderRow}
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => setCurrentPage(page)}
          onRowClick={handleRowClick}
          selectedRow={selectedRow}
          onRefresh={onRefreshThis}
          loading={loading}
          //   onRefresh={handleRefresh} // Pasar la función de actualización al componente Table
        />
        {selectedItem && (
          <ModalStatus
            message={
              selectedItem.activo
                ? "Módulo Activo. ¿Desea Inactivarlo?"
                : "Módulo Inactivo. ¿Desea Activarlo?"
            }
            isVisible={modalVisible}
            onClose={handleCloseModal}
            numContId={selectedItem.numContId}
            modulo={selectedItem.modulo}
            activo={selectedItem.activo}
          />
        )}
      </div>
      <SlideModal isOpen={isModalOpen} onClose={() => toggleModal(false)}  title="Detalles del Módulo">
          <div className="section-container-form">
            <h4 className="section-title-form">CANAL</h4>
            <hr className="section-divider-form" />
            <div className="form-group-form">
              <label>{selectedItem?.canal}</label>
            </div>

            <h4 className="section-title-form">CÁDUCA</h4>
            <hr className="section-divider-form" />
            <div className="form-group-form">
              <label>{selectedItem?.fechaFin}</label>
            </div>

            <h4 className="section-title-form">MÓDULO</h4>
            <hr className="section-divider-form" />
            <div className="form-group-form">
              <label>{selectedItem?.modulo}</label>
            </div>

            <h4 className="section-title-form">MOTIVO</h4>
            <hr className="section-divider-form" />
            <div className="form-group-form">
              <label>{selectedItem?.motivo}</label>
            </div>
            <h4 className="section-title-form">CONTRATO</h4>
            <hr className="section-divider-form" />
            <div className="form-group-form">
              <label>{selectedItem?.numContId}</label>
            </div>
            <h4 className="section-title-form">N° Licencias</h4>
            <hr className="section-divider-form" />
            <div className="form-group-form">
              <label>{selectedItem?.numLicencias}</label>
            </div>
            <h4 className="section-title-form">Origen</h4>
            <hr className="section-divider-form" />
            <div className="form-group-form">
              <label>{selectedItem?.origen}</label>
            </div>
            <h4 className="section-title-form">Usuario</h4>
            <hr className="section-divider-form" />
            <div className="form-group-form">
              <label>{selectedItem?.user}</label>
            </div>
          </div>
        </SlideModal>
    </div>
  );
};

export default ModulesForm;

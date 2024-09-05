import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import "./ContractNew.css";
import Header from "../../components/Header";
import Section from "../../components/Section";
import CustomerModal from "../../components/CustomerModal";
import ModulesModal from "../../components/ModulesModal";
import SuccessNotification from "../../components/Notifications/SuccessNotification";
import ErrorNotification from "../../components/Notifications/ErrorNotification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faRotate,
  faCircleArrowLeft,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import apiClient from "../../axios";

const ContractNew = ({ handleLogout }) => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const location = useLocation();
  const [distributors, setDistributors] = useState([]);
  const [typeProduct, setProduct] = useState([]);
  const [typeContract, setTypeContract] = useState([]);
  const [proxPago, setProxPago] = useState(null);
  const [codigo, setCodigo] = useState("");
  const [numSerie, setSerie] =  useState(String(location.state?.contract[0].numCont) || '');
  const [cliente, setCliente] =  useState(location.state?.contract[0].cliente || '');
  const [distribuidor, setSucursal] = useState("");
  const [observacion, setObservacion] = useState("");
  const [servidor, setServidor] = useState("");
  const [observacion2, setBloqueo] = useState("");
  const [tipocontra, setTipoProducto] = useState("");
  const [tipoContrato, setTipoContrato] = useState("");
  const [numSer, setNumSer] = useState(1);
  const [numCli, setNumCli] = useState(1);
  const [aNumSer, setAnumSer] = useState(0);
  const [aNumCli, setAnumCli] = useState(0);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [clients, setClients] = useState([]);
  const [errors, setErrors] = useState({});
  const [contractNumber, setContractNumber] = useState("");
  const [moduleData, setModuleData] = useState("");
  const [moduleNumContra, setModuleNumContra] = useState("");
  const [moduleCanal, setModuleCanal] = useState("");
  const [checkobservacion, setIsCheckObservacion] = useState(false);
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [showModules, setShowModules] = useState(false);

  const handleDateChange = (date) => {
    // Convierte la fecha seleccionada al formato YYYY-MM-DD HH:mm:ss
    const formattedDate = format(date, "yyyy-MM-dd HH:mm:ss");
    setProxPago(formattedDate);
  };
  const toggleSwitch = () => {
    setIsCheckObservacion((prev) => !prev);
  };

  useEffect(() => {
    apiClient
      .get("/clients")
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los clientes:", error);
      });
  }, []);

  useEffect(() => {
    const fetchDistributors = async () => {
      try {
        const response = await apiClient.get("/distributors");
        setDistributors(response.data);
      } catch (error) {
        console.error("Error fetching distributors:", error);
      }
    };

    fetchDistributors();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get("/product_type");
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchTipoContra = async () => {
      try {
        const response = await apiClient.get("/contract_type");
        setTypeContract(response.data);
      } catch (error) {
        console.error("Error fetching contract:", error);
      }
    };

    fetchTipoContra();
  }, []);

  const validateFields = () => {
    let validationErrors = {};
    if (!numSerie) validationErrors.numSerie = "El Campo es Obligatorio";
    if (!cliente) validationErrors.cliente = "El Campo es Obligatorio";
    if (!distribuidor)
      validationErrors.distribuidor = "El Campo es Obligatorio";
    if (!servidor) validationErrors.servidor = "El Campo es Obligatorio";
    if (!tipocontra) validationErrors.tipocontra = "El Campo es Obligatorio";
    if (!tipoContrato)
      validationErrors.tipoContrato = "El Campo es Obligatorio";
    return validationErrors;
  };

  const handleCounterChange = (counterType, operation) => {
    if (counterType === "ser") {
      setNumSer((prev) =>
        operation === "increment" ? prev + 1 : prev > 0 ? prev - 1 : 0
      );
    } else if (counterType === "cli") {
      setNumCli((prev) =>
        operation === "increment" ? prev + 1 : prev > 0 ? prev - 1 : 0
      );
    } else if (counterType === "aser") {
      setAnumSer((prev) =>
        operation === "increment" ? prev + 1 : prev > 0 ? prev - 1 : 0
      );
    } else if (counterType === "acli") {
      setAnumCli((prev) =>
        operation === "increment" ? prev + 1 : prev > 0 ? prev - 1 : 0
      );
    }
  };

  const openModal = () => {
    setSelectedClient(null);
    setShowNotification(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const selectClient = (clientName) => {
    setCliente(clientName);
  };

  const oncloseNavigateSuccess = () => {
    navigate(-1);
    setIsInfoVisible();
  };

  const handleSave = async () => {
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const payload = {
      numSerie,
      cliente,
      checkobservacion,
      distribuidor,
      servidor,
      observacion2,
      tipocontra,
      observacion,
      tipoContrato,
      numSer,
      numCli,
      aNumSer,
      aNumCli,
      proxPago,
    };
    const payloadUpdate = {
      distribuidor,
      checkobservacion,
      servidor,
      observacion2,
      observacion,
      tipocontra,
      tipoContrato,
      numSer,
      numCli,
      aNumSer,
      aNumCli,
      proxPago,
    };

    try {
      if (productId) {
        // Modo edición: usar PATCH
        await apiClient.patch(`/products/${productId}`, payloadUpdate);
      } else {
        // Modo creación: usar POST
        console.log(payload);
        const response = await apiClient.post("/contracts", payload);
        const newContractNumber = response.data.numCont;
        setContractNumber(newContractNumber);
        setIsSuccessVisible(true);
        setModuleData(tipocontra);
        setModuleNumContra(newContractNumber);
        setModuleCanal(distribuidor);
        setIsInfoVisible(true);
      }
      setIsSuccessVisible(true);
      setIsErrorVisible(false);
      setErrors({});
      setTimeout(() => {
        setIsSuccessVisible(false);
      }, 4000);
    } catch (error) {
      console.error("Error al guardar el producto", error);
      setIsErrorVisible(true);
      setIsSuccessVisible(false);
      setTimeout(() => {
        setIsErrorVisible(false);
      }, 4000);
    }
  };
  return (
    <div className="home-container">
      <Header onLogout={handleLogout} title="Contratos" />
      <Section>
        <div className="button-return-container">
          <FontAwesomeIcon
            className="basic-shortcut-icon"
            style={{ cursor: "pointer" }}
            icon={faCircleArrowLeft}
            onClick={(e) => {
              e.stopPropagation();
              navigate(-1);
            }}
          />
        </div>
      </Section>
      <div className="moduleNew-form-container">
        <h3 className="basic-info-form-title">Información del Contrato</h3>
        <div className="basic-info-form-grid">
        <div className="basic-info-form-group">
            <label style={{ color: errors.servidor ? "red" : "inherit" }}>
              Servidor
            </label>
            <input
              type="text"
              placeholder="Servidor"
              value={servidor}
              onChange={(e) => setServidor(e.target.value)}
            />
            {errors.servidor && (
              <p className="error-message">{errors.servidor}</p>
            )}
          </div>
          <div className="basic-info-form-group">
            <label style={{ color: errors.numSerie ? "red" : "inherit" }}>
              Nro. Identificador
            </label>
            <input
              type="text"
              placeholder="Nro. Identificador"
              value={numSerie}
              onChange={(e) => setSerie(e.target.value)}
            />
            {errors.numSerie && (
              <p className="error-message">{errors.numSerie}</p>
            )}
          </div>
          <div className="basic-info-form-group">
            <label style={{ color: errors.cliente ? "red" : "inherit" }}>
              Cliente
            </label>
            <input
              type="text"
              placeholder="Cliente"
              value={cliente}
              onClick={openModal} // Usa la función modificada
              onChange={(e) => setCliente(e.target.value)}
            />
            <CustomerModal
              isOpen={isModalOpen}
              closeModal={closeModal}
              selectClient={selectClient}
            />
            {errors.cliente && (
              <p className="error-message">{errors.cliente}</p>
            )}
          </div>
          <div className="basic-info-form-group">
            <label style={{ color: errors.distribuidor ? "red" : "inherit" }}>
              Distribuidor
            </label>
            <select
              value={distribuidor}
              onChange={(e) => setSucursal(e.target.value)}
            >
              <option value="">Seleccione un Distribuidor</option>
              {distributors.map((distributor) => (
                <option key={distributor.code} value={distributor.code}>
                  {distributor.name}
                </option>
              ))}
            </select>
            {errors.distribuidor && (
              <p className="error-message">{errors.distribuidor}</p>
            )}
          </div>
          <div className="basic-info-form-group">
            <label style={{ color: errors.tipocontra ? "red" : "inherit" }}>
              Producto
            </label>
            <select
              value={tipocontra}
              onChange={(e) => setTipoProducto(e.target.value)}
            >
              <option value="">Seleccione un Tipo Producto</option>
              {typeProduct.map((product) => (
                <option key={product.code} value={product.code}>
                  {product.code}
                </option>
              ))}
            </select>
            {errors.tipocontra && (
              <p className="error-message">{errors.tipocontra}</p>
            )}
          </div>
          <div className="basic-info-form-group">
            <label style={{ color: errors.proxPago ? "red" : "inherit" }}>
              Cáduca{" "}
            </label>
            <div className="basic-info-date-picker">
              <DatePicker
                selected={proxPago ? new Date(proxPago) : null}
                onChange={handleDateChange}
                showTimeSelect
                locale={es}
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText="Selecciona la Fecha"
                className="custom-date-picker"
              />
              <div className="slider-container-contract-space">
                <div
                  className="slider-container-contract"
                  onClick={toggleSwitch}
                >
                  <div
                    className={`slider-option-contract ${
                      checkobservacion ? "active-contract" : "inactive-contract"
                    }`}
                  >
                    Bloqueado
                  </div>
                  <div
                    className={`slider-option-contract ${
                      !checkobservacion
                        ? "active-contract"
                        : "inactive-contract"
                    }`}
                  >
                    No Bloqueado
                  </div>
                </div>
              </div>
              {errors.proxPago && (
                <p className="error-message">{errors.proxPago}</p>
              )}
            </div>
          </div>
          <div className="basic-info-form-group">
            <label style={{ color: errors.observacion ? "red" : "inherit" }}>
              Observación
            </label>
            <input
              type="text"
              placeholder="Observación"
              value={observacion}
              onChange={(e) => setObservacion(e.target.value)}
            />
            {errors.servidor && (
              <p className="error-message">{errors.observacion}</p>
            )}
          </div>
          {/* Otros elementos del componente */}

          {checkobservacion && (
            <div className="basic-info-form-group">
              <label>Bloqueo</label>
              <input
                type="text"
                placeholder="Comentario"
                value={observacion2}
                onChange={(e) => setBloqueo(e.target.value)}
              />
            </div>
          )}

          {/* Otros elementos del componente */}
          <div className="basic-info-form-group">
            <label style={{ color: errors.tipoContrato ? "red" : "inherit" }}>
              Tipo Contrato
            </label>
            <select
              value={tipoContrato}
              onChange={(e) => setTipoContrato(e.target.value)}
            >
              <option value="">Seleccione un Tipo Contrato</option>
              {typeContract.map((contarct) => (
                <option key={contarct.code} value={contarct.code}>
                  {contarct.code}
                </option>
              ))}
            </select>
            {errors.tipoContrato && (
              <p className="error-message">{errors.tipoContrato}</p>
            )}
          </div>
        </div>
        <hr className="divider" />
        <h3 className="basic-info-form-title">Número de Licencias</h3>
        <div className="basic-info-form-grid">
          <div className="basic-info-form-group2">
            <label className="basic-title">Módulo Comercial</label>
            <div className="counter-group">
              <div className="counter">
                <p className="basic-subtittle">Servidores</p>
                <div className="custom-counter">
                  <button
                    onClick={() => handleCounterChange("ser", "decrement")}
                  >
                    -
                  </button>
                  <span>{numSer}</span>
                  <button
                    onClick={() => handleCounterChange("ser", "increment")}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="counter">
                <p className="basic-subtittle">Clientes</p>
                <div className="custom-counter">
                  <button
                    onClick={() => handleCounterChange("cli", "decrement")}
                  >
                    -
                  </button>
                  <span>{numCli}</span>
                  <button
                    onClick={() => handleCounterChange("cli", "increment")}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="basic-form-footer">
          <button
            className="basic-custom-button"
            onClick={(e) => {
              e.stopPropagation();
              navigate(-1);
            }}
          >
            <FontAwesomeIcon icon={faXmark} className="basic-shortcut-icon" />
            Cancelar
          </button>
          <button className="basic-custom-button" onClick={handleSave}>
            <FontAwesomeIcon
              icon={productId ? faRotate : faSave}
              className="basic-shortcut-icon"
            />
            {productId ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </div>
      <SuccessNotification
        message={
          productId
            ? `El Contrato se ha Actualizado Correctamente.`
            : `El Contrato se ha Creado Correctamente${
                contractNumber
                  ? ` con Número de Contrato ${contractNumber}`
                  : ""
              }.`
        }
        isVisible={isSuccessVisible}
        onClose={() => setIsSuccessVisible(false)}
        position="center"
      />
      <ErrorNotification
        message="Hubo un problema al Crear el Contrato. Inténtalo de nuevo."
        isVisible={isErrorVisible}
        onClose={() => setIsErrorVisible(false)}
      />
      <ModulesModal
        isVisible={isInfoVisible}
        onClose={() => oncloseNavigateSuccess()}
        tipocontra={moduleData}
        numContra={moduleNumContra}
        channel={moduleCanal}
      />
    </div>
  );
};

export default ContractNew;

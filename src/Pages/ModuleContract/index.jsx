import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./ModuleContract.css";
import DatePicker from "react-datepicker";
import { es } from "date-fns/locale";
import Header from "../../components/Header";
import Section from "../../components/Section";
import SuccessNotification from "../../components/Notifications/SuccessNotification";
import ErrorNotification from "../../components/Notifications/ErrorNotification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-datepicker/dist/react-datepicker.css";
import {
  faSave,
  faRotate,
  faCircleArrowLeft,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import apiClient from "../../axios";
import Select from "react-select";

const ModuleContract = ({ handleLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const moduleId = searchParams.get("moduleId");

  const [distributors, setDistributors] = useState([]);
  const [numContId, setContId] =  useState(
    moduleId ? '' : location.state?.modules?.numCont || "");
  const [modulo, setCodigo] = useState("");
  const [numLicencias, setNumLicencias] = useState(1);
  const [origen, setOrigen] = useState("");
  const [canal, setCanal] = useState("");
  const [fechaFin, setFechaFin] = useState(null);
  const [activo, setIsActive] = useState(0);
  const [motivo, setMotivo] = useState("");
  const [isPay, setIsPay] = useState(0);
  const [maxCount, setMaxCount] = useState("");
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [data, setData] = useState([]);

  const toggleSwitch = () => {
    setIsActive((prev) => !prev);
  };

  const fetchData = async () => {
    try {
      const response = await apiClient.get(`/products`);

      if (Array.isArray(response.data)) {
        // Extraemos los códigos de los módulos del array de location.state
        if(moduleId) {
          setData(response.data);
        } else {
          console.log("location.state?.modules::: ", location.state?.modules);
          const moduleCodes = location.state?.modules?.modules.map(
            (module) => module.modulo
          );
          console.log("moduleCodes::: ", moduleCodes);

          // Filtrar productos cuyos códigos coincidan con los códigos de los módulos
          const filteredData = response.data.filter(
            (product) => !moduleCodes.includes(product.codigo)
          );
          setData(filteredData); // Solo asignamos los productos filtrados
          console.log("data::", data);       
        }
      } else {
        setData([response.data]); // Si es un objeto, lo encapsulamos en un array
      }
      setIsSuccessVisible(true);
    } catch (error) {
      setIsErrorVisible(true);
    }
  };

  useEffect(() => {
    const fetchDistributors = async () => {
      try {
        const response = await apiClient.get("/distributors");
        setDistributors(response.data);
      } catch (error) {
        console.error("Error fetching distributors:", error);
      }
    };
    fetchData();
    fetchDistributors();
  }, []);

  const handleClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (moduleId) {
      const fetchModule = async () => {
        try {
          const response = await apiClient.get(`/modules/${moduleId}`);
          const fechaFin = response.data.fechaFin
            ? new Date(response.data.fechaFin)
            : null;
          setContId(response.data.numContId);
          setCodigo(response.data.modulo);
          setNumLicencias(response.data.numLicencias);
          setOrigen(response.data.origen);
          setCanal(response.data.canal);
          setFechaFin(fechaFin);
          setSelectedDate(fechaFin);
          setIsActive(response.data.activo === 1 ? true : false);
          setMotivo(response.data.motivo);
          setIsPay(response.data.isPay === 1 ? "Pagado" : "Gratis");
          setMaxCount(response.data.maxCount);
        } catch (error) {
          console.error("Error al cargar el modulo", error);
        }
      };
      fetchModule();
    } else if (numContId) {
      setContId(numContId);
    }
  }, [moduleId]);

  const handleModuleChange = (selectedOption) => {
    console.log("selectedOption::: ", selectedOption);
    setCodigo(selectedOption ? selectedOption.value : ""); // Actualiza el valor de 'modulo'
  };
  const handleDistributorChange = (selectedOption) => {
    setCanal(selectedOption ? selectedOption.value : "");
  };
  const handleSave = async () => {
    const payload = {
      numContId,
      modulo,
      origen,
      canal,
      num_licencias: numLicencias,
      user: localStorage.getItem("code"),
      activo: activo === "Activo" ? true : false,
      motivo,
      is_pay: isPay === "Pagado" ? true : false,
      max_count: maxCount,
    };
    console.log('activo::: ', activo);
    const payloadUpdate = {
      isPay: isPay === "Pagado" ? true : false,
      maxCount: maxCount,
      activo: activo === false ? false : true,
      motivo,
      fechaFin,
      numLicencias: numLicencias,
      canal,
      user: localStorage.getItem("code"),
      origen,
    };

    try {
      if (moduleId) {
        // Modo edición: usar PATCH
        console.log(payloadUpdate);
        await apiClient.patch(
          `/modules/edit_by_contract/${numContId}/${modulo}`,
          payloadUpdate
        );
      } else {
        // Modo creación: usar POST
        await apiClient.post("/modules", payload);
      }
      setIsSuccessVisible(true);
      setIsErrorVisible(false);
      navigate(-1);
    } catch (error) {
      setIsErrorVisible(true);
      setIsSuccessVisible(false);
      setTimeout(() => {
        setIsErrorVisible(false);
      }, 4000);
    }
  };

  return (
    <div className="home-container">
      <Header onLogout={handleLogout} title="Módulo por Contrato" />
      <Section>
        <div className="button-return-container">
          <FontAwesomeIcon
            className="basic-shortcut-icon"
            style={{ cursor: "pointer" }}
            icon={faCircleArrowLeft}
            onClick={handleClick}
          />
        </div>
      </Section>
      <div className="moduleNew-form-container">
        <h3 className="basic-info-form-title">Información del Módulo</h3>
        <div className="basic-info-form-grid">
          <div className="basic-info-form-group">
            <label>Número de Contrato</label>
            <input
              type="text"
              placeholder="Contrato"
              value={numContId}
              onChange={(e) => setContId(e.target.value)}
            />
          </div>
          <div className="basic-info-form-group">
            <label>Código de Módulo</label>
            <Select
              value={modulo ? { value: modulo, label: modulo } : null} // El valor debe coincidir con la estructura de las opciones
              onChange={handleModuleChange}
              options={data.map((module) => ({
                value: module.codigo,
                label: module.descripcion,
              }))}
              placeholder="Seleccione un módulo"
              isClearable // Permite limpiar la selección
              styles={{
                container: (provided) => ({
                  ...provided,
                  width: "600px", // Cambia el ancho a lo que desees
                }),
                control: (provided) => ({
                  ...provided,
                  textAlign: "left", // Alinear el texto a la izquierda
                  fontFamily: "Poppins, sans-serif", // Cambiar la fuente
                  fontSize: "12px", // Cambiar el tamaño de fuente
                }),
                placeholder: (provided) => ({
                  ...provided,
                  textAlign: "left", // Alinear el placeholder a la izquierda
                  fontFamily: "Poppins, sans-serif", // Cambiar la fuente del placeholder
                  fontSize: "12px", // Cambiar el tamaño de la fuente del placeholder
                }),
                singleValue: (provided) => ({
                  ...provided,
                  fontFamily: "Poppins, sans-serif", // Cambiar la fuente del valor seleccionado
                  fontSize: "12px", // Cambiar el tamaño de la fuente del valor seleccionado
                }),
                menu: (provided) => ({
                  ...provided,
                  textAlign: "left", // Alinear el menú a la izquierda
                }),
                option: (provided, state) => ({
                  ...provided,
                  textAlign: "left", // Alinear las opciones a la izquierda
                  backgroundColor: state.isSelected ? '#e0e0e0' : 'white', // Color de fondo si está seleccionada
                  color: state.isSelected ? 'black' : 'black', // Color del texto
                }),
              }}
            />
          </div>

          <div className="basic-info-form-group">
            <label>Número de Licencias</label>
            <input
              type="text"
              placeholder="Número de Licencias"
              value={numLicencias}
              onChange={(e) => setNumLicencias(e.target.value)}
            />
          </div>
          <div className="basic-info-form-group">
            <label>Origen</label>
            <select
              value={origen}
              onChange={(e) => setOrigen(e.target.value)}
            >
              <option value="">Seleccione una opción</option>
              <option value="WinDev">WinDev</option>
              <option value="VFoxPro">VFoxPro</option>
            </select>
          </div>
        </div>
        <div className="basic-info-form-grid-three">
          <div className="basic-info-form-group4">
            <label>Distribuidor</label>
            <Select
              value={
                canal
                  ? {
                      value: canal,
                      label: distributors.find(
                        (distributor) => distributor.code === canal
                      )?.name,
                    }
                  : null
              }
              onChange={handleDistributorChange}
              options={distributors.map((distributor) => ({
                value: distributor.code,
                label: distributor.name,
              }))}
              placeholder="Seleccione un Distribuidor"
              isClearable // Para permitir limpiar la selección
              styles={{
                container: (provided) => ({
                  ...provided,
                  width: "600px", // Cambia el ancho a lo que desees
                }),
                control: (provided) => ({
                  ...provided,
                  textAlign: "left", // Alinear el texto a la izquierda
                  fontFamily: "Poppins, sans-serif", // Cambiar la fuente
                  fontSize: "12px", // Cambiar el tamaño de fuente
                }),
                placeholder: (provided) => ({
                  ...provided,
                  textAlign: "left", // Alinear el placeholder a la izquierda
                  fontFamily: "Poppins, sans-serif", // Cambiar la fuente del placeholder
                  fontSize: "12px", // Cambiar el tamaño de la fuente del placeholder
                }),
                menu: (provided) => ({
                  ...provided,
                  textAlign: "left", // Alinear el menú a la izquierda
                }),
                option: (provided, state) => ({
                  ...provided,
                  textAlign: "left", // Alinear las opciones a la izquierda
                  backgroundColor: state.isSelected ? '#e0e0e0' : 'white', // Color de fondo si está seleccionada
                  color: state.isSelected ? 'black' : 'black', // Color del texto
                }),
              }}
            />
          </div>
          <div className="basic-info-form-group4">
            <label>Cadúca</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="MMMM d, yyyy h:mm aa"
              placeholderText="Selecciona la Fecha"
              locale={es}
              className="custom-date-picker"
            />
          </div>
          <div className="basic-info-form-group4">
            <label>Estado</label>
            <div className="slider-container" onClick={toggleSwitch}>
              <div
                className={`slider-option ${activo ? "active" : "inactive"}`}
              >
                Activo
              </div>
              <div
                className={`slider-option ${!activo ? "active" : "inactive"}`}
              >
                Inactivo
              </div>
            </div>
          </div>
        </div>
        <div className="basic-info-form-grid">
          <div className="basic-info-form-group">
            <label>Plan</label>
            <select value={isPay} onChange={(e) => setIsPay(e.target.value)}>
              <option value="">Seleccione una opción</option>
              <option value="Pagado">Pagado</option>
              <option value="Gratis">Gratis</option>
            </select>
          </div>
          <div className="basic-info-form-group">
            <label>Número Máximo de Registros</label>
            <input
              type="text"
              placeholder="Número Máximo de Registros"
              value={maxCount}
              onChange={(e) => setMaxCount(e.target.value)}
            />
          </div>
          {!activo && (
            <div className="basic-info-form-group">
              <label>Motivo</label>
              <input
                type="text"
                placeholder="Motivo"
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
              />
            </div>
          )}
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
              icon={moduleId ? faRotate : faSave}
              className="basic-shortcut-icon"
            />
            {moduleId ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </div>
      <SuccessNotification
        message={
          moduleId
            ? "El Módulo se ha Actualizado Correctamente."
            : "El Módulo se ha Creado Correctamente."
        }
        isVisible={isSuccessVisible}
        onClose={() => setIsSuccessVisible(false)}
      />
      <ErrorNotification
        message="Hubo un problema al Crear el Módulo. Inténtalo de nuevo."
        isVisible={isErrorVisible}
        onClose={() => setIsErrorVisible(false)}
      />
    </div>
  );
};

export default ModuleContract;

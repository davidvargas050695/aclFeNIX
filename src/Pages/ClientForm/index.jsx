import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Section from "../../components/Section";
import Loader from "../../components/Loader";
import SuccessNotification from "../../components/Notifications/SuccessNotification";
import ErrorNotification from "../../components/Notifications/ErrorNotification";
import InfoNotification from "../../components/Notifications/InfoNotification";
import WarningNotification from "../../components/Notifications/WarningNotification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-datepicker/dist/react-datepicker.css";
import {
  faSave,
  faRotate,
  faCircleArrowLeft,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import apiClient from "../../axios";
import "./ClientForm.css";

const ClientForm = ({ handleLogout }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isWarningVisible, setIsWarningVisible] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [distributors, setDistributors] = useState([]);
  const { customerCode } = useParams();
  const [codcli, setCodigo] = useState("");
  const [cif, setCif] = useState("");
  const [nomcli, setNombre] = useState("");
  const [nomComercial, setNombreComercial] = useState("");
  const [tipoCif, setTipoCif] = useState("");
  const [documentTypeText, setDocumentTypeText] = useState("");
  const [direc1, setDireccion] = useState("");
  const [tlf1, setTelefono] = useState("");
  const [distribuidor, setCanal] = useState("");
  const [email, setEmail] = useState("");
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [errorsMessage, setErrorMessage] = useState({});
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const contract = process.env.REACT_APP_FENIX_CONTRACT;
  const [infoPayload, setInfoPayload] = useState({});

  useEffect(() => {
    if (customerCode) {
      const fetchProduct = async () => {
        try {
          const response = await apiClient.get(`/clients/${customerCode}`);
          setCodigo(response.data.codcli);
          setNombre(response.data.nomcli);
          setNombreComercial(response.data.nomComercial);
          setCif(response.data.cif);
          setTipoCif(response.data.tipoCif);
          setDireccion(response.data.direc1);
          setTelefono(response.data.tlf1);
          setEmail(response.data.email);
          setCanal(response.data.distribuidor);
        } catch (error) {
          console.error("Error al cargar el cliente", error);
        }
      };
      fetchProduct();
    }
  }, [customerCode]);

  const fetchAuthToken = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_CIFRUC_URL}/login`,
        {
          method: "GET",
          headers: {
            Authorization: "Basic " + btoa("fenix:7&m$T8v_12d6?aA}yVOF"),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener el token");
      }

      const data = await response.json();
      return data.token;
    } catch (error) {
      console.error("Error al obtener el token:", error);
      return null;
    }
  };
  // Nueva función para manejar la búsqueda
  const handleDocumentSearch = async (event) => {
    if (event.key === "Enter" || event.key === "Tab") {
      event.preventDefault();
      try {
        // Obtén el token primero
        setLoading(true);
        const token = await fetchAuthToken();
        if (!token) {
          throw new Error("No se pudo obtener el token de autenticación");
        }

        const response = await fetch(
          `${process.env.REACT_APP_CIFRUC_URL}/document/search`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              contract: contract,
              document: cif,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Error en la búsqueda del documento");
        }
        const data = await response.json();

        if (data.document && data.document.socialReason) {
          setIsWarningVisible(false);
          setIsErrorVisible(false);
          setIsButtonDisabled(false);
          setNombre(data.document.socialReason);
        }
        if (data.document && data.document.email) {
          setEmail(data.document.email);
        } else {
          setEmail("");
        }
        if (data.document && data.document.mobile) {
          setTelefono(data.document.mobile);
        } else {
          setTelefono("");
        }
        if (
          data.document.establishments &&
          data.document.establishments.length > 0
        ) {
          setDireccion(data.document.establishments[0].address);
          setNombreComercial(data.document.establishments[0].comercialName);
        } else if (data.document.address) {
          setNombreComercial(data.document.socialReason);
          setDireccion(data.document.address);
        }
      } catch (error) {
        if (cif.length === 10 && /^[0-9]+$/.test(cif)) {
          setErrorMessage(
            "El Documento de Identificación ingresado es Incorrecto o No Existe."
          );
          setIsErrorVisible(true);
          setIsButtonDisabled(true);
        } else if (cif.length === 13 && /^[0-9]+$/.test(cif)) {
          setErrorMessage(
            "El Documento de Identificación ingresado es Incorrecto o No Existe."
          );
          setIsErrorVisible(true);
          setIsButtonDisabled(true);
        } else if (/[^0-9]/.test(cif)) {
          setWarningMessage(
            "El Documento de Identificación ingresado es un Pasaporte."
          );
          setIsWarningVisible(true);
          setIsButtonDisabled(false);
        }
        setNombreComercial("");
        setCodigo("");
        setNombre("");
        setDireccion("");
        setEmail("");
      } finally {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    if (cif.length === 10 && /^[0-9]+$/.test(cif)) {
      setTipoCif("C");
      setDocumentTypeText("Cédula");
    } else if (cif.length === 13 && /^[0-9]+$/.test(cif)) {
      setTipoCif("R");
      setDocumentTypeText("RUC");
    } else if (/[^0-9]/.test(cif)) {
      setTipoCif("P");
      setDocumentTypeText("Pasaporte");
    } else {
      setTipoCif("");
    }
  }, [cif]);

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

  const validateEmail = (email) => {
    // Expresión regular para validar el formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email); // Solo valida el formato del correo
  };
  
  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  
    // Validar el email
    if (!validateEmail(value)) {
      setErrors({
        email: 'Email inválido. Debe contener "@" y un dominio válido.',
      });
    } else {
      setErrors({});
    }
  };  
  const validateFields = () => {
    let validationErrors = {};
    if (!codcli) validationErrors.codcli = "El Campo es Obligatorio";
    if (!nomcli) validationErrors.nomcli = "El Campo es Obligatorio";
    if (!cif) validationErrors.cif = "El Campo es Obligatorio";
    if (!tipoCif) validationErrors.tipoCif = "El Campo es Obligatorio";
    if (!direc1) validationErrors.direc1 = "El Campo es Obligatorio";
    if (!tlf1) validationErrors.tlf1 = "El Campo es Obligatorio";
    if (!distribuidor)
      validationErrors.distribuidor = "El Campo es Obligatorio";
    if (!email) validationErrors.email = "El Campo es Obligatorio";
    return validationErrors;
  };

  const handleCifChange = (e) => {
    const value = e.target.value;
    setCif(value);

    if (value === "") {
      setDocumentTypeText("");
      setNombreComercial("");
      setCodigo("");
      setNombre("");
      setDireccion("");
      setEmail("");
      setIsWarningVisible(false);
      setIsErrorVisible(false);
      setIsButtonDisabled(false);
    } else {
      setCodigo(value.substring(0, 10));
    }
  };

  const handleSave = async () => {
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      codcli,
      nomcli,
      nomComercial,
      cif,
      tipoCif,
      direc1,
      tlf1,
      email,
      distribuidor,
    };
    const payloadUpdate = {
      nomcli,
      nomComercial,
      direc1,
      tlf1,
      email,
      cif,
      distribuidor,
      tipoCif,
    };

    try {
      let response;

      if (customerCode) {
        response = await apiClient.patch(
          `/clients/${customerCode}`,
          payloadUpdate
        );
        setIsSuccessVisible(true);
        setIsErrorVisible(false);
        setErrors({});
        navigate("/Customers");
        setTimeout(() => {
          setIsSuccessVisible(false);
        }, 4000);
      } else {
        response = await apiClient.post("/clients", payload);
        navigate("/Customers");
        if (response.data.message === "CLIENT_ARCHIVED") {
          setInfoPayload(payload);
          setIsInfoVisible(true);
          setIsSuccessVisible(false);
          setIsErrorVisible(false);
        } else if (response.data.message.startsWith("CLIENT_ALREADY_EXISTS")) {
          setIsInfoVisible(false);
          setIsSuccessVisible(false);
          setIsErrorVisible(true);
          setErrorMessage("El cliente ya existe.");
        } else {
          setIsSuccessVisible(true);
          setIsErrorVisible(false);
          setErrors({});
          navigate("/Customers");
          setTimeout(() => {
            setIsSuccessVisible(false);
          }, 4000);
        }
      }
    } catch (error) {
      // Verifica si el error contiene "CLIENT_ARCHIVED"
      if (error.response?.data?.message === "CLIENT_ARCHIVED") {
        setInfoPayload(payload);
        setIsInfoVisible(true);
        setIsSuccessVisible(false);
        setIsErrorVisible(false);
      } else if (
        error.response?.data?.message.startsWith("CLIENT_ALREADY_EXISTS")
      ) {
        setIsInfoVisible(false);
        setIsSuccessVisible(false);
        setIsErrorVisible(true);
        setErrorMessage("El cliente ya existe.");
      } else {
        setErrorMessage("El cliente ya existe.");
        console.error("Error al guardar el cliente", error);
        setIsErrorVisible(true);
        setIsSuccessVisible(false);
        setTimeout(() => {
          setIsErrorVisible(false);
        }, 4000);
      }
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
              navigate("/Customers");
            }}
          />
        </div>
      </Section>
      <div className="moduleNew-form-container">
        <h3 className="basic-info-form-title">Información del Cliente</h3>
        <div className="basic-info-form-grid">
          <div className="basic-info-form-group">
            <label style={{ color: errors.codcli ? "red" : "inherit" }}>
              Código de Cliente
            </label>
            <input
              type="text"
              placeholder="Código"
              value={codcli}
              onChange={(e) => setCodigo(e.target.value)}
              readOnly// Si customerCode existe, el campo será read-only
            />

            {errors.codcli && <p className="error-message">{errors.codcli}</p>}
          </div>
          <div className="basic-info-form-group">
            <label style={{ color: errors.cif ? "red" : "inherit" }}>
              Documento de Identificación
            </label>
            <input
              type="text"
              placeholder="Documento de Identificación"
              value={cif}
              onChange={handleCifChange}
              onKeyDown={handleDocumentSearch}
              readOnly={!!customerCode}
            />
            {errors.cif && <p className="error-message">{errors.cif}</p>}
          </div>
          <div className="basic-info-form-group">
            <label style={{ color: errors.nomcli ? "red" : "inherit" }}>
              Razón Social
            </label>
            <input
              type="text"
              placeholder="Razón Social"
              value={nomcli}
              onChange={(e) => setNombre(e.target.value)}
            />
            {errors.nomcli && <p className="error-message">{errors.nomcli}</p>}
          </div>
          <div className="basic-info-form-group">
            <label>Nombre Comercial</label>
            <input
              type="text"
              placeholder="Nombre Comercial"
              value={nomComercial}
              onChange={(e) => setNombreComercial(e.target.value)}
            />
          </div>

          <div className="basic-info-form-group">
            <label style={{ color: errors.tipoCif ? "red" : "inherit" }}>
              Tipo Documento de Identificación
            </label>
            <input
              type="text"
              readOnly
              placeholder="Tipo Documento de Identificación"
              value={documentTypeText ?? tipoCif}
            />
            <input type="hidden" value={tipoCif} />
            {errors.tipoCif && (
              <p className="error-message">{errors.tipoCif}</p>
            )}
          </div>
          <div className="basic-info-form-group">
            <label style={{ color: errors.direc1 ? "red" : "inherit" }}>
              {" "}
              Dirección
            </label>
            <input
              type="text"
              placeholder="Dirección"
              value={direc1}
              onChange={(e) => setDireccion(e.target.value)}
            />
            {errors.direc1 && <p className="error-message">{errors.direc1}</p>}
          </div>
          <div className="basic-info-form-group">
            <label style={{ color: errors.tlf1 ? "red" : "inherit" }}>
              Teléfono
            </label>
            <input
              type="text"
              placeholder="Teléfono"
              value={tlf1}
              onChange={(e) => setTelefono(e.target.value)}
            />
            {errors.tlf1 && <p className="error-message">{errors.tlf1}</p>}
          </div>
          <div className="basic-info-form-group">
            <label style={{ color: errors.distribuidor ? "red" : "inherit" }}>
              Distribuidor
            </label>
            <select
              value={distribuidor}
              onChange={(e) => setCanal(e.target.value)}
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
            <label style={{ color: errors.email ? "red" : "inherit" }}>
              {" "}
              Email
            </label>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={handleChange}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
        </div>
        <div className="basic-form-footer">
          <button
            className="basic-custom-button"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/Customers");
            }}
          >
            <FontAwesomeIcon icon={faXmark} className="basic-shortcut-icon" />
            Cancelar
          </button>
          <button
            className="basic-custom-button"
            onClick={handleSave}
            disabled={isButtonDisabled}
          >
            <FontAwesomeIcon
              icon={customerCode ? faRotate : faSave}
              className="basic-shortcut-icon"
            />
            {customerCode ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </div>
      <SuccessNotification
        message={
          customerCode
            ? "El Cliente se ha Actualizado Correctamente."
            : "El CLiente se ha Creado Correctamente."
        }
        isVisible={isSuccessVisible}
        onClose={() => setIsSuccessVisible(false)}
      />
      <ErrorNotification
        message={errorsMessage}
        isVisible={isErrorVisible}
        onClose={() => setIsErrorVisible(false)}
      />
      <InfoNotification
        message="Cliente Archivado. ¿Desea restaurarlo?"
        isVisible={isInfoVisible}
        onClose={() => setIsInfoVisible(false)}
        payload={infoPayload}
      />
      <WarningNotification
        message={warningMessage}
        isVisible={isWarningVisible}
        onClose={() => setIsWarningVisible(false)}
      />
      {loading && <Loader />}
    </div>
  );
};

export default ClientForm;

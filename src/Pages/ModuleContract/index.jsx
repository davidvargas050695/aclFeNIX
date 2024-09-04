import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './ModuleContract.css';
import DatePicker from 'react-datepicker';
import { es } from 'date-fns/locale';
import Header from '../../components/Header';
import Section from '../../components/Section';
import SuccessNotification from '../../components/Notifications/SuccessNotification';
import ErrorNotification from '../../components/Notifications/ErrorNotification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'react-datepicker/dist/react-datepicker.css';
import { faSave, faRotate, faCircleArrowLeft, faXmark } from '@fortawesome/free-solid-svg-icons';
import apiClient from "../../axios";

const ModuleContract = ({ handleLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const moduleId = searchParams.get('moduleId');

  const [distributors, setDistributors] = useState([]);
  const [numContId, setContId] = useState('');
  const [modulo, setCodigo] = useState('');
  const [numLicencias, setNumLicencias] = useState('');
  const [origen, setOrigen] = useState('');
  const [canal, setCanal] = useState('');
  const [fechaFin, setFechaFin] = useState(null);
  const [activo, setIsActive] = useState(0);
  const [motivo, setMotivo] = useState('');
  const [isPay, setIsPay] = useState(0);
  const [maxCount, setMaxCount] = useState('');
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const toggleSwitch = () => {
    setIsActive(prev => !prev);
  };

  useEffect(() => {
    const fetchDistributors = async () => {
      try {
        const response = await apiClient.get('/distributors');
        setDistributors(response.data);
      } catch (error) {
        console.error('Error fetching distributors:', error);
      }
    };

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
          const fechaFin = response.data.fechaFin ? new Date(response.data.fechaFin) : null;
          setContId(response.data.numContId);
          setCodigo(response.data.modulo);
          setNumLicencias(response.data.numLicencias);
          setOrigen(response.data.origen);
          setCanal(response.data.canal);
          setFechaFin(fechaFin);
          setSelectedDate(fechaFin);
          setIsActive(response.data.activo === 1);
          setMotivo(response.data.motivo);
          setIsPay(response.data.isPay === 1 ? "Pagado" : "Gratis");
          setMaxCount(response.data.maxCount);

        } catch (error) {
          console.error('Error al cargar el modulo', error);
        }
      };
      fetchModule();
    }
    else if (numContId) {
      setContId(numContId);

    }
  }, [moduleId]);


  const handleSave = async () => {
    const payload = {
      numContId,
      modulo,
      origen,
      canal,
      numLicencias,
      activo: activo === "Activo" ? true : false,
      motivo,
      isPay: isPay === "Pagado" ? true : false,
      maxCount,

    };
    const payloadUpdate = {
      isPay: isPay === "Pagado" ? true : false,
      maxCount,
      activo: activo === "Activo" ? true : false,
      motivo,
      fechaFin,
      numLicencias,
      canal,
      origen
    };

    try {
      if (moduleId) {
        // Modo edición: usar PATCH
        console.log(payloadUpdate);
        await apiClient.patch(`/modules/edit_by_contract/${numContId}/${modulo}`, payloadUpdate);
      } else {
        // Modo creación: usar POST
        await apiClient.post('/modules', payload);
      }
      setIsSuccessVisible(true);
      setIsErrorVisible(false);
      setTimeout(() => {
        setIsSuccessVisible(false);
      }, 4000);

    } catch (error) {
      console.error('Error al guardar el modulo', error);
      setIsErrorVisible(true);
      setIsSuccessVisible(false);
      setTimeout(() => {
        setIsErrorVisible(false);
      }, 4000);
    }
  };

  return (
    <div className="home-container">
      <Header onLogout={handleLogout} title='Módulo por Contrato' />
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
      <div className="moduleNew-form-container">
        <h3 className="basic-info-form-title">Información del Módulo</h3>
        <div className="basic-info-form-grid">
          <div className="basic-info-form-group">
            <label>Númerouser de Contrato</label>
            <input
              type="text"
              placeholder="Contrato"
              value={numContId}
              onChange={(e) => setContId(e.target.value)}
            />
          </div>
          <div className="basic-info-form-group">
            <label>Código de Módulo</label>
            <input
              type="text"
              placeholder="Código"
              value={modulo}
              onChange={(e) => setCodigo(e.target.value)}
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
            <input
              type="text"
              placeholder="Origen"
              value={origen}
              onChange={(e) => setOrigen(e.target.value)}
            />
          </div>
        </div>
        <div className="basic-info-form-grid-three">
          <div className="basic-info-form-group4">
            <label>Distribuidor</label>
            <select
              value={canal}
              onChange={(e) => setCanal(e.target.value)}
            >
              <option value="">Seleccione un Distribuidor</option>
              {distributors.map((distributor) => (
                <option key={distributor.code} value={distributor.code}>
                  {distributor.name}
                </option>
              ))}
            </select>
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
              <div className={`slider-option ${activo ? 'active' : 'inactive'}`}>
                Activo
              </div>
              <div className={`slider-option ${!activo ? 'active' : 'inactive'}`}>
                Inactivo
              </div>
            </div>

          </div>
        </div>
        <div className="basic-info-form-grid">

          <div className="basic-info-form-group">
            <label>Plan</label>
            <select
              value={isPay}
              onChange={(e) => setIsPay(e.target.value)}
            >
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
              navigate('/Module');
            }}
          >
            <FontAwesomeIcon icon={faXmark} className="basic-shortcut-icon" />
            Cancelar
          </button>
          <button className="basic-custom-button" onClick={handleSave}>
            <FontAwesomeIcon icon={moduleId ? faRotate : faSave} className="basic-shortcut-icon" />{moduleId ? 'Actualizar' : 'Guardar'}
          </button>
        </div>
      </div>
      <SuccessNotification
        message={moduleId ? "El Módulo se ha Actualizado Correctamente." : "El Módulo se ha Creado Correctamente."}
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

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Section from '../../components/Section';
import './ModuleNew.css';
import SuccessNotification from '../../components/Notifications/SuccessNotification';
import ErrorNotification from '../../components/Notifications/ErrorNotification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'react-datepicker/dist/react-datepicker.css';
import { faSave, faRotate, faCircleArrowLeft, faXmark } from '@fortawesome/free-solid-svg-icons';
import apiClient from "../../axios";

const ModuleNew = ({ handleLogout }) => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [codigo, setCodigo] = useState('');
  const [origen, setOrigen] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          const response = await apiClient.get(`/products/${productId}`);
          setCodigo(response.data.codigo);
          setOrigen(response.data.origen);
          setDescripcion(response.data.descripcion);
        } catch (error) {
          console.error('Error al cargar el producto', error);
        }
      };
      fetchProduct();
    }
  }, [productId]);

  const handleSave = async () => {
    const payload = {
      codigo,
      origen,
      descripcion
    };
    const payloadUpdate = {
      origen,
      descripcion
    };

    try {
      if (productId) {
        // Modo edición: usar PATCH
        await apiClient.patch(`/products/${productId}`, payloadUpdate);
      } else {
        // Modo creación: usar POST
        await apiClient.post('/products', payload);
      }
      navigate('/Module');
      setIsSuccessVisible(true);
      setIsErrorVisible(false);
      setTimeout(() => {
        setIsSuccessVisible(false);
      }, 4000);

    } catch (error) {
      console.error('Error al guardar el producto', error);
      setIsErrorVisible(true);
      setIsSuccessVisible(false);
      setTimeout(() => {
        setIsErrorVisible(false);
      }, 4000);
    }
  };

  return (
    <div className="home-container">
      <Header onLogout={handleLogout} title='Módulo' />
      <Section>
        <div className="button-return-container">
          <FontAwesomeIcon
            className="basic-shortcut-icon"
            style={{ cursor: 'pointer' }}
            icon={faCircleArrowLeft}
            onClick={(e) => {
              e.stopPropagation();
              navigate('/Module');
            }} />
        </div>
      </Section>
      <div className="moduleNew-form-container">
        <h3 className="basic-info-form-title">Información del Módulo</h3>
        <div className="basic-info-form-grid">
          <div className="basic-info-form-group">
            <label>Código de Contrato</label>
            <input
              type="text"
              placeholder="Código"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
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
              <option value="VFoxPro">Visual FoxPro</option>
              <option value="C#">C#</option>
              <option value="Móvil">Móvil</option>
            </select>
          </div>
          <div className="basic-info-form-group">
            <label>Descripción</label>
            <input
              type="text"
              placeholder="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>
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
            <FontAwesomeIcon icon={productId ? faRotate : faSave} className="basic-shortcut-icon" />{productId ? 'Actualizar' : 'Guardar'}
          </button>
        </div>
      </div>
      <SuccessNotification
        message={productId ? "El Módulo se ha Actualizado Correctamente." : "El Módulo se ha Creado Correctamente."}
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

export default ModuleNew;

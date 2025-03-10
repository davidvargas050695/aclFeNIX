import React, { useState, useEffect } from 'react';
import './ContractForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from 'react-datepicker';
import { es } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { faSync, faClose, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import apiClient from '../../axios';
import SuccessNotification from '../../components/Notifications/SuccessNotification';
import ErrorNotification from '../../components/Notifications/ErrorNotification';
import Loader from "../Loader";

const ContractForm = ({ selectedRow, closeModal, isEdit }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [productType, setProductType] = useState([]);
  const [typeContract, setTypeContract] = useState([]);
  const [distributors, setDistributors] = useState([]);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [formValues, setFormValues] = useState({
    numCont: '',
    numSerie: '',
    cliente: '',
    contEmpre: 'a',
    servidor: '',
    observacion: '',
    tipocontra: '',
    tipoContrato: '',
    numSer: 0,
    numCli: 0,
    distribuidor: '',
    aNumCli: 0,
    nReactiva: 0,
    reactiva: 0,
    aReactiva: 0,
    aNumSer: 0,
    nNumSer: 0,
    nNumCli: 0,
    reg1: '',
    reg2: '',
    proxPago: '',
    observacion2: '',
    solicitado: 1,
    checkobservacion: false,
  });

  useEffect(() => {
    const fetchProducts = async () => {
        try {
            const response = await apiClient.get('/product_type');
            setProductType(response.data);
            setIsSuccessVisible(true);
        } catch (error) {
             setIsErrorVisible(true);
            console.error('Error fetching products:', error);
        }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchTipoContra = async () => {
        try {
            const response = await apiClient.get('/contract_type');
            setTypeContract(response.data);
            setIsSuccessVisible(true);
        } catch (error) {
              setIsErrorVisible(true);
            console.error('Error fetching contract:', error);
        }
    };

    fetchTipoContra();
  }, []);

  useEffect(() => {
    if (selectedRow) {
      setFormValues({
        numCont: selectedRow.numCont || '',
        numSerie: selectedRow.numSerie || '',
        cliente: selectedRow.cliente || '',
        contEmpre: selectedRow.contEmpre || 'a',
        servidor: selectedRow.servidor || '',
        observacion: selectedRow.observacion || '',
        tipocontra: selectedRow.tipocontra || '',
        tipoContrato: selectedRow.tipoContrato || '',
        numSer: selectedRow.numSer || 0,
        numCli: selectedRow.numCli || 0,
        distribuidor: selectedRow.distribuidor || '',
        aNumSer: selectedRow.aNumSer || 0,
        observacion2: selectedRow.observacion2 || '',
        checkobservacion: selectedRow.checkobservacion === 1 ? true : false || false,
        nNumSer: selectedRow.nNumSer || 0,
        nNumCli: selectedRow.nNumCli || 0,
        reg1: selectedRow.reg1 || 0,
        reg2: selectedRow.reg2 || 0,
        solicitado: selectedRow.solicitado || 1,
        aNumCli: selectedRow.aNumCli || 0,
        reactiva: selectedRow.reactiva || 0,
        nReactiva: selectedRow.nReactiva || 0,
        aReactiva: selectedRow.aReactiva || 0,
        proxPago: selectedRow.proxPago || '',
      });
    }
  }, [selectedRow]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const toggleSwitch = () => {
    setFormValues((prevValues) => ({
      ...prevValues,
      checkobservacion: !prevValues.checkobservacion
    }));
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

    fetchDistributors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const {  numCont,  fechaFin, cliente, reg1, reg2, ...formValuesWithoutClientAndContEmpre } = formValues;
      const formValuesWithProxPago = {
        ...formValuesWithoutClientAndContEmpre,
        proxPago: new Date(formValues.proxPago).toISOString(),
      };
      const response = await apiClient.patch(`contracts/${numCont}`, formValuesWithProxPago);
      setIsSuccessVisible(true);
      closeModal();
    } catch (error) {
      setIsErrorVisible(true);
      console.error('Error al enviar el formulario:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (formValues.proxPago && formValues.proxPago !== "0000-00-00 00:00:00") {
      setSelectedDate(new Date(formValues.proxPago));
    } else {
      setSelectedDate(null);
    }
  }, [formValues.proxPago]);

  return (
    <div className="basic-info-form-container">
      <h3 className="basic-info-form-title">Información del Contrato</h3>
      <form onSubmit={handleSubmit}>
        <div className="basic-info-form-grid">
          <div className="basic-info-form-group">
            <label>Nro de Contrato</label>
            <input
              type="text"
              name="numCont"
              value={formValues.numCont}
              onChange={handleChange}
              readOnly  // Solo editable si isEdit es true
            />
          </div>
          <div className="basic-info-form-group">
            <label>Cliente</label>
            <input
              type="text"
              name="cliente"
              value={formValues.cliente}
              onChange={handleChange}
              readOnly  // Siempre en modo de solo lectura
            />
          </div>
          <div className="basic-info-form-group">
            <label>Nro de Identificador</label>
            <input
              type="text"
              name="numSerie"
              value={formValues.numSerie}
              onChange={handleChange}
              readOnly={!isEdit}  // Solo editable si isEdit es true
            />
          </div>
          <div className="basic-info-form-group">
            <label>Servidor</label>
            <input
              type="text"
              name="servidor"
              value={formValues.servidor}
              onChange={handleChange}
              readOnly={!isEdit}  // Solo editable si isEdit es true
            />
          </div>
          <div className="basic-info-form-group">
            <label>Distribuidor</label>
            <select
              name="distribuidor"
              value={formValues.distribuidor}
              onChange={handleChange}
              disabled={!isEdit}  // Deshabilitado si isEdit es false
            >
              <option value="">Seleccione un Tipo Producto</option>
              {distributors.map((distributor) => (
                <option key={distributor.code} value={distributor.code}>
                  {distributor.code}
                </option>
              ))}
            </select>
          </div>
          <div className="basic-info-form-group">
            <label>Cáduca</label>
            <div className="basic-info-date-picker">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  setFormValues((prevValues) => ({
                    ...prevValues,
                    proxPago: date
                  }));
                }}
                locale={es}
                dateFormat="MMMM d, yyyy"
                placeholderText="Selecciona la Fecha"
                className="custom-date-picker"
                disabled={!isEdit}  // Deshabilitado si isEdit es false
              />
            </div>
          </div>
          <div className="basic-info-form-group">
  <label>Producto</label>
  <select
    name="tipocontra"
    value={formValues.tipocontra}
    onChange={handleChange}
    disabled={!isEdit}  // Deshabilitado si isEdit es false
  >
    <option value="">Seleccione un Tipo Producto</option>
    {productType.map((product) => (
      <option key={product.code} value={product.code}>
        {product.description}  {/* Mostrar la descripción */}
      </option>
    ))}
  </select>
</div>

<div className="basic-info-form-group">
  <label>Tipo de Contrato</label>
  <select
    name="tipoContrato"
    value={formValues.tipoContrato}
    onChange={handleChange}
    disabled={!isEdit}  // Deshabilitado si isEdit es false
  >
    <option value="">Seleccione un Tipo Contrato</option>
    {typeContract.map((contract) => (
      <option key={contract.code} value={contract.code}>
        {contract.description}  {/* Mostrar la descripción */}
      </option>
    ))}
  </select>
</div>

          <div className="basic-info-form-group">
            <label>Observación</label>
            <input
              type="text"
              name="observacion"
              value={formValues.observacion}
              onChange={handleChange}
              readOnly={!isEdit}  // Solo editable si isEdit es true
            />
          </div>
          <div className="basic-info-form-switch">
            <label>Estado</label>
            <div className="slider-container-contract" onClick={toggleSwitch}>
              <div className={`slider-option-contract ${formValues.checkobservacion ? 'active-contract' : 'inactive-contract'}`}>
                Bloqueado
              </div>
              <div className={`slider-option-contract ${!formValues.checkobservacion ? 'active-contract' : 'inactive-contract'}`}>
                No Bloqueado
              </div>
            </div>
          </div>
          {formValues.checkobservacion && (
            <div className="basic-info-form-group">
              <label>Bloqueo</label>
              <input
                type="text"
                name="observacion2"
                placeholder="Comentario"
                value={formValues.observacion2}
                onChange={handleChange}
                readOnly={!isEdit}  // Solo editable si isEdit es true
              />
            </div>
          )}
        </div>
        <hr className="divider" />
        <h3 className="basic-info-form-title">Número de Licencias</h3>
        <div className="basic-info-form-grid1">
          <div className="basic-info-form-group3">
            <label>Módulo Comercial</label>
            <div className="counter-group">
              <div className="counter">
                <p className="basic-subtittle">Servidores</p>
                <div className="counter-controls">
                  <button
                    type="button"
                    className="icon-button-desc-asc"
                    onClick={() =>
                      setFormValues((prevValues) => ({
                        ...prevValues,
                        numSer: prevValues.numSer > 0 ? prevValues.numSer - 1 : 0,
                      }))
                    }
                    disabled={!isEdit}  // Deshabilitado si isEdit es false
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <input
                    type="text"
                    name="numSer"
                    value={formValues.numSer}
                    onChange={handleChange}
                    readOnly={!isEdit}  // Solo editable si isEdit es true
                  />
                  <button
                    type="button"
                    className="icon-button-desc-asc"
                    onClick={() =>
                      setFormValues((prevValues) => ({
                        ...prevValues,
                        numSer: prevValues.numSer + 1,
                      }))
                    }
                    disabled={!isEdit}  // Deshabilitado si isEdit es false
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              </div>
              <div className="counter">
                <p className="basic-subtittle">Clientes</p>
                <div className="counter-controls">
                  <button
                    type="button"
                    className="icon-button-desc-asc"
                    onClick={() =>
                      setFormValues((prevValues) => ({
                        ...prevValues,
                        numCli: prevValues.numCli > 0 ? prevValues.numCli - 1 : 0,
                      }))
                    }
                    disabled={!isEdit}  // Deshabilitado si isEdit es false
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <input
                    type="text"
                    name="numCli"
                    value={formValues.numCli}
                    onChange={handleChange}
                    readOnly={!isEdit}  // Solo editable si isEdit es true
                  />
                  <button
                    type="button"
                    className="icon-button-desc-asc"
                    onClick={() =>
                      setFormValues((prevValues) => ({
                        ...prevValues,
                        numCli: prevValues.numCli + 1,
                      }))
                    }
                    disabled={!isEdit}  // Deshabilitado si isEdit es false
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="basic-form-footer">
          <button type="submit" className="basic-custom-button" onClick={closeModal}>
            <FontAwesomeIcon icon={faClose} className="basic-shortcut-icon" />Cerrar
          </button>
          {isEdit && (
            <button type="submit" className="basic-custom-button">
              <FontAwesomeIcon icon={faSync} className="basic-shortcut-icon" />Actualizar
            </button>
          )}
        </div>
      </form>
      <SuccessNotification
        message={"Se ha cargado correctamente"}
        isVisible={isSuccessVisible}
        onClose={() => setIsSuccessVisible(false)}
      />
      <ErrorNotification
        message="Ups! Ocurrió un Problema"
        isVisible={isErrorVisible}
        onClose={() => setIsErrorVisible(false)}
      />
      {loading && <Loader />}
    </div>
  );
};

export default ContractForm;

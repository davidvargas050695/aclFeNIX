import React, { useState, useEffect } from 'react';
import './ContractForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from 'react-datepicker';
import { es } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { faSync, faClose, faPlus , faMinus } from '@fortawesome/free-solid-svg-icons';
import apiClient from '../../axios'; // Asegúrate de tener esta importación
import SuccessNotification from '../../components/Notifications/SuccessNotification';
import ErrorNotification from '../../components/Notifications/ErrorNotification';

const ContractForm = ({ selectedRow, closeModal }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [productType, setProductType] = useState([]);
  const [typeContract, setTypeContract] = useState([]);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    numCont: '',
    numSerie: '',
    cliente: '',
    contEmpre: '',
    servidor: '',
    observacion: '',
    tipocontra: '',
    tipoContrato: '',
    numSer: 0,
    numCli: 0,
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
        contEmpre: selectedRow.contEmpre || '',
        servidor: selectedRow.servidor || '',
        observacion: selectedRow.observacion || '',
        tipocontra: selectedRow.tipocontra || '',
        tipoContrato: selectedRow.tipoContrato || '',
        numSer: selectedRow.numSer || 0,
        numCli: selectedRow.numCli || 0,
        aNumSer: selectedRow.aNumSer || 0,
        observacion2: selectedRow.observacion2 || '',
        checkobservacion: selectedRow.checkobservacion === 1 ? true : false || false,
        nNumSer: selectedRow.nNumSer || 0,
        nNumCli: selectedRow.nNumCli || 0,
        reg1: selectedRow.reg1 || 0,
        reg2:  selectedRow.reg2 || 0,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Crear una copia de formValues y eliminar las propiedades cliente y contEmpre
      const {  numCont,  fechaFin, cliente, reg1, reg2, ...formValuesWithoutClientAndContEmpre } = formValues;
      const formValuesWithProxPago = {
        ...formValuesWithoutClientAndContEmpre,
        proxPago: new Date(formValues.proxPago).toISOString(), // Asignamos fechaFin a proxPago
      };
      // Enviar la copia modificada de formValues al servidor
      const response = await apiClient.patch( `contracts/${numCont}`, formValuesWithProxPago);
      setIsSuccessVisible(true);
      closeModal()
      // Aquí puedes manejar lo que ocurre después de la actualización
    } catch (error) {
      setIsErrorVisible(true);
      console.error('Error al enviar el formulario:', error);
    }
};

  useEffect(() => {
    if (formValues.proxPago) {
      setSelectedDate(new Date(formValues.proxPago));
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
            />
          </div>
          <div className="basic-info-form-group">
            <label>Nro de Identificador</label>
            <input
              type="text"
              name="numSerie"
              value={formValues.numSerie}
              onChange={handleChange}
            />
          </div>
          <div className="basic-info-form-group">
            <label>Cliente</label>
            <input
              type="text"
              name="cliente"
              value={formValues.cliente}
              onChange={handleChange}
              readOnly
            />
          </div>
          <div className="basic-info-form-group">
            <label>Sucursal</label>
            <input
              type="text"
              name="contEmpre"
              value={formValues.contEmpre}
              onChange={handleChange}
            />
          </div>
          <div className="basic-info-form-group">
            <label>Servidor</label>
            <input
              type="text"
              name="servidor"
              value={formValues.servidor}
              onChange={handleChange}
            />
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
              />
            </div>
          </div>
           <div className="basic-info-form-group">
            <label>Producto</label>
            <select
              name="tipocontra"
              value={formValues.tipocontra}
              onChange={handleChange}
            >
              <option value="">Seleccione un Tipo Producto</option>
              {productType.map((product) => (
                <option key={product.code} value={product.code}>
                  {product.code}
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
              />
            </div>
          )}
            <div className="basic-info-form-group">
            <label>Tipo de Contrato</label>
            <select
              name="tipoContrato"
              value={formValues.tipoContrato}
              onChange={handleChange}
            >
              <option value="">Seleccione un Tipo Contrato</option>
              {typeContract.map((contract) => (
                <option key={contract.code} value={contract.code}>
                  {contract.code}
                </option>
              ))}
            </select>
          </div>
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
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <input
          type="text"
          name="numSer"
          value={formValues.numSer}
          onChange={handleChange}
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
        >
                    <FontAwesomeIcon icon={faMinus} />
        </button>
        <input
          type="text"
          name="numCli"
          value={formValues.numCli}
          onChange={handleChange}
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
        >
                    <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </div>
  </div>
</div>


          {/*
          <div className="basic-info-form-group3">
            <label>Módulo de Activos</label>
            <div className="counter-group">
              <div className="counter">
                <p className="basic-subtittle">Servidores</p>
                <input
                  type="text"
                  name="aNumSer"
                  value={formValues.aNumSer}
                  onChange={handleChange}
                />
              </div>
              <div className="counter">
                <p className="basic-subtittle">Clientes</p>
                <input
                  type="text"
                  name="aNumCli"
                  value={formValues.aNumCli}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          */}
        </div>
        <div className="basic-form-footer">
        <button type="submit" className="basic-custom-button" onClick={closeModal}>
            <FontAwesomeIcon icon={faClose} className="basic-shortcut-icon" />Cerrar
          </button>
          <button type="submit" className="basic-custom-button">
            <FontAwesomeIcon icon={faSync} className="basic-shortcut-icon" />Actualizar
          </button>
        </div>
      </form>
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
  );
};

export default ContractForm;

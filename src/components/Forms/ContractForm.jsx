import React, { useState, useEffect } from 'react';
import './ContractForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { faSync } from '@fortawesome/free-solid-svg-icons';

const ContractForm = ({ selectedRow }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const [formValues, setFormValues] = useState({
    numCont: '',
    numSerie: '',
    cliente: '',
    contEmpre: '',
    servidor: '',
    observacion: '',
    tipocontra: '',
    tipoContrato: '',
    numSer: '',
    numCli: '',
    aNumSer: '',
    aNumCli: '',
    fechaFin: ''
  });

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
        numSer: selectedRow.numSer || '',
        numCli: selectedRow.numCli || '',
        aNumSer: selectedRow.aNumSer || '',
        aNumCli: selectedRow.aNumCli || '',
        fechaFin: selectedRow.fechaFin || '',
      });
    }
  }, [selectedRow]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Manejar el envío del formulario
  };

  useEffect(() => {
    if (formValues.fechaFin) {
      setSelectedDate(new Date(formValues.fechaFin));
    }
  }, [formValues.fechaFin]);

  return (
    <div className="basic-info-form-container">
      <h3 className="basic-info-form-title">Información del Contrato</h3>
      <div className="basic-info-form-grid">
        <div className="basic-info-form-group">
          <label>Nro de Contrato</label>
          <input
            type="text"
            name="numCont"
            value={formValues.numCont}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div className="basic-info-form-group">
          <label>Nro de Identificador</label>
          <input
            type="text"
            name="numCont"
            value={formValues.numSerie}
            onChange={handleChange}
          />
        </div>
        <div className="basic-info-form-group">
          <label>Cliente</label>
          <input
            type="text"
            name="numCont"
            value={formValues.cliente}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div className="basic-info-form-group">
          <label>Sucursal</label>
          <input
            type="text"
            name="numCont"
            value={formValues.contEmpre}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div className="basic-info-form-group">
          <label>Servidor</label>
          <input
            type="text"
            name="numCont"
            value={formValues.servidor}
            onChange={handleChange}
            readOnly
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
                  fechaFin: date
                }));
              }}
              dateFormat="MMMM d, yyyy"
              placeholderText="Selecciona la Fecha"
              className="custom-date-picker"
            />
          </div>
        </div>
        <div className="basic-info-form-group">
          <label>Producto</label>
          <input
            type="text"
            name="numCont"
            value={formValues.tipocontra}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div className="basic-info-form-group">
          <label>Tipo de Contrato</label>
          <input
            type="text"
            name="numCont"
            value={formValues.tipoContrato}
            onChange={handleChange}
            readOnly
          />
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
              <input
                type="text"
                name="numSer"
                value={formValues.numSer}
                onChange={handleChange}
                readOnly
              />
            </div>
            <div className="counter">
              <p className="basic-subtittle">Clientes</p>
              <input
                type="text"
                name="numCli"
                value={formValues.numCli}
                onChange={handleChange}
                readOnly
              />
            </div>
          </div>
        </div>
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
                readOnly
              />
            </div>
            <div className="counter">
              <p className="basic-subtittle">Clientes</p>
              <input
                type="text"
                name="aNumCli"
                value={formValues.aNumCli}
                onChange={handleChange}
                readOnly
              />
            </div>

          </div>

        </div>

      </div>
      <div className="basic-form-footer">
        <button className="basic-custom-button">
          <FontAwesomeIcon icon={faSync} className="basic-shortcut-icon" />Actualizar
        </button>
      </div>
    </div>
  );
};

export default ContractForm;

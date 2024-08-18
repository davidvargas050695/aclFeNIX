import React, { useState } from 'react';
import './ContractForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { faSync } from '@fortawesome/free-solid-svg-icons';

const ContractForm = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  return (
    <div className="basic-info-form-container">
      <h3 className="basic-info-form-title">Información del Contrato</h3>
      <div className="basic-info-form-grid">
        <div className="basic-info-form-group">
          <label>Nro de Contrato</label>
          <input type="text" placeholder="Alec" />
        </div>
        <div className="basic-info-form-group">
          <label>Nro de Identificador</label>
          <input type="text" placeholder="Thompson" />
        </div>
        <div className="basic-info-form-group">
          <label>Cliente</label>
          <input type="text" placeholder="Thompson" />
        </div>
        <div className="basic-info-form-group">
          <label>Sucursal</label>
          <input type="text" placeholder="Thompson" />
        </div>
        <div className="basic-info-form-group">
          <label>Servidor</label>
          <input type="text" placeholder="Thompson" />
        </div>
        <div className="basic-info-form-group">
          <label>Cáduca</label>
          <div className="basic-info-date-picker">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="MMMM d, yyyy"
            placeholderText="Selecciona la Fecha"
            className="custom-date-picker"
          />
          </div>
        </div>
        <div className="basic-info-form-group">
          <label>Producto</label>
          <select>
            <option>Fenix</option>
            {/* Add more languages here */}
          </select>
        </div>
        <div className="basic-info-form-group">
          <label>Tipo de Contrato</label>
          <select>
            <option>Fenix</option>
            {/* Add more languages here */}
          </select>
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

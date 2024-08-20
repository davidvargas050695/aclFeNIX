import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/Header';
import WarningNotification from '../../components/Notifications/WarningNotification';
import './ClientForm.css';

const ClientForm = ({ handleLogout }) => {
    // const [formData, setFormData] = useState({
    const [formData] = useState({
        firstName: '',
        lastName: '',
        emailConfirm: '',
        email: '',
        phone: '',
        im: '',
        day: '',
        month: '',
        year: '',
        languaje: '',
        province: '',
        city: '',
        address: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Datos del formulario:', formData);
    };

    const [isNotificationVisible, setIsNotificationVisible] = useState(false);

    const showNotification = () => {
        setIsNotificationVisible(true);
        setTimeout(() => {
            setIsNotificationVisible(false);
        }, 90000);
    };


    return (
        <div className="home-container">
            <Header onLogout={handleLogout} title="Nuevo Cliente" />
            <form className="client-form" onSubmit={handleSubmit}>
                <div className="title">
                    <h1>DATOS DE CLIENTE</h1>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label className="clientForm-label">RAZÓN SOCIAL</label>
                        <input className="clientForm-input" type="text" placeholder="Alex Torres" />
                    </div>
                    <div className="form-group">
                        <label className="clientForm-label">NOMBRE COMERCIAL</label>
                        <input className="clientForm-input" type="text" placeholder="Nombre Comercial" />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label className="clientForm-label">CÉDULA/RUC</label>
                        <input className="clientForm-input" type="text" placeholder="9999999999" />
                    </div>
                    <div className="form-group">
                        <label className="clientForm-label">TIPO DOCUMENTO DE IDENTIFICACIÓN</label>
                        <select>
                            <option value="1">Cédula</option>
                            <option value="2">RUC</option>
                        </select>
                    </div>

                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label className="clientForm-label">EMAIL</label>
                        <input className="clientForm-input" type="email" placeholder="email@example.com" />
                    </div>
                    <div className="form-group">
                        <label>CONFIRMACIÓN DE EMAIL</label>
                        <input className="clientForm-input" type="email" placeholder="Confoirmación Email" />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label className="clientForm-label">DIRECCIÓN</label>
                        <input className="clientForm-input" type="text" placeholder="Dirección" />
                    </div>
                    <div className="form-group">
                        <label className="clientForm-label">NÚMERO DE TELÉFONO</label>
                        <input className="clientForm-input" type="tel" placeholder="0999999999" />
                    </div>
                </div>
                <div className="button-action">
                    <button className="basic-custom-button" onClick={showNotification}>
                        <FontAwesomeIcon icon={faSave} className="shortcut-icon" /> Guardar
                    </button>
                </div>

                <WarningNotification
                    message="Mensaje de Generico"
                    isVisible={isNotificationVisible}
                    onClose={() => setIsNotificationVisible(false)}
                />

            </form>
        </div>
    );
};

export default ClientForm;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/Header';
import WarningNotification from '../../components/Notifications/WarningNotification';
import './ClientForm.css';

const ClientForm = ({ handleLogout }) => {
    const [formData, setFormData] = useState({
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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Datos del formulario:', formData);
    };

    const navigate = useNavigate();

    const handleCancel = () => {
        navigate(-1); // Esto te lleva a la página anterior
    };

    const [isNotificationVisible, setIsNotificationVisible] = useState(false);

    const showNotification = () => {
        setIsNotificationVisible(true);
        setTimeout(() => {
            setIsNotificationVisible(false);
        }, 3000);
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
                        <label>RAZÓN SOCIAL</label>
                        <input type="text" placeholder="Alec" />
                    </div>
                    <div className="form-group">
                        <label>NOMBRE COMERCIAL</label>
                        <input type="text" placeholder="Nombre Comercial" />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>CÉDULA/RUC</label>
                        <input type="text" />
                    </div>
                    <div className="form-group">
                        <label>TIPO DOCUMENTO DE IDENTIFICACIÓN</label>
                        <select>
                            <option value="1">Cédula</option>
                            <option value="2">RUC</option>
                        </select>
                    </div>

                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>EMAIL</label>
                        <input type="email" placeholder="email@example.com" />
                    </div>
                    <div className="form-group">
                        <label>CONFIRMATION EMAIL</label>
                        <input type="email" placeholder="Confirm Email" />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>DIRECCIÓN</label>
                        <input type="text" placeholder="Location" />
                    </div>
                    <div className="form-group">
                        <label>NÚMERO DE TELÉFONO</label>
                        <input type="tel" placeholder="123-456-7890" />
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

import React, { useState } from 'react';
import './FormContact.css';
import { NotificationMessage } from '../../components';
import useFormValidation from './CustomHook/useFormValidation';

const FormContact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isNotificationVisible, setIsNotificationVisible] = useState(false);
    const [errors, validate] = useFormValidation(formData);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setIsNotificationVisible(true);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="form-contact">
                <h3 className="form-contact__title">Leave Message</h3>
                <div className="form-contact__input-group">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Nombre"
                        className="form-contact__input"
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Correo Electrónico"
                        className="form-contact__input"
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Mensaje"
                    className="form-contact__textarea"
                />
                {errors.message && <span className="error">{errors.message}</span>}
                <button type="submit" className="form-contact__button">Enviar Mensaje</button>
            </form>
            {isNotificationVisible && (
                <NotificationMessage 
                    message="Mensaje enviado, pronto nos comunicaremos contigo." 
                    onClose={() => setIsNotificationVisible(false)} 
                />
            )}
        </>
    );
};

export default FormContact;

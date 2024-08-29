import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import './InfoNotification.css';
import apiClient from "../../../axios";
import SuccessProcess from '../SuccessProcess';

const InfoNotification = ({ message, isVisible, onClose, payload }) => {
    const [successVisible, setSuccessVisible] = useState(false);
    const [message2, setMessage2] = useState('');

    const handleConfirm = async () => {
        try {
            const response = await apiClient.post('/clients?restore=true', payload);
            if (response.data.message === 'Client Restored Successfully') {
                setSuccessVisible(true);
                setMessage2('Cliente Restaurado Exisitosamente');
            } else if (response.data.error === 'Bad Request') {
                setSuccessVisible(true);
                setMessage2(response.data.message);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleCloseSuccess = () => {
        setSuccessVisible(false);
        onClose(); // Close the InfoNotification as well
    };

    return (
        isVisible && (
            <div className="info-notification-info-overlay">
                <div className="info-notification-info">
                    <div className="icon-container-noti-info">
                        <FontAwesomeIcon icon={faCircleInfo} className="icon-noti2" />
                    </div>
                    <div className="message-container-info">
                        <h4>Información</h4>
                        <p>{message}</p>
                    </div>
                    <div className="button-container-info">
                        <button className="cancel-btn-info" onClick={onClose}>
                            Cancelar
                        </button>
                        <button className="ok-btn-info" onClick={handleConfirm}>
                            OK
                        </button>
                    </div>
                    <SuccessProcess
                        message={message2}
                        isVisible={successVisible}
                        onClose={handleCloseSuccess}
                    />
                </div>
            </div>
        )
    );
};

export default InfoNotification;

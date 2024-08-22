import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import './SuccessNotification.css';

const SuccessNotification = ({ message, isVisible, onClose }) => {
    return (
        isVisible && (
            <div className="success-notification-success">
                <div className="icon-container-noti-success">
                    <FontAwesomeIcon icon={faCircleCheck} className="icon-noti" />
                </div>
                <div className="message-container-success">
                    <h4 className="title-noti"> Éxito</h4>
                    <p className="info-noti">{message}</p>
                </div>
                <div className="close-container-success" onClick={onClose}>
                    X
                </div>
            </div>
        )
    );
};

export default SuccessNotification;

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import './WarningNotification.css';

const WarningNotification = ({ message, isVisible, onClose }) => {
    return (
        isVisible && (
            <div className="warning-notification">
                <div className="icon-container-noti">
                    <FontAwesomeIcon icon={faCircleExclamation} className="icon-noti" />
                </div>
                <div className="message-container">
                    <h4>Advertencia</h4>
                    <p>{message}</p>
                </div>
                <div className="close-container" onClick={onClose}>
                    X
                </div>
            </div>
        )
    );
};

export default WarningNotification;

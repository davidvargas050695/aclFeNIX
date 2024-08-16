import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import './ErrorNotification.css';

const ErrorNotification = ({ message, isVisible, onClose }) => {
    return (
        isVisible && (
            <div className="error-notification">
                <div className="icon-container-noti">
                    <FontAwesomeIcon icon={faCircleXmark} className="icon-noti" />
                </div>
                <div className="message-container">
                    <h4>Error</h4>
                    <p>{message}</p>
                </div>
                <div className="close-container" onClick={onClose}>
                    X
                </div>
            </div>
        )
    );
};

export default ErrorNotification;

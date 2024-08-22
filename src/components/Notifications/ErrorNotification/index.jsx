import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import './ErrorNotification.css';

const ErrorNotification = ({ message, isVisible, onClose }) => {
    return (
        isVisible && (
            <div className="error-notification">
                <div className="icon-container-noti-error">
                    <FontAwesomeIcon icon={faCircleXmark} className="icon-noti" />
                </div>
                <div className="message-container-error">
                    <h4 className="title-noti">Error</h4>
                    <p className="info-noti">{message}</p>
                </div>
                <div className="close-container-error" onClick={onClose}>
                    X
                </div>
            </div>
        )
    );
};

export default ErrorNotification;

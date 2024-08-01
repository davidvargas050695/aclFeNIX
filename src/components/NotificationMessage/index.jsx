import React from 'react';
import './NotificationMessage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const Notification = ({ message, onClose }) => {
    return (
        <div className="notification">
            <div className="notification__content">
                <FontAwesomeIcon icon={faCheckCircle} size="3x" className="notification__icon" />
                <p>{message}</p>
                <button onClick={onClose} className="notification__button">Close</button>
            </div>
        </div>
    );
};

export default Notification;

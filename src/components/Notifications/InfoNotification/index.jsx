import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import './InfoNotification.css';

const InfoNotification = ({ message, isVisible, onClose }) => {
    return (
        isVisible && (
            <div className="info-notification">
                <div className="icon-container-noti">
                    <FontAwesomeIcon icon={faCircleInfo} className="icon-noti" />
                </div>
                <div className="message-container">
                    <h4>Información</h4>
                    <p>{message}</p>
                </div>
                <div className="close-container" onClick={onClose}>
                    X
                </div>
            </div>
        )
    );
};

export default InfoNotification;

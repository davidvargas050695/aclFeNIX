import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import './WarningNotification.css';

const WarningNotification = ({ message, isVisible, onClose }) => {
    return (
        isVisible && (
            <div className="warning-notification">
                <div className="icon-container-noti-warnning">
                    <FontAwesomeIcon icon={faCircleExclamation} className="icon-noti" />
                </div>
                <div className="message-container-warnning">
                    <h4 className="title-noti">Advertencia</h4>
                    <p className="info-noti">{message}</p>
                </div>
                <div className="close-container-warnning" onClick={onClose}>
                    X
                </div>
            </div>
        )
    );
};

export default WarningNotification;

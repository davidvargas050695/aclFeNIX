import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import './SuccessNotification.css';

const SuccessNotification = ({ message, isVisible, onClose, position }) => {
    const notificationClass = position === 'center' ? 'success-notification-center' : 'success-notification-success';
    const iconContainerClass = position === 'center' ? 'icon-container-noti-center' : 'icon-container-noti-success';
    const messageContainerClass = position === 'center' ? 'message-container-center' : 'message-container-success';
    const closeContainerClass = position === 'center' ? 'close-container-center' : 'close-container-success';

    return (
        isVisible && (
            <div className={notificationClass}>
                <div className={iconContainerClass}>
                    <FontAwesomeIcon icon={faCircleCheck} className="icon-noti" />
                </div>
                <div className={messageContainerClass}>
                    <h4 className="title-noti">Éxito</h4>
                    <p className="info-noti">{message}</p>
                </div>
                <div className={closeContainerClass} onClick={onClose}>
                    X
                </div>
            </div>
        )
    );
};

export default SuccessNotification;

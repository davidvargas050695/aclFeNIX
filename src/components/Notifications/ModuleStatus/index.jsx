import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import apiClient from "../../../axios";
import SuccessProcess from '../SuccessProcess';

const ModalStatus = ({ message, isVisible, onClose, numContId, modulo, activo }) => {
    const [successVisible, setSuccessVisible] = useState(false);
    const [message2, setMessage2] = useState('');
  
    const handleConfirm = async () => {
      const payloadUpdate = {
        activo: !activo,
      };
  
      try {
        await apiClient.patch(`/modules/edit_by_contract/${numContId}/${modulo}`, payloadUpdate);
        setSuccessVisible(true);
        setMessage2(activo ? 'Módulo desactivado exitosamente.' : 'Módulo activado exitosamente.');
      } catch (error) {
        console.error('Error:', error);
        setMessage2('Ocurrió un error al actualizar el módulo.');
      }
    };
  
    const handleCloseSuccess = () => {
      setSuccessVisible(false);
      onClose(); 
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
  
  export default ModalStatus;

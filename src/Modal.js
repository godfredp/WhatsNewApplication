import React from 'react';
// import './Modal.css';
import AnnouncementForm from './AnnouncementForm';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <AnnouncementForm></AnnouncementForm>
        <button className="close-button" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
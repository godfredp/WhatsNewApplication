import React from 'react';
import './Modal.css'; // Import your CSS file for styling
import AnnouncementView from './AnnouncementView';

const WhatsNewModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <AnnouncementView></AnnouncementView>
        <button className="close-button" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default WhatsNewModal;
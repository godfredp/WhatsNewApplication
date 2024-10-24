import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Modal from './Modal';
import WhatsNewModal from './WhatsNewModal';

const App = () => {

  const [isModalOpen, setModalOpen] = useState(false);
  const [isWhatsNewModalOpen, setWhatsNewModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOpenWhatsNewModal = () => {
    setWhatsNewModalOpen(true);
  };

  const handleCloseWhatsNewModal = () => {
    setWhatsNewModalOpen(false);
  };
  return (
    <div className="App">
      <button onClick={handleOpenModal}>Add New Announcement</button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
      </Modal>
      <hr></hr>
      <button onClick={handleOpenWhatsNewModal}>What's New?</button>
      <WhatsNewModal isOpen={isWhatsNewModalOpen} onClose={handleCloseWhatsNewModal}></WhatsNewModal>
    </div>
  );
}

export default App;

import React from 'react';
import { Modal as MuiModal, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AnnouncementForm from './AnnouncementForm';

const Modal = ({ isOpen, onClose }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  return (
    <MuiModal open={isOpen} onClose={onClose} aria-labelledby="modal-title">
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <AnnouncementForm />
      </Box>
    </MuiModal>
  );
};

export default Modal;

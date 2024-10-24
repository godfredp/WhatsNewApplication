import React from 'react';
import { Modal as MuiModal, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AnnouncementView from './AnnouncementView';

const WhatsNewModal = ({ isOpen, onClose }) => {
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
        <AnnouncementView />
      </Box>
    </MuiModal>
  );
  
};

export default WhatsNewModal;

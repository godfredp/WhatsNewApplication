import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Container,
} from '@mui/material';
import AnnouncementDetail from './AnnouncementDetail';

const AnnouncementComponent = () => {
  const [announcement, setAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const response = await fetch('http://localhost:5046/api/v1/features/latest');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAnnouncement(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncement();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" gutterBottom sx={{ textAlign: 'center', color: '#1976d2' }}>
        What's New
      </Typography>
      {announcement ? (
        <AnnouncementDetail data={announcement} />
      ) : (
        <Typography variant="h6" align="center" color="textSecondary">
          No announcement found
        </Typography>
      )}
    </Container>
  );
};

export default AnnouncementComponent;

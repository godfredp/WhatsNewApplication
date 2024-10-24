import React from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { ArcadeEmbed } from './ArcadeEmbed';

const AnnouncementDetail = ({ data }) => {
  return (
    <Paper elevation={3} sx={{ p: 3, my: 2, borderRadius: 2, backgroundColor: '#fafafa' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#1976d2' }}>
        {data.title}
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
        Author: <span style={{ fontWeight: 'normal' }}>{data.author}</span>
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
        Role: <span style={{ fontWeight: 'normal' }}>{data.roleTagName}</span>
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
        Topic: <span style={{ fontWeight: 'normal' }}>{data.topicTagName}</span>
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
        Created Date: <span style={{ fontWeight: 'normal' }}>{new Date(data.createdDate).toLocaleString()}</span>
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h5" gutterBottom sx={{ color: '#1976d2' }}>
        Sub Features
      </Typography>
      <List>
        {data.subFeatures.map((feature) => (
          <ListItem key={feature.id}>
            <ListItemText
              primary={<div dangerouslySetInnerHTML={{ __html: feature.text }} />}
            />
            {feature.videoUrl && <ArcadeEmbed src={feature.videoUrl} />}
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h5" gutterBottom sx={{ color: '#1976d2' }}>
        Feature Guides
      </Typography>
      <List>
        {data.featureGuides.map((guide) => (
          <ListItem key={guide.id}>
            <ListItemText primary={guide.steps} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default AnnouncementDetail;

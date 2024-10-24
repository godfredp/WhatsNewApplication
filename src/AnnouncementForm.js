import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  TextareaAutosize,
  Typography,
  Grid,
  Stack
} from '@mui/material';

const AnnouncementForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    roleTagId: 0,
    topicTagId: 0,
    isMajor: true,
    subFeatures: [],
    featureGuides: []
  });

  const [roles, setRoles] = useState([]);
  const [topicTags, setTopicTags] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch('http://localhost:5046/api/v1/dropdown/role-tags');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setRoles(data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    const fetchTopicTags = async () => {
      try {
        const response = await fetch('http://localhost:5046/api/v1/dropdown/topic-tags');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setTopicTags(data);
      } catch (error) {
        console.error('Error fetching topic tags:', error);
      }
    };

    fetchRoles();
    fetchTopicTags();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle dynamic fields like subFeatures and featureGuides
  const handleDynamicChange = (e, index, type) => {
    const { name, value } = e.target;
    const updatedArray = [...formData[type]];
    updatedArray[index][name] = value;
    setFormData({ ...formData, [type]: updatedArray });
  };

  // Add new subFeature or featureGuide
  const handleAddField = (type) => {
    const newField = type === 'subFeatures' ? { text: '', videoUrl: '' } : { steps: '' };
    setFormData({ ...formData, [type]: [...formData[type], newField] });
  };

  // Remove subFeature or featureGuide
  const handleRemoveField = (index, type) => {
    const updatedArray = formData[type].filter((_, i) => i !== index);
    setFormData({ ...formData, [type]: updatedArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5046/api/v1/features', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to submit form');

      const result = await response.json();
      console.log('Form submitted successfully:', result);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Announcement Form
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Role Tag</InputLabel>
            <Select
              name="roleTagId"
              value={formData.roleTagId}
              onChange={handleChange}
              required
            >
              <MenuItem value=""><em>Select a role</em></MenuItem>
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Topic Tag</InputLabel>
            <Select
              name="topicTagId"
              value={formData.topicTagId}
              onChange={handleChange}
              required
            >
              <MenuItem value=""><em>Select a tag</em></MenuItem>
              {topicTags.map((topicTag) => (
                <MenuItem key={topicTag.id} value={topicTag.id}>
                  {topicTag.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Is Major</InputLabel>
            <Select
              name="isMajor"
              value={formData.isMajor}
              onChange={handleChange}
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom mt={4}>
        Sub Features
      </Typography>
      {formData.subFeatures.map((subFeature, index) => (
        <Grid container spacing={2} key={index}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={`Sub Feature Text ${index + 1}`}
              name="text"
              value={subFeature.text}
              onChange={(e) => handleDynamicChange(e, index, 'subFeatures')}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={`Sub Feature Video URL ${index + 1}`}
              name="videoUrl"
              value={subFeature.videoUrl}
              onChange={(e) => handleDynamicChange(e, index, 'subFeatures')}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="secondary" onClick={() => handleRemoveField(index, 'subFeatures')}>
              Remove Sub Feature
            </Button>
          </Grid>
        </Grid>
      ))}
      <Button variant="outlined" onClick={() => handleAddField('subFeatures')} sx={{ mt: 2 }}>
        Add Sub Feature
      </Button>

      <Typography variant="h6" gutterBottom mt={4}>
        Feature Guides
      </Typography>
      {formData.featureGuides.map((featureGuide, index) => (
        <Grid container spacing={2} key={index}>
          <Grid item xs={12}>
            <TextareaAutosize
              minRows={3}
              placeholder={`Guide Step ${index + 1}`}
              name="steps"
              value={featureGuide.steps}
              onChange={(e) => handleDynamicChange(e, index, 'featureGuides')}
              required
              style={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="secondary" onClick={() => handleRemoveField(index, 'featureGuides')}>
              Remove Guide Step
            </Button>
          </Grid>
        </Grid>
      ))}
      <Button variant="outlined" onClick={() => handleAddField('featureGuides')} sx={{ mt: 2 }}>
        Add Guide Step
      </Button>

      <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => console.log("Form reset logic")}>
          Reset
        </Button>
      </Stack>
    </Box>
  );
};

export default AnnouncementForm;

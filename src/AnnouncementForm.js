import React, { useState, useEffect } from 'react';
// import './AnnouncementForm.css';

const AnnouncementForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    roleTagId: 0,
    topicTagId: 0,
    isMajor: true,
    subFeatures: [
     
    ],
    featureGuides: [
    
    ]
  });

  const [roles, setRoles] = useState([]);
  const [topicTags, setTopicTags] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch('http://localhost:5046/api/v1/dropdown/role-tags');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRoles(data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    const fetchTopicTags = async () => {
      try {
        const response = await fetch('http://localhost:5046/api/v1/dropdown/topic-tags');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
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
    const newField =
      type === 'subFeatures'
        ? { text: '', videoUrl: '' }
        : { steps: '' };
    setFormData({
      ...formData,
      [type]: [...formData[type], newField],
    });
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

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const result = await response.json();
      console.log('Form submitted successfully:', result);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  

  return (
    <form onSubmit={handleSubmit}>
      <h2>Announcement Form</h2>

      <label>
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Role Tag:
        <select
          name="roleTagId"
          value={formData.roleTagId}
          onChange={handleChange}
          required
        >
          <option value="">Select a role</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Topic Tag:
        <select
          name="topicTagId"
          value={formData.topicTagId}
          onChange={handleChange}
          required
        >
          <option value="">Select a tag</option>
          {topicTags.map((topicTag) => (
            <option key={topicTag.id} value={topicTag.id}>
              {topicTag.name}
            </option>
          ))}
        </select>
      </label>


      <label>
        Author:
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Is Major:
        <select
          name="isMajor"
          value={formData.isMajor}
          onChange={handleChange}
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </label>

      <h3>Sub Features</h3>
      {formData.subFeatures.map((subFeature, index) => (
        <div key={index}>
          <label>
            Sub Feature Text {index + 1}:
            <input
              type="text"
              name="text"
              value={subFeature.text}
              onChange={(e) => handleDynamicChange(e, index, 'subFeatures')}
              required
            />
          </label>
          <label>
            Sub Feature Video URL {index + 1}:
            <input
              type="url"
              name="videoUrl"
              value={subFeature.videoUrl}
              onChange={(e) => handleDynamicChange(e, index, 'subFeatures')}
              required
            />
          </label>
          <button type="button" onClick={() => handleRemoveField(index, 'subFeatures')}>
            Remove Sub Feature
          </button>
        </div>
      ))}
      <button type="button" onClick={() => handleAddField('subFeatures')}>
        Add Sub Feature
      </button>

      <h3>Feature Guides</h3>
      {formData.featureGuides.map((featureGuide, index) => (
        <div key={index}>
          <label>
            Guide Step {index + 1}:
            <textarea
              name="steps"
              value={featureGuide.steps}
              onChange={(e) => handleDynamicChange(e, index, 'featureGuides')}
              required
            />
          </label>
          <button type="button" onClick={() => handleRemoveField(index, 'featureGuides')}>
            Remove Guide Step
          </button>
        </div>
      ))}
      <button type="button" onClick={() => handleAddField('featureGuides')}>
        Add Guide Step
      </button>

      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default AnnouncementForm;

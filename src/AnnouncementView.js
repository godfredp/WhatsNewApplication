import React, { useState, useEffect } from 'react';
import { ArcadeEmbed } from './ArcadeEmbed'; 
import './AnnouncementView.css';

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const AnnouncementDetail = ({ data }) => {
    return (
      <div className="announcement-detail">
        <h1>{data.title}</h1>
        <p><strong>Author:</strong> {data.author}</p>
        <p><strong>Role:</strong> {data.roleTagName}</p>
        <p><strong>Topic:</strong> {data.topicTagName}</p>
        <p><strong>Created Date:</strong> {new Date(data.createdDate).toLocaleString()}</p>
        
        <h2>Sub Features</h2>
        <ul>
          {data.subFeatures.map(feature => (
            <li key={feature.id}>
              <p dangerouslySetInnerHTML={{ __html: feature.text }} />
                    {feature.videoUrl && <ArcadeEmbed src={feature.videoUrl} />}
            </li>
          ))}
        </ul>
        
        <h2>Feature Guides</h2>
        <ol>
          {data.featureGuides.map(guide => (
            <li key={guide.id}>{guide.steps}</li>
          ))}
        </ol>
      </div>
    );
  };

  return (
    <div>
      <AnnouncementDetail data={announcement} />
      </div>
  );
};

export default AnnouncementComponent;
import React from 'react';

export function ArcadeEmbed({ src }) {
  return (
    <div
      style={{
        position: 'relative',
        paddingBottom: 'calc(68.74272409778813% + 41px)',
        height: 0,
        width: '50%',
      }}
    >
      <iframe
         src={src}
        title="Hackathon - What's New?"
        frameBorder="0"
        loading="lazy"
        allowFullScreen
        allow="clipboard-write"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          colorScheme: 'light',
        }}
        onError={(e) => console.error('Error loading iframe:', e)}
      />
    </div>
  );
}

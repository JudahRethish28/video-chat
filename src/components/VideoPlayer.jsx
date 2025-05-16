import React from 'react';

const VideoPlayer = ({ videoUrl, loading }) => {
  return (
    <div className="w-full aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center relative">
      {loading ? (
        <div className="animate-pulse text-gray-400">Loading video...</div>
      ) : videoUrl ? (
        <iframe
          className="w-full h-full rounded-lg"
          src={videoUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <div className="text-gray-400">No video selected</div>
      )}
    </div>
  );
};

export default VideoPlayer;

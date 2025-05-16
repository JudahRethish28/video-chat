import React from 'react';

const videos = [
  {
    id: 'dQw4w9WgXcQ',
    title: 'Rick Astley - Never Gonna Give You Up',
  },
  {
    id: '3JZ_D3ELwOQ',
    title: 'Mark Ronson - Uptown Funk ft. Bruno Mars',
  },
  {
    id: '9bZkp7q19f0',
    title: 'PSY - GANGNAM STYLE',
  },
];

const VideoSelector = ({ selectedId, onSelect }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select a video:</label>
    <select
      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
      value={selectedId}
      onChange={e => onSelect(e.target.value)}
    >
      {videos.map(v => (
        <option key={v.id} value={v.id}>{v.title}</option>
      ))}
    </select>
  </div>
);

export default VideoSelector;

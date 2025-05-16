import React, { useState, useEffect } from 'react';
import VideoPlayer from './VideoPlayer';
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';
import Placeholder from './Placeholder';
import VideoSelector from './VideoSelector';

// Dummy data for demonstration
const dummyMessages = [
  { id: 1, role: 'user', content: 'What is this video about?' },
  { id: 2, role: 'ai', content: 'This video explains the basics of React.' },
];
const dummyVideos = [
  {
    id: 'dQw4w9WgXcQ',
    title: 'Rick Astley - Never Gonna Give You Up',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: '3JZ_D3ELwOQ',
    title: 'Mark Ronson - Uptown Funk ft. Bruno Mars',
    url: 'https://www.youtube.com/embed/3JZ_D3ELwOQ',
  },
  {
    id: '9bZkp7q19f0',
    title: 'PSY - GANGNAM STYLE',
    url: 'https://www.youtube.com/embed/9bZkp7q19f0',
  },
];

// Dark mode toggle button
function DarkModeToggle() {
  const [dark, setDark] = useState(() => {
    // Check localStorage first, then system preference
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') return true;
    if (stored === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return (
    <button
      className="absolute top-4 right-4 z-10 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-3 py-1 rounded-lg shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      onClick={() => setDark((d) => !d)}
      aria-label="Toggle dark mode"
      type="button"
    >
      {dark ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}

const Layout = ({ children }) => {
  const [messages, setMessages] = useState(dummyMessages);
  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(dummyVideos[0].id);
  const [videoLoaded, setVideoLoaded] = useState(true); // Set to false to simulate loading
  const [customUrl, setCustomUrl] = useState('');
  const [customVideoId, setCustomVideoId] = useState('');
  const [customMode, setCustomMode] = useState(false);

  // Extract YouTube video ID from URL
  function extractYouTubeId(url) {
    const match = url.match(/(?:v=|youtu.be\/|embed\/)([\w-]{11})/);
    return match ? match[1] : '';
  }

  const handleCustomUrlSubmit = (e) => {
    e.preventDefault();
    const vid = extractYouTubeId(customUrl);
    if (vid) {
      setCustomVideoId(vid);
      setCustomMode(true);
      setVideoLoaded(true); // Simulate loaded, set false if you want loading
      setMessages([]); // Clear chat for new video
    } else {
      setCustomVideoId('');
      setCustomMode(false);
      setVideoLoaded(false);
    }
  };

  const handleSend = (msg) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), role: 'user', content: msg },
      // Simulate AI response
      { id: Date.now() + 1, role: 'ai', content: customMode ? 'Transcript/AI not available for custom videos in demo.' : 'This is a dummy AI response.' },
    ]);
  };

  const currentVideo = dummyVideos.find(v => v.id === selectedVideo);
  const showCustom = customMode && customVideoId;
  const videoUrl = showCustom ? `https://www.youtube.com/embed/${customVideoId}` : currentVideo.url;

  return (
    <div className="min-h-screen transition-colors duration-300 relative">
      <DarkModeToggle />
      <header className="absolute top-4 left-4 z-10">
        <a
          href="/"
          onClick={e => {
            e.preventDefault();
            // Save theme state in localStorage (already handled by toggle)
            window.location.href = '/';
          }}
          style={{ textDecoration: 'none' }}
        >
          <h1 className="header-title">Chat with your video!</h1>
        </a>
      </header>
      <main className="pt-header">
        <div className="main-content max-w-5xl mx-auto p-4 flex flex-col gap-6">
          <div className="w-full flex-shrink-0 flex flex-col items-center">
            <form onSubmit={handleCustomUrlSubmit} className="mb-2 flex gap-2 w-full max-w-2xl">
              <input
                type="text"
                className="input-url"
                placeholder="Paste a YouTube video link..."
                value={customUrl}
                onChange={e => setCustomUrl(e.target.value)}
              />
              <button
                type="submit"
                className="load-btn"
              >
                Load
              </button>
            </form>
            {!showCustom && (
              <div className="w-full max-w-2xl"><VideoSelector selectedId={selectedVideo} onSelect={id => { setSelectedVideo(id); setCustomMode(false); setMessages(dummyMessages); }} /></div>
            )}
            <div className="w-full max-w-xl">
              {videoLoaded ? (
                <VideoPlayer videoUrl={videoUrl} loading={false} />
              ) : (
                <Placeholder text="Loading video and transcript..." />
              )}
            </div>
          </div>
          <div className="w-full flex flex-col items-center">
            <div className="chat-section">
              <ChatWindow messages={messages} loading={loading} className="chat-window-short" />
              <ChatInput onSend={handleSend} disabled={loading} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;

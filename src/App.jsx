import React, { useState } from 'react';
import Layout from './components/Layout';
import VideoPlayer from './components/VideoPlayer';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import Placeholder from './components/Placeholder';
import VideoSelector from './components/VideoSelector';

const DUMMY_MESSAGES = [
  { id: 1, role: 'user', content: 'What is this video about?' },
  { id: 2, role: 'ai', content: 'This is a music video for the song "Never Gonna Give You Up" by Rick Astley.' },
];

const VIDEO_BASE_URL = 'https://www.youtube.com/embed/';

const App = () => {
  const [selectedVideo, setSelectedVideo] = useState('dQw4w9WgXcQ');
  const [messages, setMessages] = useState(DUMMY_MESSAGES);
  const [loading, setLoading] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(true);

  const handleSend = (msg) => {
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', content: msg }]);
    setLoading(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'ai', content: 'This is a dummy AI response.' }]);
      setLoading(false);
    }, 1200);
  };

  const handleVideoSelect = (id) => {
    setSelectedVideo(id);
    setVideoLoaded(false);
    setTimeout(() => setVideoLoaded(true), 800); // Simulate loading
    setMessages(DUMMY_MESSAGES);
  };

  return (
    <Layout>
      <div className="flex-1 flex flex-col gap-4 md:max-w-lg">
        <VideoSelector selectedId={selectedVideo} onSelect={handleVideoSelect} />
        {videoLoaded ? (
          <VideoPlayer videoUrl={VIDEO_BASE_URL + selectedVideo} loading={false} />
        ) : (
          <Placeholder text="Loading video and transcript..." />
        )}
      </div>
      <div className="flex-1 flex flex-col">
        <ChatWindow messages={messages} loading={loading} />
        <ChatInput onSend={handleSend} disabled={loading || !videoLoaded} />
      </div>
    </Layout>
  );
};

export default App;

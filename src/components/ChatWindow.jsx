import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatWindow = ({ messages, loading }) => {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="chat-window-container chat-window-short">
      <AnimatePresence initial={false}>
        {messages.map((msg, idx) => (
          <motion.div
            key={msg.id || idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className={`flex mb-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={msg.role === 'user' ? 'user-message' : 'ai-message'}>
              {msg.content}
            </div>
          </motion.div>
        ))}
        {loading && (
          <motion.div
            key="typing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex mb-2 justify-start"
          >
            <div className="typing-indicator">
              <span className="animate-bounce">• • •</span>
              <span className="sr-only">AI is typing...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div ref={chatEndRef} />
    </div>
  );
};

export default ChatWindow;

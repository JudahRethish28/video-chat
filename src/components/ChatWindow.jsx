import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatWindow = ({ messages, loading }) => {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow p-4 h-96 md:h-[32rem] overflow-y-auto">
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
            <div
              className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg text-sm shadow-md whitespace-pre-line ${
                msg.role === 'user'
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none'
              }`}
            >
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
            <div className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg text-sm shadow-md rounded-bl-none flex items-center gap-2">
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

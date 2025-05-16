import React, { useState } from 'react';

const ChatInput = ({ onSend, disabled }) => {
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSend} className="flex gap-2 mt-4">
      <input
        type="text"
        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Ask about the video..."
        value={input}
        onChange={e => setInput(e.target.value)}
        disabled={disabled}
        autoFocus
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50"
        disabled={disabled || !input.trim()}
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;

import React, { useState } from "react";

const ChatInput = ({ onSend, disabled }) => {
  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSend} className="chat-input-form">
      <input
        type="text"
        className="chat-input-box"
        placeholder="Ask about the video..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={disabled}
        autoFocus
      />
      <button
        type="submit"
        className="send-btn"
        disabled={disabled || !input.trim()}
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;

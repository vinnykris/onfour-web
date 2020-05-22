// React imports
import React from "react";

// Module imports
import ScrollToBottom from "react-scroll-to-bottom";

// Component imports
import Message from "./message";

// Styles imports
import "./chat.scss";

// Component that takes list of messages and maps each to Message
const Messages = ({ messages, name }) => (
  <ScrollToBottom className="messages">
    {messages.map((message, i) => (
      <div key={i}>
        <Message message={message} name={name} />
      </div>
    ))}
  </ScrollToBottom>
);

export default Messages;

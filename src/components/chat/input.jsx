// React imports
import React from "react";

// Component imports
import ChatTooltip from "./chat_tooltip";

// Styles imports
import "./chat.scss";

// AWS imports
import Amplify, { Analytics } from "aws-amplify";

// Component for input field for chat
const Input = ({ message, setMessage, sendMessage, name }) => {
  return (
    <form className="form">
      <input
        className="input"
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyPress={(event) =>
          event.key === "Enter" ? sendMessage(event) : null
        }
      />
      <ChatTooltip title="Please login through the navigation bar.">
        <button className="send-button" onClick={(event) => sendMessage(event)}>
          <i class="fa fa-send"></i>
        </button>
      </ChatTooltip>
    </form>
  );
};

export default Input;

import React from "react";
import "./chat.scss";

const Input = ({ message, setMessage, sendMessage }) => (
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
    <button className="send-button" onClick={(event) => sendMessage(event)}>
      <i class="fa fa-send"></i>
    </button>
  </form>
);

export default Input;

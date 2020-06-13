// React imports
import React, { useState } from "react";

// Component imports
import ChatTooltip from "./chat_tooltip";

// Styles imports
import "./chat.scss";

// AWS imports
import Amplify, { Analytics } from "aws-amplify";
import Auth from "../../apis/UserPool";

// Component for input field for chat
const Input = ({ message, setMessage, sendMessage, name }) => {
  const [auth, setAuth] = useState("");

  Auth.currentAuthenticatedUser({})
    .then((user) => {
      setAuth(true);
    })
    .catch((err) => setAuth(false));

  return (
    <div>
      {auth ? (
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
          {/* <ChatTooltip title="Please login through the navigation bar."> */}
          <button
            className="send-button"
            onClick={(event) => sendMessage(event)}
          >
            <i class="fa fa-send"></i>
          </button>
          {/* </ChatTooltip> */}
        </form>
      ) : (
        <form className="form">
          <input
            className="input"
            type="text"
            placeholder="Please sign in to send messages!"
            disabled
          />
          <button
            className="send-button"
            disabled={!message}
            onClick={(event) => sendMessage(event)}
          >
            <i class="fa fa-send"></i>
          </button>
        </form>
      )}
    </div>
  );
};

export default Input;

// React imports
import React, { useEffect, useState } from "react";

// Component imports
import ChatTooltip from "./chat_tooltip";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

// Picker import
import { Picker } from "emoji-mart";

// Styles imports
import "./chat.scss";

// AWS imports
import Auth from "../../apis/UserPool";

// Component for input field for chat
const Input = ({ message, setMessage, sendMessage, name }) => {
  const [emojiPickerVisibility, setEmojiPickerVisibility] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [auth, setAuth] = useState("");

  Auth.currentAuthenticatedUser({})
    .then((user) => {
      setAuth(true);
    })
    .catch((err) => setAuth(false));

  //set picker visibility to false on click outside the picker
  const handleEmojiPickerClose = () => {
    setEmojiPickerVisibility(false);
  };

  //activates on emoji click within picker
  //changes selectedEmoji useState
  const onEmojiClick = (emojiObject) => {
    setSelectedEmoji(emojiObject.native);
  };

  //listens for selectedEmoji useState change
  //appends emoji to message
  useEffect(() => {
    if (selectedEmoji != "") {
      setMessage({ message }.message + selectedEmoji);
      setSelectedEmoji("");
    }
  }, [selectedEmoji]);

  return (
    <div className="input-container">
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

          {/* visibility toggler */}
          <div
            className="emoji-button"
            onClick={(event) =>
              setEmojiPickerVisibility(!emojiPickerVisibility)
            }
          >
            <i class="fa fa-smile-o" aria-hidden="true"></i>
          </div>

          {/* picker element */}
          {emojiPickerVisibility && (
            <ClickAwayListener onClickAway={handleEmojiPickerClose}>
              <div>
                <Picker
                  onSelect={onEmojiClick}
                  theme="dark"
                  set="twitter"
                  sheetSize="64"
                />
              </div>
            </ClickAwayListener>
          )}

          <button
            className="send-button"
            onClick={(event) => sendMessage(event)}
          >
            <i className="fa fa-send"></i>
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
            <i className="fa fa-send"></i>
          </button>
        </form>
      )}
    </div>
  );
};

export default Input;

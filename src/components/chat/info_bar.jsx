// React imports
import React, { useState } from "react";

// Component imports
import ChatTooltip from "./chat_tooltip";

// Module imports
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

// Custom hooks
import { useWindowDimensions } from "../custom_hooks";

// Styles imports
import "./chat.scss";

// Information bar at the top of the chat
const InfoBar = ({ room, users }) => {
  const [open, setOpen] = React.useState(false); // Manages if tooltip is open/cloesd
  const [participants_string, setParticipantsString] = useState(""); // String (with newlines) of participant names

  const { height, width } = useWindowDimensions(); // Dimensions of screen

  var users_in_chat = []; // List of usernames in the chat

  // Called when user clicks away from the tooltip
  const handleTooltipClose = () => {
    setOpen(false);
  };

  // Opens the tooltip listing the people in the chat
  const handleTooltipOpen = () => {
    users_in_chat = users.map((user) => user.name);
    setParticipantsString(users_in_chat.join("\n"));
    setOpen(true);
  };

  return (
    <div className="info-bar">
      <div className="info-container">
        <div className="chat-header-text">
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <div className="chat-header">
              <ChatTooltip
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={open}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title={participants_string}
              >
                <span onClick={handleTooltipOpen}>
                  <p className="header-7">{room}</p>
                </span>
              </ChatTooltip>
            </div>
          </ClickAwayListener>
        </div>
      </div>
    </div>
  );
};

export default InfoBar;

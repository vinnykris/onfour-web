// React imports
import React, { useState, useEffect } from "react";

// Component imports
import ChatTooltip from "./chat_tooltip";

// Module imports
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

// Styles imports
import "./chat.scss";

// Information bar at the top of the chat
const InfoBar = ({ room, users }) => {
  const [open, setOpen] = React.useState(false);
  const [participants, setParticipants] = useState([]);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    // console.log(users.map((user) => user.name));
    console.log(users[0].name);
    setOpen(true);
  };

  useEffect(() => {
    for (var i = 0; i < users.length; i++) {
      setParticipants(...participants, users[i].name);
    }
  }, []);
  return (
    <div className="info-bar">
      <div className="info-container">
        <div className="chat-header-text">
          <p className="onfour-title">{room}</p>
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <ChatTooltip
              PopperProps={{
                disablePortal: true,
              }}
              onClose={handleTooltipClose}
              open={open}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              title={participants}
            >
              <span onClick={handleTooltipOpen}>
                <p className="onfour-title">{users.length}</p>
              </span>
            </ChatTooltip>
          </ClickAwayListener>

          {/* <p className="onfour-title">{users.length}</p> */}
        </div>
      </div>
    </div>
  );
};

export default InfoBar;

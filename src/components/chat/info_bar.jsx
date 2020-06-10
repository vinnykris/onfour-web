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
  const [participants_string, setParticipantsString] = useState("");

  var users_in_chat = [];

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    // console.log(users.map((user) => user.name));
    console.log(users);
    // console.log(participants);
    users_in_chat = users.map((user) => user.name);
    console.log(users_in_chat);
    setParticipants(users_in_chat);
    setParticipantsString(users_in_chat.join("\n"));

    // for (var i = 0; i < users.length; i++) {
    //   console.log(users[i].name);
    //   console.log(participants);
    //   setParticipants((participants) => [...participants, users[i].name]);
    //   // participants.push(users[i].name);
    // }
    setOpen(true);
  };
  useEffect(() => {
    console.log(participants_string);
  }, [participants_string]);
  return (
    <div className="info-bar">
      <div className="info-container">
        <div className="chat-header-text">
          <p className="onfour-title">{room}</p>
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <div>
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
                  <p className="onfour-title">{users.length}</p>
                </span>
              </ChatTooltip>
            </div>
          </ClickAwayListener>

          {/* <p className="onfour-title">{users.length}</p> */}
        </div>
      </div>
    </div>
  );
};

export default InfoBar;

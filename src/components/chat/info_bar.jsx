// React imports
import React from "react";

// Styles imports
import "./chat.scss";

// Information bar at the top of the chat
const InfoBar = ({ room, users }) => {
  return (
    <div className="info-bar">
      <div className="info-container">
        <div className="chat-header-text">
          <p className="onfour-title">{room}</p>
          <p className="onfour-title">{users.length}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoBar;

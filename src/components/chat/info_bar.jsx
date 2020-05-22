// React imports
import React from "react";

// Styles imports
import "./chat.scss";

// Information bar at the top of the chat
const InfoBar = ({ room, users }) => {
  return (
    <div className="info-bar">
      <div className="left-inner-container">
        <p className="onfour-title">{room}</p>
        <p className="onfour-title">{users.length}</p>
      </div>
    </div>
  );
};

export default InfoBar;

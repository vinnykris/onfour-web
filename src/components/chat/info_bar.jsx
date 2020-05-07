import React from "react";
import "./chat.scss";

const InfoBar = ({ room, users }) => {
  return (
    <div className="info-bar">
      <div className="left-inner-container">
        <p className="onfourtitle">{room}</p>
        <p className="onfourtitle">({users.length})</p>
      </div>
    </div>
  );
};

export default InfoBar;

import React from "react";
import "./chat.scss";
import closeIcon from "../../images/closeIcon.png";
import onlineIcon from "../../images/onlineIcon.png";

const InfoBar = ({ room, users }) => {
  return (
    <div className="info-bar">
      <div className="left-inner-container">
        <img className="online-icon" src={onlineIcon} alt="online" />
        <h3>{room}</h3>
        <h3>({users.length})</h3>
      </div>
    </div>
  );
};

export default InfoBar;

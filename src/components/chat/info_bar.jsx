import React from "react";
import "./chat.scss";
import closeIcon from "../../images/closeIcon.png";
import onlineIcon from "../../images/onlineIcon.png";

const InfoBar = ({ room, users }) => {
  return (
    <div className="info-bar">
      <div className="left-inner-container">
        <img className="online-icon" src={onlineIcon} alt="online" />
        <h4>{room}</h4>
        <h4>({users.length})</h4>
      </div>
    </div>
  );
};

export default InfoBar;

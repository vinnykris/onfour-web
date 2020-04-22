import React from "react";
import "./chat.scss";
import closeIcon from "../../images/closeIcon.png";
import onlineIcon from "../../images/onlineIcon.png";

const InfoBar = ({ room, users }) => {
  return (
    <div className="info-bar">
      <div className="left-inner-container">
        <img className="online-icon" src={onlineIcon} alt="online" />
        <h5>{room}</h5>
        <h5>({users.length})</h5>
      </div>
    </div>
  );
};

export default InfoBar;

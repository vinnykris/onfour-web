import React from "react";
import "./chat.scss";
import closeIcon from "../../images/close_icon.png";
import onlineIcon from "../../images/online_icon.png";

const InfoBar = ({ room, users }) => {
  return (
    <div className="info-bar">
      <div className="left-inner-container">
        {/* <img className="online-icon" src={onlineIcon} alt="online" /> */}
        <p className="onfourtitle">{room}</p>
        <p className="onfourtitle">({users.length})</p>
      </div>
    </div>
  );
};

export default InfoBar;

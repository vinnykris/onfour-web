import React from "react";
import "./chat.scss";
import closeIcon from "../../images/closeIcon.png";
import onlineIcon from "../../images/onlineIcon.png";

const InfoBar = ({ room }) => {
  return (
    <div className="info-bar">
      <div className="left-inner-container">
        <img className="online-icon" src={onlineIcon} alt="online" />
        <h5>{room}</h5>
      </div>
      {/* <div className="right-inner-container">
        <img src={closeIcon} alt="close"></img>
      </div> */}
    </div>
  );
};

export default InfoBar;

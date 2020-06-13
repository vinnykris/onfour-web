// React imports
import React from "react";

// Module imports
import ReactEmoji from "react-emoji";

// Styles imports
import "./chat.scss";
import { useReducer } from "react";

// Component that styles the message according to the sender
const Message = ({ message: { user, text }, name }) => {
  let is_sent_by_current_user = false; // Boolean checking if sender iscurrent user
  let is_admin = false; // Boolean checking if sender is admin
  let is_staff = false; // Boolean checking if sender is staff
  const trimmed_name = name.trim().toLowerCase();

  const staff = [
    "onfour-staff",
    "onfour-vinod",
    "onfour-bar",
    "onfour-lily",
    "onfour-yuxin",
  ];

  // Setting booleans based on user
  if (user === trimmed_name) {
    is_sent_by_current_user = true;
  }

  if (user === "admin") {
    is_admin = true;
  }

  if (staff.find(user)) {
    is_staff = true;
  }

  return is_sent_by_current_user ? (
    <div className="message-container justify-end">
      <p className="sent-text pr-10">{trimmed_name} </p>
      <div className="message-box background-dark">
        <p className="message-text color-white">{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  ) : is_admin ? (
    <div className="message-container justify-middle">
      <div className="message-box-admin background-white">
        <p className="sent-text">{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  ) : is_staff ? (
    <div className="message-container justify-start">
      <div className="message-box background-staff">
        <p className="message-text color-white">{ReactEmoji.emojify(text)}</p>
      </div>
      <p className="sent-text pl-10">{user} </p>
    </div>
  ) : (
    <div className="message-container justify-start">
      <div className="message-box background-light">
        <p className="message-text color-dark">{ReactEmoji.emojify(text)}</p>
      </div>
      <p className="sent-text pl-10">{user} </p>
    </div>
  );
};

export default Message;

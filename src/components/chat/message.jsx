// React imports
import React from "react";

// Module imports
import ReactEmoji from "react-emoji";
import Linkify from 'react-linkify';
import * as linkify from 'linkifyjs';
import hashtag from 'linkifyjs/plugins/hashtag';

// Styles imports
import "./chat.scss";
import { useReducer } from "react";
import ReactLinkify from "react-linkify";


hashtag(linkify);
    
  
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
    "onfour-spencer",
  ];

  // Setting booleans based on user
  if (user === trimmed_name) {
    is_sent_by_current_user = true;
  }

  if (user === "admin") {
    is_admin = true;
  }

  if (staff.indexOf(user) > -1) {
    is_staff = true;
  }
  // var linkifyOptions = 
  //   {
  //       formatHref: function (href, type) {
  //         if (type === 'hashtag') {
  //           href = 'https://twitter.com/hashtag/' + href.substring(1);
  //         }
  //         return href;
  //       }
        
  //     };

      
  return is_sent_by_current_user ? (
    
    <div className="message-container justify-end">
      <p className="sent-text pr-10">{trimmed_name} </p>
      <div className="message-box background-dark">
        {/* <Linkify Options={linkifyOptions}> */}
        <Linkify>
        <p  className="message-text color-white">{ReactEmoji.emojify(text)}</p>
        </Linkify>
        
      </div>
    </div>
  ) : is_admin ? (
    <div className="message-container justify-middle">
      <div className="message-box-admin background-white">
      <Linkify>
        <p className="sent-text">{ReactEmoji.emojify(text)}</p>
        </Linkify>
      </div>
    </div>
  ) : is_staff ? (
    <div className="message-container justify-start">
      <div className="message-box background-staff">
      <Linkify>
        <p className="message-text color-white">{ReactEmoji.emojify(text)}</p>
        </Linkify>
      </div>
      <p className="sent-text pl-10">{user} </p>
    </div>
  ) : (
    <div className="message-container justify-start">
      <div className="message-box background-light">
      <Linkify>
        <p className="message-text color-dark">{ReactEmoji.emojify(text)}</p>
        </Linkify>
      </div>
      <p className="sent-text pl-10">{user} </p>
    </div>
  );
};

export default Message;

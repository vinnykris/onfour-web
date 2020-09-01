// React imports
import React from "react";

// Module imports
import ReactEmoji from "react-emoji";
import Linkify from "react-linkify";
import * as linkify from "linkifyjs";
import hashtag from "linkifyjs/plugins/hashtag";
// import { useReducer } from "react";
// import ReactLinkify from "react-linkify";

// Styles imports
import "./chat.scss";

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

  const color_id = (user.length + user.charCodeAt(0)) % 5;

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
    <div className="message-container justify-start">
      <h5 className={"body-2 sent-text pr-10" + " username-color-" + color_id}>{trimmed_name + ":"} </h5>
      <div className="message-box">
        {/* <Linkify Options={linkifyOptions}> */}
        <Linkify>
          <p className="body-2 chat-message-text">
            {ReactEmoji.emojify(text)}
          </p>
        </Linkify>
      </div>
    </div>
  ) : is_admin ? (
    <div className="message-container justify-middle">
      <div className="message-box-admin">
        <Linkify>
          <p className="body-2 sent-text">{ReactEmoji.emojify(text)}</p>
        </Linkify>
      </div>
    </div>
  ) : is_staff ? (
    <div className="message-container justify-start">
      <h5 className={"body-2 sent-text pr-10" + " username-color-" + color_id}>{user + ":"} </h5>
      <div className="message-box">
        <Linkify>
          <p className="body-2 chat-message-text">
            {ReactEmoji.emojify(text)}
          </p>
        </Linkify>
      </div>
    </div>
  ) : (
    <div className="message-container justify-start">
      <h5 className={"body-2 sent-text pr-10" + " username-color-" + color_id}>{user + ":"} </h5>
      <div className="message-box">
        <Linkify>
          <p className="body-2 chat-message-text">
            {ReactEmoji.emojify(text)}
          </p>
        </Linkify>
      </div>
    </div>
  );
};

export default Message;

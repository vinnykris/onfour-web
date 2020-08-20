// React imports
import React, {useState, useEffect} from "react";

// Module imports
import ReactEmoji from "react-emoji";
import io from "socket.io-client";
import Linkify from 'react-linkify';
import * as linkify from 'linkifyjs';
import hashtag from 'linkifyjs/plugins/hashtag';
// import { useReducer } from "react";
// import ReactLinkify from "react-linkify";

// Styles imports
import "./chat.scss";

// let socket; // Socket declaration

hashtag(linkify);
    
// Component that styles the message according to the sender
const Message = ({ message: { user, text, timeStamp, likes }, name, socket }) => {
  let is_sent_by_current_user = false; // Boolean checking if sender iscurrent user
  let is_admin = false; // Boolean checking if sender is admin
  let is_staff = false; // Boolean checking if sender is staff
  const trimmed_name = name.trim().toLowerCase();

  const [clock, setClock] = useState(0);
  const [pastClock, setPastClock] = useState(0);

  const [isLiked, setIsLiked] = useState(false); //store if the post is liked by the current user or not
  const [likeCooldown, setLikeCooldown] = useState(0);

  useEffect(()=>{
    let now = new Date().valueOf();
    setClock(now);
    let msdiff = now - pastClock;

    if(msdiff < 500 && now > likeCooldown){
      let socketId = socket.id; //get socketId of user who sent the message
      setLikeCooldown((new Date()).valueOf() + 1000); //make sure user doesn't like message again within 1 second
      if(!isLiked){ //activate when comment is unliked
        socket.emit("likeMessage", ({user, text, timeStamp, socketId}), (error)=>{ //emit like
          if(error) console.log(error);
        });
        setIsLiked(true);
      }
      else { //activate when comment is already liked by yser
        socket.emit("unlikeMessage", ({user, text, timeStamp, socketId}), (error)=>{ //emit unlike
          if(error) console.log(error);
        });
        setIsLiked(false);
      }
    }

  }, [pastClock]);

  useEffect(()=>{
    console.log(isLiked + text);
  }, [isLiked]);

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
  //setPastClock change is the trigger for liking a message^^

  return is_sent_by_current_user ? (
    <div className="message-container justify-end" onClick={() => setPastClock(clock)}>
      <p className="sent-text pr-10">{trimmed_name} </p>
      <div className="message-box background-dark">
        {/* <Linkify Options={linkifyOptions}> */}
        <Linkify>
        <p  className="message-text color-white">{ReactEmoji.emojify(text)}</p>
        </Linkify>
        
      </div>
      <div className="user-sent-likebox">{likes>0 && ReactEmoji.emojify("<3" + likes)}</div>
    </div>
  ) : is_admin ? (
    <div className="message-container justify-middle" onClick={() => setPastClock(clock)}>
      <div className="message-box-admin background-white">
      <Linkify>
        <p className="sent-text">{ReactEmoji.emojify(text)}</p>
        </Linkify>
      </div>
    </div>
  ) : is_staff ? (
    <div className="message-container justify-start" onClick={() => setPastClock(clock)}>
      <div className="message-box background-staff">
      <Linkify>
        <p className="message-text color-white">{ReactEmoji.emojify(text)}</p>
        </Linkify>
      </div>
      <p className="sent-text pl-10">{user} </p>
      <div className="user-sent-likebox">{likes>0 && ReactEmoji.emojify("<3" + likes)}</div>
    </div>
  ) : (
    <div className="message-container justify-start" onClick={() => setPastClock(clock)}>
      <div className="message-box background-light">
      <Linkify>
        <p className="message-text color-dark">{ReactEmoji.emojify(text)}</p>
        </Linkify>
      </div>
      <p className="sent-text pl-10">{user} </p>
      <div className="user-sent-likebox">{likes>0 && ReactEmoji.emojify("<3" + likes)}</div>
    </div>
  );
};

export default Message;

// React imports
import React, {useEffect, useState} from "react";

// Module imports
import ScrollToBottom from "react-scroll-to-bottom";

// Component imports
import Message from "./message";

// Styles imports
import "./chat.scss";

// Component that takes list of messages and maps each to Message
const Messages = ({ messages, name, socket, likedUser, likedUserText }) => {

  useEffect(() => {

  });

  // {messages.map((message, i) => (
  //   <div key={i}>
  //     <Message message={message} name={name} socket={socket}/>
  //   </div>
  // ))}

  return (
    <ScrollToBottom className="messages">

        {messages.map(function(message, i){

          return (
            <div key={i}>
              <Message message={message} name={name} socket={socket}/>
            </div>
          );
        })}
    </ScrollToBottom>
  )
};

export default Messages;

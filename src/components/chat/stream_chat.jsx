// React imports
import React, { useState, useEffect, useRef } from "react";

// Module imports
import io from "socket.io-client";

// Component imports
import InfoBar from "./info_bar";
import Input from "./input";
import Message from "./message";

import ScrollToBottom from "react-scroll-to-bottom";
// AWS imports
import Amplify, { Analytics } from "aws-amplify";

// Styles imports
import "./chat.scss";

let socket; // Socket declaration


// Main chat component
const Chat = ({ chat_name, chatStatus, setViewers}) => {
  const [name, setName] = useState(chat_name); // User's chat name
  const [room, setRoom] = useState("CHAT"); // Title of chat and room all users are in
  const [users, setUsers] = useState(""); // List of users in chat room
  const [message, setMessage] = useState(""); // Holds inputted message
  const [messages, setMessages] = useState([]); // Holds list of messages
  const [error, setError] = useState("");
  // const ENDPOINT = "https://onfour-chat.herokuapp.com/"; // Chat server endpoint

  const ENDPOINT = "https://onfour-chat-tester.herokuapp.com/"; //test endpoint

  // Function that is called when user leaves chat
  const closeChat = () => {
    chatStatus(false);
    socket.disconnect();
  };

  // Function called on mount
  useEffect(() => {
    socket = io(ENDPOINT); // Connect socket to server

    setName(name);
    setRoom(room);

    // Emit event when user joins chat room
    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
        closeChat();
      }
    });
  }, [ENDPOINT, name, room]);

  // Socket set to listen for messages and new users
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
      setViewers(users.length);
    });
    socket.on("like", (data) => {

      let msg = {
        user: data.user,
        text: data.text,
        timeStamp: data.timeStamp,
        likes: data.likes,
        likeSocketId: data.socketId
      };

      setLikedMsg(msg); ///trigger useEffect for likedmsg
    });
    socket.on("unlike", (data) => {
      let msg = {
        user: data.user,
        text: data.text,
        timeStamp: data.timeStamp,
        likes: data.likes,
        likeSocketId: data.socketId
      };

      setUnlikedMsg(msg); //trigger useEffect for unlikedmsg

    });
  }, []);

  const [unlikedMsg, setUnlikedMsg] = useState();
  const [likedMsg, setLikedMsg] = useState();

  const [random, setRandom] = useState(Math.random()); //sometimes on like, messages don't rerender. Changing this state forces rerender
  const reRender = () => setRandom(Math.random());

  useEffect(()=>{
    let msgList = messages;
    msgList.forEach(msg=>{ //find message in list of messages shown on client
      if(likedMsg.user == msg.user && likedMsg.text == msg.text && likedMsg.timeStamp == msg.timeStamp){
        msg.likes++;
        reRender();
      }
    });
  }, [likedMsg]);

  useEffect(()=>{
    let msgList = messages;
    msgList.forEach(msg=>{ //find message in list of messages shown on client
      if(unlikedMsg.user == msg.user && unlikedMsg.text == msg.text && unlikedMsg.timeStamp == msg.timeStamp){
        msg.likes--;
        reRender();
      }
    });
  }, [unlikedMsg]);

  // Hook is run when error is updated
  useEffect(() => {
    if (error) {
      const is_confirmed = window.confirm(error);
      if (is_confirmed) {
        window.location.reload();
      }
    }
  }, [error]);

  // Called when user sends a message
  const sendMessage = (event) => {
    event.preventDefault();
    if (name === "GUEST") {
      alert(
        "You cannot send messages as a guest. Please log in to send messages!"
      );
    } else {
      if (message) {
        if (message.length > 140) {
          alert("Message cannot be longer than 140 characters.");
        } else {
          Analytics.record({ name: "chatButtonPressed" }); // this record the chat button press
          socket.emit("sendMessage", message, (error) => {
            // Error checking if connection is lost
            setMessage("");
            if (error) {
              Analytics.record({ name: "chatError" }); // this record the chat button press
              setError("Lost connection to chat. Press 'OK' to reconnect.");
              closeChat();
            } else {
              setError("");
              setMessage("");
            }
          });
        }
      }
    }
  };

  // Called on unmount
  useEffect(() => () => closeChat(), []);

  //map each message into a <Message /> object and pass it to return
  const createMessages = (messages, name) => {
    let block = messages.map(function(message, i){
      return (
        <div key={i}>
          <Message message={message} name={name} socket={socket} />
        </div>
      );
    });
    return block;
  }

  return (
    <div>
      <div className="chat-container">
        <InfoBar room={room} users={users} />
        <ScrollToBottom className="messages">
          {createMessages(messages, name)}
        </ScrollToBottom>
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          name={name}
        />
      </div>
    </div>
  );
};

export default Chat;

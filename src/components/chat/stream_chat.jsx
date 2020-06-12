// React imports
import React, { useState, useEffect } from "react";

// Module imports
import io from "socket.io-client";

// Component imports
import InfoBar from "./info_bar";
import Input from "./input";
import Messages from "./messages";

// Styles imports
import "./chat.scss";

let socket; // Socket declaration

// Main chat component
const Chat = ({ chat_name, chatStatus, setViewers }) => {
  const [name, setName] = useState(chat_name); // User's chat name
  const [room, setRoom] = useState("CHAT"); // Title of chat and room all users are in
  const [users, setUsers] = useState(""); // List of users in chat room
  const [message, setMessage] = useState(""); // Holds inputted message
  const [messages, setMessages] = useState([]); // Holds list of messages
  const [error, setError] = useState("");
  const ENDPOINT = "https://onfour-chat.herokuapp.com/"; // Chat server endpoint

  // Function that is called when user leaves chat
  const closeChat = () => {
    chatStatus(false);
    socket.disconnect();
  };

  // Function called on mount
  useEffect(() => {
    console.log(name);
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
  }, []);

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
      console.log(name);
      if (message) {
        if (message.length > 140) {
          alert("Message cannot be longer than 140 characters.");
        } else {
          socket.emit("sendMessage", message, (error) => {
            // Error checking if connection is lost
            setMessage("");
            if (error) {
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

  return (
    <div className="chat-outer-container">
      <div className="chat-container">
        <InfoBar room={room} users={users} />
        <Messages messages={messages} name={name} />
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

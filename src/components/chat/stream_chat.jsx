import React, { Component, useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import Join from "./join_chat";
import "./chat.scss";
import InfoBar from "./info_bar";
import Input from "./input";
import Messages from "./messages";
import TextContainer from "./text_container";

let socket;

const Chat = ({ chatName }) => {
  const [name, setName] = useState(chatName);
  const [room, setRoom] = useState("Onfour");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    console.log(room);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, name, room]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };
  console.log(message, messages);
  return (
    <div className="chat-outer-container">
      <div className="chat-container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;

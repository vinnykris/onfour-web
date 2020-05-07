import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./chat.scss";
import InfoBar from "./info_bar";
import Input from "./input";
import Messages from "./messages";

let socket;

const Chat = ({ chatName, chatStatus }) => {
  const [name, setName] = useState(chatName);
  const [room, setRoom] = useState("Onfour");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "https://onfour-chat.herokuapp.com/";

  const closeChat = () => {
    chatStatus(false);
    socket.disconnect();
  };

  useEffect(() => {
    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
        closeChat();
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
      if (message.length > 140) {
        alert("Message cannot be longer than 140 characters.");
      } else {
        socket.emit("sendMessage", message, () => setMessage(""));
      }
    }
  };

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
        />
      </div>
    </div>
  );
};

export default Chat;

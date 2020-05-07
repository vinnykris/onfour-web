import React from "react";
import "./chat.scss";
import onlineIcon from "../../images/online_icon.png";

const TextContainer = ({ users }) => (
  <div className="text-container">
    <div>
      <h1>
        Realtime Chat Application{" "}
        <span role="img" aria-label="emoji">
          💬
        </span>
      </h1>
      <h2>
        Created with React, Express, Node and Socket.IO{" "}
        <span role="img" aria-label="emoji">
          ❤️
        </span>
      </h2>
      <h2>
        Try it out right now!{" "}
        <span role="img" aria-label="emoji">
          ⬅️
        </span>
      </h2>
    </div>
    {users ? (
      <div>
        <h1>People currently chatting:</h1>
        <div className="active-container">
          <h2>
            {users.map(({ name }) => (
              <div key={name} className="active-item">
                {name}
                <img alt="Online Icon" src={onlineIcon} />
              </div>
            ))}
          </h2>
        </div>
      </div>
    ) : null}
  </div>
);

export default TextContainer;

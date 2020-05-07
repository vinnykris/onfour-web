import React, { useState } from "react";
import "./chat.scss";

const Join = ({ joinSubmit, mode }) => {
  const [name, setName] = useState("");
  const handleSubmit = () => {
    if (name.length > 30) {
      alert("Username cannot exceed 30 characters.");
    } else {
      mode = true;
      joinSubmit(name, mode);
    }
  };
  return (
    <div className="join-outer-container">
      <div className="join-inner-container">
        <h4 className="heading">Join the Chat</h4>
        <fieldset>
          <fieldset>
            <input
              placeholder="Name"
              className="join-input"
              type="text"
              onChange={(event) => setName(event.target.value)}
            />{" "}
          </fieldset>
          <button className="button mt-20" type="submit" onClick={handleSubmit}>
            Join
          </button>
        </fieldset>
      </div>
    </div>
  );
};

export default Join;

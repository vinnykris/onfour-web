import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import "./chat.scss";

const Join = ({ joinSubmit, mode }) => {
  const [name, setName] = useState("");
  const handleSubmit = () => {
    mode = true;
    // history.pushState({}, null, `/chat?name=${name}`);
    joinSubmit(name, mode);
  };
  return (
    <div className="join-outer-container">
      <div className="join-inner-container">
        <h1 className="heading">Join</h1>
        {/* <form onSubmit={this.submitForm(name)}> */}
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
            Sign In
          </button>
        </fieldset>
        {/* </form> */}
      </div>
    </div>
  );
};

export default Join;

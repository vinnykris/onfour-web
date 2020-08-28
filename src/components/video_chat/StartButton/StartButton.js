import React from "react";
import "./StartButton.css";

/**
 * Props:
 * - disabled: boolean
 * - onClick: () => ()
 */
export default function StartButton(props) {
  return (
    <button
      className={
        "start-button" +
        (props.create_room ? " create-room-start-button" : "")
      }
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.artistView
        ? "See And Hear The Fans"
        : props.create_room
        ? "Create Room"
        : "Join Video Call"}
    </button>
  );
}

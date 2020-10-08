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
        (props.create_room ? " create-room-start-button" : "") +
        (props.artistView ? " artist-start-button" : "")
      }
      disabled={props.disabled}
      onClick={props.onClick}
    >
      <p className="button-text start-button-text">
        {props.artistView
          ? "Join One Random Fan Room"
          : props.create_room
          ? "Create Room"
          : "Join Video Call"}
      </p>
    </button>
  );
}

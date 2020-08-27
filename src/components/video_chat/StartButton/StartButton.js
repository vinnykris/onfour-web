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
      className="primary-button button-text"
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.artistView ? "See And Hear The Fans" : "Join Video Call"}
    </button>
  );
}

import React, { useState, useEffect } from "react";
import Rodal from "rodal";

import "./access_modal_styles.scss";

import { useInputValue, useWindowDimensions } from "../custom_hooks";

import InputOne from "../inputs/input_one";

const AccessModal = (props) => {
  const [show_modal, setShowModal] = useState(true);
  const email_input = useInputValue("");

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = () => {
    console.log(email_input);
  };
  return (
    <div>
      <Rodal
        visible={show_modal}
        width={482}
        height={424}
        measure="px"
        onClose={closeModal}
        customStyles={{
          padding: 0,
          //overflow: scroll,
          maxHeight: "545px",
          maxWidth: "482px",
          background:
            "linear-gradient(0deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09)), #07070F",
          boxShadow:
            "0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.2)",
          borderRadius: "10px",
        }}
      >
        <div className="access-modal-main">
          <div className="access-modal-header">
            <span className="access-modal-title header-5">Enter Venue</span>
          </div>
          <form className="access-modal-body" onSubmit={handleSubmit}>
            <div className="enter-email-prompt">
              <span className="prompt-text subtitle-1">
                If you have purchased your ticket already, please enter your
                email to enter the venue:
              </span>
            </div>
            <div className="enter-email-input">
              <InputOne
                id="stream-email-input"
                type="email"
                name="access-email"
                is_required={true}
                {...email_input}
                placeholder="Email"
              />
            </div>
            <div className="submit-email-button-container">
              <button
                className="primary-button enter-venue-button"
                type="submit"
              >
                <span className="button-text">Enter</span>
              </button>
            </div>
          </form>
          <div className="buy-ticket-prompt-container">
            <span className="buy-ticket-prompt header-7">
              {"Don't have a ticket? Click "}
              <span
                onClick={props.openTicketModal}
                className="open-ticket-modal-link header-7"
              >
                here
              </span>
              {" to get your ticket!"}
            </span>
          </div>
        </div>
      </Rodal>
    </div>
  );
};

export default AccessModal;

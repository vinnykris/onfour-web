import React, { useState, useEffect } from "react";
import Rodal from "rodal";

import "./access_modal_styles.scss";

import { useInputValue, useWindowDimensions } from "../custom_hooks";

import InputTwo from "../inputs/input_two";

const AccessModal = (props) => {
  const [show_modal, setShowModal] = useState(true);
  const email_input = useInputValue("");

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.checkAccess(email_input.value);
    console.log(email_input);
  };
  return (
    <div>
      {props.is_mobile ? (
        <Rodal
          visible={props.visible}
          width={96}
          height={60}
          measure="%"
          onClose={props.onClose}
          customStyles={{
            padding: 0,
            //overflow: scroll,
            maxHeight: "60%",
            maxWidth: "96%",
            background:
              "linear-gradient(0deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09)), #07070F",
            boxShadow:
              "0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
          }}
          closeMaskOnClick={false}
          showCloseButton={false}
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
                <InputTwo
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
              {props.access_error ? (
                <div className="failed-access-message-container">
                  <span className="failed-access-message header-8">
                    We can't seem to find your ticket.
                  </span>
                </div>
              ) : null}
            </form>
            <div className="buy-ticket-prompt-container">
              <span className="buy-ticket-prompt header-7">
                Don't have a ticket? Click&nbsp;
                <span
                  onClick={props.openTicketModal}
                  className="open-ticket-modal-link header-7"
                >
                  here
                </span>
                &nbsp;to get your ticket!
              </span>
            </div>
          </div>
        </Rodal>
      ) : (
        <Rodal
          visible={props.visible}
          width={482}
          height={424}
          measure="px"
          onClose={props.onClose}
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
          closeMaskOnClick={false}
          showCloseButton={false}
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
                <InputTwo
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
              {props.access_error ? (
                <div className="failed-access-message-container">
                  <span className="failed-access-message header-8">
                    We can't seem to find your ticket.
                  </span>
                </div>
              ) : null}
            </form>
            <div className="buy-ticket-prompt-container">
              <span className="buy-ticket-prompt header-7">
                Don't have a ticket? Click&nbsp;
                <span
                  onClick={props.openTicketModal}
                  className="open-ticket-modal-link header-7"
                >
                  here
                </span>
                &nbsp;to get your ticket!
              </span>
            </div>
          </div>
        </Rodal>
      )}
    </div>
  );
};

export default AccessModal;

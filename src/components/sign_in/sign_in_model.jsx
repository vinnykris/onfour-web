import React from "react";
import Payment_box from "./sign_in";
import "./sign_in_styles.scss";
import Login from "../login_page/login_short_term";

const modal = () => {
  return (
    <div
      className="modal"
      id="sign_in_Modal"
      tapindex="-1"
      role="dialog"
      aria-labelledby="sign_in_ModalLabel"
      aria-hidden="true"
      data-backdrop="false"
    >
      <Login></Login>
    </div>
  );
};

export default modal;

// React Imports
import React, { useState } from "react";

// Component Imports
import Register from "../register_page/register_page";
import Login from "../login_page/login_page";
import { Grid, Row, Col } from "../grid";

// Styling Imports
import "./sign_in_styles.scss";

// Modal for registering and signing up. It displays the correct page
// inside of the model by tracking what tab the user clicks on
const Modal = () => {
  const [registering, setRegistering] = useState(false); // Tracks whether a user is registering or not
  const [login_style, setLoginStyle] = useState("black-tab"); // Tracks what the login tab style should be
  const [register_style, setRegisterStyle] = useState("purple-tab"); // Tracks what the register tab style should be

  // Function for when the register tab is clicked
  // Sets registering to true and updates the login and register tab styles
  const registerTab = (event) => {
    setRegistering(true);
    setLoginStyle("purple-tab");
    setRegisterStyle("black-tab");
  };

  // Function for when the login tab is clicked
  // Sets registering to false and updates the login and register tab styles
  const loginTab = (event) => {
    setRegistering(false);
    setLoginStyle("black-tab");
    setRegisterStyle("purple-tab");
  };

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
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Grid className="sign-modal-grid">
        <br></br>
        <Row>
          <Col size={0.5}></Col>
          <Col size={18}>
            <button
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={loginTab}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </Col>
          <Col size={0.5}></Col>
        </Row>
        <Row>
          <Col size={0.5}></Col>
          <Col size={3}>
            <button className={login_style} onClick={loginTab}>
              SIGN IN
            </button>
          </Col>
          <Col size={3}>
            <button className={register_style} onClick={registerTab}>
              SIGN UP
            </button>
          </Col>
          <Col size={0.5}></Col>
        </Row>
        <Row>
          {(() => {
            if (registering) {
              return <Register></Register>;
            } else {
              return <Login></Login>;
            }
          })()}
        </Row>
      </Grid>
    </div>
  );
};

export default Modal;

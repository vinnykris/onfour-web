// React
import React, { useState } from "react";

// Components
import { Grid, Row, Col } from "../grid";
import PulseLoader from "react-spinners/PulseLoader";

// APIs/Amplify
import awsmobile from "../../apis/AppSync";
import Auth from "../../apis/UserPool";
import Amplify from "aws-amplify";

// Styles
import "./sign_in_mobile_styles.scss";

Amplify.configure(awsmobile); // Configuring AppSync API

const LoginMobile = ({ toggleRegister, closeMenu }) => {
  const [email, setEmail] = useState(""); // Tracks user's email
  const [password, setPassword] = useState(""); // Tracks user's password
  const [is_processing, setProcessing] = useState(false); // Tracks whether user clicked sign-in or not
  const [error, setError] = useState(""); // Tracks error messages when trying to log in

  // Function to sign out the user for mobile -- no reload
  const mobileSignIn = (event) => {
    event.preventDefault();
    setProcessing(true);
    Auth.signIn(email, password)
      .then((data) => setEmail(""))
      .then((data) => setPassword(""))
      .then((data) => setError(""))
      .then((data) => closeMenu())
      .catch((err) => showError(err));
  };

  // Function that displays error on screen
  const showError = (err) => {
    setError(err.message);
    setProcessing(false);
    setPassword("");
  };

  return (
    <Grid className="login-grid">
      <Row>
        <Col size={1}>
          <p className="mobile-page-title">LOGIN</p>
        </Col>
      </Row>
      <Row className="login-fields-section">
        <div id="nav-login" className="overlay-content">
          <Col size={1}>
            {is_processing ? (
              <div className="loading-container">
                <PulseLoader
                  sizeUnit={"px"}
                  size={15}
                  color={"#7b6dac"}
                  loading={is_processing}
                />
              </div>
            ) : (
              <form
                className="login-form"
                action="/"
                id="login"
                onSubmit={mobileSignIn}
              >
                <Row>
                  <label className="label-text" for="email_slot">
                    Email Address*
                  </label>
                </Row>
                <Row>
                  <input
                    className="login-input"
                    type="email"
                    name="email"
                    id="email_slot"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </Row>
                <br></br>
                <Row>
                  <label className="label-text" for="password_slot">
                    Password*
                  </label>
                </Row>
                <Row>
                  <input
                    className="login-input"
                    type="password"
                    name="password"
                    id="password_slot"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </Row>
                <div style={{ color: "red" }}>{error}</div>

                <br></br>
                <br></br>
                <button
                  className="login-submit-button"
                  type="submit"
                  form="login"
                  value="Submit"
                >
                  SIGN IN
                </button>
                <br></br>
                <br></br>
                <p className="label-text">
                  Don't have an account? Click{" "}
                  <span className="register-prompt" onClick={toggleRegister}>
                    here
                  </span>{" "}
                  to sign up.
                </p>
              </form>
            )}
          </Col>
        </div>
      </Row>
    </Grid>
  );
};
export default LoginMobile;

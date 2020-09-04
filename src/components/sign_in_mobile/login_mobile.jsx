// Main Imports
import history from "../../history";

// React
import React, { useState } from "react";

// Components
import { Grid, Row, Col } from "../grid";
import ScaleLoader from "react-spinners/ScaleLoader";

// APIs/Amplify
import awsmobile from "../../apis/AppSync";
import Auth from "../../apis/UserPool";
import Amplify from "aws-amplify";

// Styles
import "./sign_in_mobile_styles.scss";
import "../login_page/login_styles.scss";

Amplify.configure(awsmobile); // Configuring AppSync API

const LoginMobile = ({ toggleRegister }) => {
  const [email, setEmail] = useState(""); // Tracks user's email
  const [password, setPassword] = useState(""); // Tracks user's password
  const [is_processing, setProcessing] = useState(false); // Tracks whether user clicked sign-in or not
  const [error, setError] = useState(""); // Tracks error messages when trying to log in

  // Function for when the user clicks the submit button to log in
  // Reloads the window to stream page if successful, otherwise provides error message to user
  const loginSubmit = (event) => {
    event.preventDefault();
    setProcessing(true);
    Auth.signIn(email, password)
      .then((data) => setEmail(""))
      .then((data) => setPassword(""))
      .then((data) => setError(""))
      .then((data) => history.push("/stream"))
      .then(
        (data) => (document.getElementById("nav-signin").style.height = "0%")
      )
      .catch((err) => showError(err));
  };

  // Function that displays error on screen
  const showError = (err) => {
    setError(err.message);
    setProcessing(false);
    setPassword("");
  };

  return (
    <div className="login-page-content">
      <Grid className="login-grid">
        <Row className="login-fields-section">
          {is_processing ? (
            <div className="login-loader-container">
              <ScaleLoader
                sizeUnit={"px"}
                size={18}
                color={"#E465A2"}
                loading={is_processing}
              />
            </div>
          ) : (
            // <p className="processing-message">Loading...</p>
            <div className="form-section">
              <form
                className="signin-form-mobile"
                action="/"
                id="login"
                onSubmit={loginSubmit}
              >
                <Row className="signin-header">
                  <h6 className="signin-header-text-mobile">
                    Sign in with your email or username below!
                  </h6>
                </Row>
                <Row className="login-input-row">
                  <input
                    className="login-input"
                    // type="email"
                    name="email"
                    id="email_slot"
                    value={email}
                    placeholder="Email Address or Username"
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </Row>
                <Row className="login-input-row">
                  <input
                    className="login-input"
                    type="password"
                    name="password"
                    id="password_slot"
                    value={password}
                    placeholder="Password"
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </Row>
                <div style={{ color: "red" }}>{error}</div>
                <br></br>
                <button
                  className="signin-submit-button"
                  type="submit"
                  form="login"
                  value="Submit"
                >
                  SIGN IN
                </button>
              </form>
              <p className="forgot-footer-mobile">
                <a href="/forgot" className="signup-link">
                  Forgot Password?
                </a>
              </p>
              <p className="signin-footer-mobile">
                Don't have an account?{" "}
                <span onClick={toggleRegister} className="signup-link">
                  Sign up
                </span>
                .
              </p>
            </div>
          )}
        </Row>
      </Grid>
    </div>
  );
};
export default LoginMobile;

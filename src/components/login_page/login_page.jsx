// Main Imports
import history from "../../history";
import { NavLink, useLocation } from "react-router-dom";

// React
import React, { useState, useEffect } from "react";

// Components
import { Grid, Row, Col } from "../grid";
import PulseLoader from "react-spinners/PulseLoader";
import InputOne from "../inputs/input_one";

// APIs/Amplify
import awsmobile from "../../apis/AppSync";
import Auth from "../../apis/UserPool";
import Amplify from "aws-amplify";

// Styles
import "./login_styles.scss";

Amplify.configure(awsmobile); // Configuring AppSync API

const Login = (props) => {
  const [email, setEmail] = useState(""); // Tracks user's email
  const [password, setPassword] = useState(""); // Tracks user's password
  const [is_processing, setProcessing] = useState(false); // Tracks whether user clicked sign-in or not
  const [error, setError] = useState(""); // Tracks error messages when trying to log in
  const [from_path, setFromPath] = useState(null);
  const state = props.location.state;

  // Function for when the user clicks the submit button to log in
  // Reloads the window to stream page if successful, otherwise provides error message to user
  const loginSubmit = (event) => {
    event.preventDefault();
    setProcessing(true);
    Auth.signIn(email, password)
      .then((data) => setEmail(""))
      .then((data) => setPassword(""))
      .then((data) => setError(""))
      .then((data) => {
        if (from_path) {
          history.push(from_path);
        } else {
          history.push("/");
        }
      })
      .catch((err) => showError(err));
  };

  // Function that displays error on screen
  const showError = (err) => {
    setError(err.message);
    setProcessing(false);
    setPassword("");
  };

  useEffect(() => {
    if (state) {
      setFromPath(state.current.pathname);
    }
  }, []);

  return (
    <div className="login-page-content">
      <Grid className="login-grid">
        <Row className="login-fields-section">
          {is_processing ? (
            <div className="login-loader-container">
              <PulseLoader
                sizeUnit={"px"}
                size={15}
                color={"#7b6dac"}
                loading={is_processing}
              />
            </div>
          ) : (
            // <p className="processing-message">Loading...</p>
            <div className="form-section">
              <form
                className="signin-form"
                action="/"
                id="login"
                onSubmit={loginSubmit}
              >
                <Row className="signin-header">
                  <div className="header-7 signin-text-color">
                    Sign in with your email or username below
                  </div>
                </Row>
                <div className="register-input-container">
                  <InputOne
                    id="email_slot"
                    type="text"
                    name="email"
                    is_required={true}
                    placeholder="Email Address or Username"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div className="register-input-container">
                  <InputOne
                    id="password_slot"
                    type="password"
                    name="password"
                    is_required={true}
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    is_password={true}
                    // data-tip
                    // data-for="registerTip"
                  />
                </div>
                {/* <Row className="login-input-row">
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
                </Row> */}
                {/* <Row className="login-input-row">
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
                </Row> */}
                <div style={{ color: "red" }}>{error}</div>
                <button
                  className="primary-button button-text signin-submit-button"
                  type="submit"
                  form="login"
                  value="Submit"
                >
                  LOG IN
                </button>
              </form>
              <p className="forgot-footer">
                <a href="/forgot" className="header-7 signin-link">
                  Forgot Password?
                </a>
              </p>
              <div className="header-7 signin-text-color">
                Don't have an account?{" "}
                {/* <a href="/register" className="signup-link">
                  Sign up
                </a> */}
                <NavLink
                  to={{
                    pathname: "/register",
                    state: { current: from_path },
                  }}
                  className="header-7 signin-link"
                >
                  Sign up
                </NavLink>
                .
              </div>
            </div>
          )}
        </Row>
      </Grid>
    </div>
  );
};
export default Login;

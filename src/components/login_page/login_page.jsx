// Main Imports
import history from "../../history";
import { NavLink, useLocation } from "react-router-dom";

// React
import React, { useState, useEffect } from "react";

// Components
import { Grid, Row, Col } from "../grid";
import ScaleLoader from "react-spinners/ScaleLoader";
import InputOne from "../inputs/input_one";
import { useWindowDimensions } from "../custom_hooks";

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

  const { height, width } = useWindowDimensions(); // Dimensions of screen

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
              <ScaleLoader
                sizeUnit={"px"}
                size={18}
                color={"#E465A2"}
                loading={is_processing}
              />
            </div>
          ) : (
            <div className="form-section">
              {width > 600 ? (
                <form
                  className="signin-form"
                  action="/"
                  id="login"
                  onSubmit={loginSubmit}
                >
                  <div className="header-3 signin-header-color">Log In</div>
                  <div className="header-7 signin-text-color">
                    Log in with your email or username
                  </div>
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
                    />
                  </div>
                  <div style={{ color: "red" }}>{error}</div>
                  <button
                    className="primary-button button-text signin-submit-button"
                    type="submit"
                    form="login"
                    value="Submit"
                  >
                    LOG IN
                  </button>
                  <p className="forgot-footer">
                    <a href="/forgot" className="header-7 signin-link">
                      Forgot Password?
                    </a>
                  </p>
                  <div className="header-7 signin-text-color">
                    Don't have an account?{" "}
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
                  <Row>
                    <div className="sign-in-divider"></div>
                    <text className="header-7 sign-in-divider-text">or</text>
                    <div className="sign-in-divider"></div>
                  </Row>
                  <Row className="social-sign-in-container">
                    <button
                      onClick={() =>
                        Auth.federatedSignIn({
                          provider: "Google",
                        })
                      }
                      className="social-sign-in-button"
                    >
                      <text className="segmented-button-text social-sign-in-text">
                        Sign In With Google
                      </text>
                    </button>
                  </Row>
                  <Row className="social-sign-in-container">
                    <button
                      onClick={() =>
                        Auth.federatedSignIn({
                          provider: "Facebook",
                        })
                      }
                      className="social-sign-in-button"
                    >
                      <text className="segmented-button-text social-sign-in-text">
                        Sign In With Facebook
                      </text>
                    </button>
                  </Row>
                </form>
              ) : (
                <form
                  className="signin-form"
                  action="/"
                  id="login"
                  onSubmit={loginSubmit}
                >
                  <div className="header-4 signin-header-color">Log In</div>
                  <div className="subtitle-3 signin-text-color">
                    Log in with your email or username
                  </div>
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
                    />
                  </div>
                  <div style={{ color: "red" }}>{error}</div>
                  <button
                    className="primary-button button-text signin-submit-button"
                    type="submit"
                    form="login"
                    value="Submit"
                  >
                    LOG IN
                  </button>
                  <p className="forgot-footer">
                    <a href="/forgot" className="body-2 signin-link">
                      Forgot Password?
                    </a>
                  </p>
                  <div className="body-2 signin-text-color">
                    Don't have an account?{" "}
                    <NavLink
                      to={{
                        pathname: "/register",
                        state: { current: from_path },
                      }}
                      className="body-2 signin-link"
                    >
                      Sign up
                    </NavLink>
                    .
                  </div>
                  <Row>
                    <div className="sign-in-divider-mobile"></div>
                    <text className="header-8 sign-in-divider-text-mobile">
                      or
                    </text>
                    <div className="sign-in-divider-mobile"></div>
                  </Row>
                  <Row className="social-sign-in-container">
                    <button
                      onClick={() =>
                        Auth.federatedSignIn({
                          provider: "Google",
                        })
                      }
                      className="social-sign-in-button"
                    >
                      <text className="segmented-button-text social-sign-in-text">
                        Sign In With Google
                      </text>
                    </button>
                  </Row>
                  <Row className="social-sign-in-container">
                    <button
                      onClick={() =>
                        Auth.federatedSignIn({
                          provider: "Facebook",
                        })
                      }
                      className="social-sign-in-button"
                    >
                      <text className="segmented-button-text social-sign-in-text">
                        Sign In With Facebook
                      </text>
                    </button>
                  </Row>
                </form>
              )}
            </div>
          )}
        </Row>
      </Grid>
    </div>
  );
};
export default Login;

// Main Imports
import history from "../../history";

// React
import React, { useState, useEffect } from "react";
import PasswordStrengthBar from "react-password-strength-bar";
import ReactTooltip from "react-tooltip";

// Components
import { Grid, Row, Col } from "../grid";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useWindowDimensions } from "../custom_hooks";

// GraphQL
import * as mutations from "../../graphql/mutations";
import * as queries from "../../graphql/queries";

// APIs/Amplify
import awsmobile from "../../apis/AppSync";
import Auth from "../../apis/UserPool";
import Amplify from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";

// Styles
import "./register_styles.scss";

// Utils
import {
  containsUppercaseAndLowercase,
  containsNumber,
  containsSpecialCharacter,
} from "../../utils/register";
import InputOne from "../inputs/input_two";

Amplify.configure(awsmobile); // Configuring AppSync API

const Register = (props) => {
  const [username, setUsername] = useState(""); // Tracks user's username
  const [email, setEmail] = useState(""); // Tracks user's email
  const [password, setPassword] = useState(""); // Tracks user's password
  const [repeat_password, setRepeatPassword] = useState(""); // Tracks user's repeated password
  const [first, setFirst] = useState(""); // Tracks user's first name
  const [last, setLast] = useState(""); // Tracks user's last name
  const [error, setError] = useState(""); // Tracks password failure errors
  const [success, setSuccess] = useState(false); // Tracks if user successfully signed up
  const [name, setName] = useState(""); // Tracks user's first name after successful registration
  const [checked, setChecked] = useState(true); // Tracks whether the subscribe to email list serve box is checked
  const [is_processing, setProcessing] = useState(false); // This is true only when register suceeds
  const [pin, setPin] = useState(""); // Tracks user's verification code
  const [auto_signup, setAutoSignUp] = useState(false); // Tracks if user is being auto logged in
  const [is_artist, setIsArtist] = useState(false); // Tracks if user signing up is a musician or a fan
  const [from_path, setFromPath] = useState(null);
  const state = props.location.state;

  const { height, width } = useWindowDimensions(); // Dimensions of screen

  useEffect(() => {
    if (state) {
      setFromPath(state.current);
    }
  }, []);

  // Function that occurs after the user clicks the submit button to sign up
  const registerSubmit = (event) => {
    event.preventDefault();
    setProcessing(true);
    // Username/Password information passed into cognito API
    const signup_payload = {
      username: username,
      // email: email,
      password,
      attributes: {
        email: email,
      },
    };

    // Email/First Name/Last Name/Concerts information passed into AppSync API/Registration Table
    const register_payload = {
      username: username.toLowerCase(),
      email: email,
      first: first,
      last: last,
      concert: "0", // Currently a placeholder value
      is_artist: false,
      verified: false,
    };

    // Email and paid values to be passed into the emailing list through AppSync API
    const subscription_payload = {
      email: email,
      paid: false,
    };

    // If the password is long enough, check that the passwords match.
    // If they do then pass the sign up payload into the cognito
    // API. If no errors occur, set name to the user's first name, set
    // success to true, call the registerUser function to add the user to the
    // registered users database, call the subscribeUser function to add the user to the
    // subscribed users database, and remove the text from all of the sign up fields
    // If the registration fails, display the error message to the user and remove the
    // text from the password field so that the user can enter a new password
    if (password.length > 7) {
      // if (password !== repeat_password) {
      //   setProcessing(false);
      //   setRepeatPassword("");
      //   setError("Passwords do not match");
      // } else {
      Auth.signUp(signup_payload)
        .then((data) => registerUser())
        .catch((err) => {
          setProcessing(false);
          setError(err.message);
          setPassword("");
          setRepeatPassword("");
        });
      //}
    } else {
      setProcessing(false);
      setPassword("");
      // setRepeatPassword("");
      setError("Password must be of at least length 8.");
    }

    // Checks if user's email exists in the database already, shows error if so
    const registerUser = (event) => {
      API.graphql(
        graphqlOperation(queries.query_name, {
          filter: { email: { eq: email } },
        })
      ).then((data) => {
        if (data.data.listCreateOnfourRegistrations.items.length === 0) {
          doMutation();
        } else {
          setProcessing(false);
          setError("Email already exists.");
        }
      });
    };

    // Function that takes the user's entered information and passes it into
    // the AppSync API to be stored in our registered users database table
    const doMutation = () => {
      API.graphql(
        graphqlOperation(mutations.create_registration, {
          input: register_payload,
        })
      )
        .then(() => {
          successfulSignUp();
        })
        .catch((err) => {
          setProcessing(false);
          setError("Username taken!");
        });
    };

    // Function that is called when the mutation is run successfully
    const successfulSignUp = () => {
      subscribeUser();
      setName(first);
      setSuccess(true);
      setError("");
    };

    // Function that store's the user's email in an email list database if the user
    // kept the subscribe box checked
    const subscribeUser = (event) => {
      if (checked) {
        API.graphql(
          graphqlOperation(mutations.create_email_subscription, {
            input: subscription_payload,
          })
        );
      }
    };
  };

  // Function that cleans up all of the fields in the form
  const cleanupForm = () => {
    setAutoSignUp(true);
    setFirst("");
    setLast("");
    setEmail("");
    setUsername("");
    setPassword("");
    // setRepeatPassword("");
    if (is_artist) {
      history.push("/form");
    } else if (from_path) {
      history.push(from_path);
    } else {
      history.push("/");
    }
  };

  // Function for checking a user's submitted pin to confirm account
  const registerSubmitPin = (event) => {
    event.preventDefault();
    Auth.confirmSignUp(username, pin)
      .then((data) => autoSignIn())
      .catch((err) => setError(err.message));
  };

  // Function to autosignin the user after being confirm/registered
  const autoSignIn = () => {
    Auth.signIn(username, password)
      .then((data) => cleanupForm())
      .catch((err) => setError(err.message));
  };

  // Set is_artist to false if "I'm a fan" button is clicked
  const setFanOption = () => {
    setIsArtist(false);
  };

  // Set is_artist to true if "I'm an artist" button is clicked
  const setArtistOption = () => {
    setIsArtist(true);
  };

  return (
    <div className="register-page-content">
      <Grid className="register-grid">
        <Row className="register-fields-section">
          {/* If the user has not yet signed up, display a form so that the user can
            enter their information and submit. For each field, update the state as the user
            changes the values in the boxes. Additionally, add a password strength meter that
            notifies the user of the quality of their password. Display errors to the user if
            their sign up attempts are unsuccessful  */}
          {(() => {
            if (success) {
              return (
                <div className="form-section">
                  {auto_signup ? (
                    <div className="login-loader-container">
                      <ScaleLoader
                        sizeUnit={"px"}
                        size={18}
                        color={"#E465A2"}
                        loading={auto_signup}
                      />
                    </div>
                  ) : (
                    <div className="register-form-container">
                      <form
                        className="register-form"
                        action="/"
                        id="register-pin"
                        onSubmit={registerSubmitPin}
                      >
                        <div className="signup-header">
                          <div className="header-7 register-text-color">
                            Welcome {name}. Please provide the verification code
                            sent to your email to complete registration!
                          </div>
                        </div>
                        <div className="register-input-row">
                          <input
                            className="register-input"
                            type="pin"
                            name="pin"
                            value={pin}
                            id="pin_slot"
                            placeholder="Verification Code"
                            onChange={(event) => setPin(event.target.value)}
                            required
                          />
                        </div>
                        <div style={{ color: "red" }}>{error}</div>
                        <div className="verification-footer">
                          <button
                            className="primary-button button-text register-verification-submit-button"
                            type="submit"
                            form="register-pin"
                            value="Submit"
                          >
                            COMPLETE REGISTRATION
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              );
            } else {
              return (
                <div className="form-section">
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
                    <div className="register-form-container">
                      {width > 600 ? (
                        <form
                          className="register-form"
                          action="/"
                          id="register"
                          onSubmit={registerSubmit}
                        >
                          <div className="login-form-container">
                            <div className="header-3 signin-header-color">
                              Sign Up
                            </div>
                            <div className="signup-header">
                              <div className="header-7 register-text-color">
                                Join the onfour experience below
                              </div>
                            </div>
                            <div className="register-input-container">
                              <InputOne
                                id="first_slot"
                                type="text"
                                name="full-name"
                                is_required={true}
                                placeholder="Full Name"
                                value={first}
                                onChange={(event) =>
                                  setFirst(event.target.value)
                                }
                              />
                            </div>
                            <div className="register-input-container">
                              <InputOne
                                id="username_slot"
                                type="text"
                                name="username"
                                is_required={true}
                                placeholder="Username"
                                value={username}
                                onChange={(event) =>
                                  setUsername(event.target.value)
                                }
                              />
                            </div>
                            <div className="register-input-container">
                              <InputOne
                                id="email_slot"
                                type="email"
                                name="email"
                                is_required={true}
                                placeholder="Email"
                                value={email}
                                onChange={(event) =>
                                  setEmail(event.target.value)
                                }
                              />
                            </div>
                            <div
                              className="register-input-container"
                              data-tip
                              data-for="registerTip"
                            >
                              <InputOne
                                id="password_slot"
                                type="password"
                                name="password"
                                is_required={true}
                                placeholder="Password"
                                value={password}
                                onChange={(event) =>
                                  setPassword(event.target.value)
                                }
                                is_password={true}
                              />
                            </div>
                            <ReactTooltip
                              id="registerTip"
                              place="left"
                              effect="solid"
                            >
                              <p className="password-tooltip-white">
                                Your password must contain the following:
                              </p>
                              <p className="password-suggestion-bullets">
                                {password.length > 7 ? (
                                  <i className="fa fa-check green-password-suggestion"></i>
                                ) : (
                                  <i className="fa fa-times red-password-suggestion"></i>
                                )}
                                <text
                                  className={
                                    password.length > 7
                                      ? "green-password-suggestion"
                                      : "red-password-suggestion"
                                  }
                                >
                                  {" "}
                                  8 or more characters
                                </text>
                              </p>
                              <br></br>
                              <p className="password-suggestion-bullets">
                                {containsUppercaseAndLowercase(password) ? (
                                  <i className="fa fa-check green-password-suggestion"></i>
                                ) : (
                                  <i className="fa fa-times red-password-suggestion"></i>
                                )}
                                <text
                                  className={
                                    containsUppercaseAndLowercase(password)
                                      ? "green-password-suggestion"
                                      : "red-password-suggestion"
                                  }
                                >
                                  {" "}
                                  Uppercase and lowercase letters
                                </text>
                              </p>
                              <br></br>
                              <p className="password-suggestion-bullets">
                                {containsNumber(password) ? (
                                  <i className="fa fa-check green-password-suggestion"></i>
                                ) : (
                                  <i className="fa fa-times red-password-suggestion"></i>
                                )}
                                <text
                                  className={
                                    containsNumber(password)
                                      ? "green-password-suggestion"
                                      : "red-password-suggestion"
                                  }
                                >
                                  {" "}
                                  At least 1 number
                                </text>
                              </p>
                              <br></br>
                              <p className="password-suggestion-bullets">
                                {containsSpecialCharacter(password) ? (
                                  <i className="fa fa-check green-password-suggestion"></i>
                                ) : (
                                  <i className="fa fa-times red-password-suggestion"></i>
                                )}
                                <text
                                  className={
                                    containsSpecialCharacter(password)
                                      ? "green-password-suggestion"
                                      : "red-password-suggestion"
                                  }
                                >
                                  {" "}
                                  At least 1 special character
                                </text>
                              </p>
                            </ReactTooltip>
                          </div>
                          <div className="email-subscribe-prompt">
                            <input
                              className="email-unsubscribe-checkbox"
                              name="isGoing"
                              type="checkbox"
                              checked={checked}
                              onChange={(event) => setChecked(!checked)}
                            />
                            <label className="header-8 register-text-color">
                              I want to receive email updates about future
                              onfour shows.
                            </label>
                          </div>
                          <div style={{ color: "red" }}>{error}</div>
                          <div className="register-button-container">
                            <button
                              className="primary-button mobile-button-text register-submit-button fan-submit-button"
                              type="submit"
                              form="register"
                              value="FanSubmit"
                              onClick={setFanOption}
                            >
                              I'M A FAN
                            </button>
                            <button
                              className="primary-button mobile-button-text register-submit-button artist-submit-button"
                              type="submit"
                              form="register"
                              value="ArtistSubmit"
                              onClick={setArtistOption}
                            >
                              I'M AN ARTIST
                            </button>
                          </div>

                          <div className="header-7 signup-footer register-text-color">
                            Already have an account?{" "}
                            <a href="/login" className="header-7 signin-link">
                              Log in
                            </a>
                            .
                          </div>
                        </form>
                      ) : (
                        <form
                          className="register-form"
                          action="/"
                          id="register"
                          onSubmit={registerSubmit}
                        >
                          <div className="login-form-container">
                            <div className="header-4 signin-header-color">
                              Sign Up
                            </div>
                            <div className="signup-header">
                              <div className="subtitle-3 register-text-color">
                                Join the onfour experience
                              </div>
                            </div>
                            <div className="register-input-container">
                              <InputOne
                                id="first_slot"
                                type="text"
                                name="full-name"
                                is_required={true}
                                placeholder="Full Name"
                                value={first}
                                onChange={(event) =>
                                  setFirst(event.target.value)
                                }
                              />
                            </div>
                            <div className="register-input-container">
                              <InputOne
                                id="username_slot"
                                type="text"
                                name="username"
                                is_required={true}
                                placeholder="Username"
                                value={username}
                                onChange={(event) =>
                                  setUsername(event.target.value)
                                }
                              />
                            </div>
                            <div className="register-input-container">
                              <InputOne
                                id="email_slot"
                                type="email"
                                name="email"
                                is_required={true}
                                placeholder="Email"
                                value={email}
                                onChange={(event) =>
                                  setEmail(event.target.value)
                                }
                              />
                            </div>
                            <div
                              className="register-input-container"
                              data-tip
                              data-for="registerTip"
                            >
                              <InputOne
                                id="password_slot"
                                type="password"
                                name="password"
                                is_required={true}
                                placeholder="Password"
                                value={password}
                                onChange={(event) =>
                                  setPassword(event.target.value)
                                }
                                is_password={true}
                              />
                            </div>
                            <ReactTooltip
                              id="registerTip"
                              place="left"
                              effect="solid"
                            >
                              <p className="password-tooltip-white">
                                Your password must contain the following:
                              </p>
                              <p className="password-suggestion-bullets">
                                {password.length > 7 ? (
                                  <i className="fa fa-check green-password-suggestion"></i>
                                ) : (
                                  <i className="fa fa-times red-password-suggestion"></i>
                                )}
                                <text
                                  className={
                                    password.length > 7
                                      ? "green-password-suggestion"
                                      : "red-password-suggestion"
                                  }
                                >
                                  {" "}
                                  8 or more characters
                                </text>
                              </p>
                              <br></br>
                              <p className="password-suggestion-bullets">
                                {containsUppercaseAndLowercase(password) ? (
                                  <i className="fa fa-check green-password-suggestion"></i>
                                ) : (
                                  <i className="fa fa-times red-password-suggestion"></i>
                                )}
                                <text
                                  className={
                                    containsUppercaseAndLowercase(password)
                                      ? "green-password-suggestion"
                                      : "red-password-suggestion"
                                  }
                                >
                                  {" "}
                                  Uppercase and lowercase letters
                                </text>
                              </p>
                              <br></br>
                              <p className="password-suggestion-bullets">
                                {containsNumber(password) ? (
                                  <i className="fa fa-check green-password-suggestion"></i>
                                ) : (
                                  <i className="fa fa-times red-password-suggestion"></i>
                                )}
                                <text
                                  className={
                                    containsNumber(password)
                                      ? "green-password-suggestion"
                                      : "red-password-suggestion"
                                  }
                                >
                                  {" "}
                                  At least 1 number
                                </text>
                              </p>
                              <br></br>
                              <p className="password-suggestion-bullets">
                                {containsSpecialCharacter(password) ? (
                                  <i className="fa fa-check green-password-suggestion"></i>
                                ) : (
                                  <i className="fa fa-times red-password-suggestion"></i>
                                )}
                                <text
                                  className={
                                    containsSpecialCharacter(password)
                                      ? "green-password-suggestion"
                                      : "red-password-suggestion"
                                  }
                                >
                                  {" "}
                                  At least 1 special character
                                </text>
                              </p>
                            </ReactTooltip>
                          </div>
                          <div className="email-subscribe-prompt">
                            <input
                              className="email-unsubscribe-checkbox"
                              name="isGoing"
                              type="checkbox"
                              checked={checked}
                              onChange={(event) => setChecked(!checked)}
                            />
                            <label className="subtitle-3 register-text-color">
                              I want to receive email updates about future
                              onfour shows.
                            </label>
                          </div>
                          <div style={{ color: "red" }}>{error}</div>
                          <div className="register-button-container">
                            <button
                              className="primary-button mobile-button-text register-submit-button fan-submit-button"
                              type="submit"
                              form="register"
                              value="FanSubmit"
                              onClick={setFanOption}
                            >
                              I'M A FAN
                            </button>
                            <button
                              className="primary-button mobile-button-text register-submit-button artist-submit-button"
                              type="submit"
                              form="register"
                              value="ArtistSubmit"
                              onClick={setArtistOption}
                            >
                              I'M AN ARTIST
                            </button>
                          </div>

                          <div className="body-2 signup-footer register-text-color">
                            Already have an account?{" "}
                            <a href="/login" className="body-2 signin-link">
                              Log in
                            </a>
                            .
                          </div>
                        </form>
                      )}
                    </div>
                  )}
                </div>
              );
            }
          })()}
        </Row>
      </Grid>
    </div>
  );
};

export default Register;

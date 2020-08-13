// Main Imports
import history from "../../history";

// React
import React, { useState } from "react";
import PasswordStrengthBar from "react-password-strength-bar";
import ReactTooltip from "react-tooltip";

// Components
import { Grid, Row, Col } from "../grid";
import PulseLoader from "react-spinners/PulseLoader";

// GraphQL
import * as mutations from "../../graphql/mutations";
import * as queries from "../../graphql/queries";

// APIs/Amplify
import awsmobile from "../../apis/AppSync";
import Auth from "../../apis/UserPool";
import Amplify from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";

// Styles
import "./sign_in_mobile_styles.scss";
import "../register_page/register_styles.scss";

// Utils
import {
  containsUppercaseAndLowercase,
  containsNumber,
  containsSpecialCharacter,
} from "../../utils/register";

Amplify.configure(awsmobile); // Configuring AppSync API

const RegisterMobile = ({ toggleLogin }) => {
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
      username: username,
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
      if (password !== repeat_password) {
        setProcessing(false);
        setRepeatPassword("");
        setError("Passwords do not match");
      } else {
        Auth.signUp(signup_payload)
          .then((data) => registerUser())
          .catch((err) => {
            setProcessing(false);
            setError(err.message);
            setPassword("");
            setRepeatPassword("");
          });
      }
    }
    // If the password is not long enough, display a message for the user
    else {
      setProcessing(false);
      setPassword("");
      setRepeatPassword("");
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

  // Function that cleans up all of the fields in the form and pushes the
  // signed up user to the correct next step in the flow (closes modal as well)
  const cleanupForm = () => {
    setAutoSignUp(true);
    setFirst("");
    setLast("");
    setEmail("");
    setUsername("");
    setPassword("");
    setRepeatPassword("");
    if (is_artist) history.push("/form");
    else history.push("/stream");
    document.getElementById("nav-signin").style.height = "0%";
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
                      <PulseLoader
                        sizeUnit={"px"}
                        size={15}
                        color={"#7b6dac"}
                        loading={auto_signup}
                      />
                    </div>
                  ) : (
                    <div>
                      <form
                        className="register-form-mobile"
                        action="/"
                        id="register-pin"
                        onSubmit={registerSubmitPin}
                      >
                        <Row className="signup-header">
                          <h6 className="signup-header-text-mobile">
                            Welcome {name}. Please provide the verification code
                            sent to your email to complete registration!
                          </h6>
                        </Row>
                        <Row className="register-input-row">
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
                        </Row>
                        <div style={{ color: "red" }}>{error}</div>
                        <br></br>
                        <Row className="verification-footer">
                          <button
                            className="register-verification-submit-button"
                            type="submit"
                            form="register-pin"
                            value="Submit"
                          >
                            COMPLETE REGISTRATION
                          </button>
                        </Row>
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
                      <PulseLoader
                        sizeUnit={"px"}
                        size={15}
                        color={"#7b6dac"}
                        loading={is_processing}
                      />
                    </div>
                  ) : (
                    <div>
                      <form
                        className="register-form-mobile"
                        action="/"
                        id="register"
                        onSubmit={registerSubmit}
                      >
                        <Row className="signup-header">
                          <h6 className="signup-header-text-mobile">
                            Sign up with your email and username below!
                          </h6>
                        </Row>

                        <Row className="register-input-row">
                          <input
                            className="register-input"
                            name="first"
                            required
                            id="first_slot"
                            value={first}
                            placeholder="First Name"
                            onChange={(event) => setFirst(event.target.value)}
                          />
                        </Row>
                        <Row className="register-input-row">
                          <input
                            className="register-input"
                            id="last_slot"
                            name="last"
                            value={last}
                            placeholder="Last Name"
                            onChange={(event) => setLast(event.target.value)}
                            required
                          />
                        </Row>
                        <Row className="register-input-row">
                          <input
                            className="register-input"
                            type="username"
                            name="username"
                            value={username}
                            id="username_slot"
                            placeholder="Username"
                            onChange={(event) =>
                              setUsername(event.target.value)
                            }
                            required
                          />
                        </Row>
                        <Row className="register-input-row">
                          <input
                            className="register-input"
                            type="email"
                            name="email"
                            value={email}
                            id="email_slot"
                            placeholder="Email"
                            onChange={(event) => setEmail(event.target.value)}
                            required
                          />
                        </Row>
                        <Row className="register-input-row">
                          <input
                            className="register-input"
                            type="password"
                            name="password"
                            value={password}
                            id="password_slot"
                            placeholder="Password"
                            onChange={(event) =>
                              setPassword(event.target.value)
                            }
                            required
                            data-tip
                            data-for="registerTipMobile"
                          />
                          <ReactTooltip
                            id="registerTipMobile"
                            place="bottom"
                            effect="solid"
                            offset="{'bottom': 220}"
                            scrollHide={false}
                          >
                            <p className="password-tooltip-white-mobile">
                              Your password must contain the following:
                            </p>
                            <p className="password-suggestion-bullets-mobile">
                              {password.length > 7 ? (
                                <i className="fa fa-check green-password-suggestion-mobile"></i>
                              ) : (
                                <i className="fa fa-times red-password-suggestion-mobile"></i>
                              )}
                              <text
                                className={
                                  password.length > 7
                                    ? "green-password-suggestion-mobile"
                                    : "red-password-suggestion-mobile"
                                }
                              >
                                {" "}
                                8 or more characters
                              </text>
                            </p>
                            <br></br>
                            <p className="password-suggestion-bullets-mobile">
                              {containsUppercaseAndLowercase(password) ? (
                                <i className="fa fa-check green-password-suggestion-mobile"></i>
                              ) : (
                                <i className="fa fa-times red-password-suggestion-mobile"></i>
                              )}
                              <text
                                className={
                                  containsUppercaseAndLowercase(password)
                                    ? "green-password-suggestion-mobile"
                                    : "red-password-suggestion-mobile"
                                }
                              >
                                {" "}
                                Uppercase and lowercase letters
                              </text>
                            </p>
                            <br></br>
                            <p className="password-suggestion-bullets-mobile">
                              {containsNumber(password) ? (
                                <i className="fa fa-check green-password-suggestion-mobile"></i>
                              ) : (
                                <i className="fa fa-times red-password-suggestion-mobile"></i>
                              )}
                              <text
                                className={
                                  containsNumber(password)
                                    ? "green-password-suggestion-mobile"
                                    : "red-password-suggestion-mobile"
                                }
                              >
                                {" "}
                                At least 1 number
                              </text>
                            </p>
                            <br></br>
                            <p className="password-suggestion-bullets-mobile">
                              {containsSpecialCharacter(password) ? (
                                <i className="fa fa-check green-password-suggestion-mobile"></i>
                              ) : (
                                <i className="fa fa-times red-password-suggestion-mobile"></i>
                              )}
                              <text
                                className={
                                  containsSpecialCharacter(password)
                                    ? "green-password-suggestion-mobile"
                                    : "red-password-suggestion-mobile"
                                }
                              >
                                {" "}
                                At least 1 special character
                              </text>
                            </p>
                          </ReactTooltip>
                        </Row>
                        <Row className="register-input-row">
                          <input
                            className="register-input"
                            type="password"
                            name="password"
                            value={repeat_password}
                            id="password_r_slot"
                            placeholder="Repeat Password"
                            onChange={(event) =>
                              setRepeatPassword(event.target.value)
                            }
                            required
                          />
                        </Row>
                        <PasswordStrengthBar
                          password={password}
                          minLength={8}
                        />
                        <br></br>
                        <Row>
                          <Col size={0.5}>
                            <input
                              className="email-unsubscribe-checkbox"
                              name="isGoing"
                              type="checkbox"
                              checked={checked}
                              onChange={(event) => setChecked(!checked)}
                            />
                          </Col>
                          <Col size={10}>
                            <label className="email-unsubscribe-text-mobile">
                              I want to receive email updates about future
                              Onfour shows.
                            </label>
                          </Col>
                        </Row>
                        <div style={{ color: "red", fontSize: "13px" }}>
                          {error}
                        </div>
                        <br></br>
                        <button
                          className="fan-register-submit-button-mobile"
                          type="submit"
                          form="register"
                          value="FanSubmit"
                          onClick={setFanOption}
                        >
                          I'M A FAN
                        </button>
                        <button
                          className="artist-register-submit-button-mobile"
                          type="submit"
                          form="register"
                          value="ArtistSubmit"
                          onClick={setArtistOption}
                        >
                          I'M AN ARTIST
                        </button>
                      </form>
                      <p className="signup-footer-mobile">
                        Already have an account?{" "}
                        <span onClick={toggleLogin} className="signin-link">
                          Sign in
                        </span>
                        .
                      </p>
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

export default RegisterMobile;

// React
import React, { useState } from "react";
import PasswordStrengthBar from "react-password-strength-bar";

// Components
import { Grid, Row, Col } from "../grid";

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

  // Function that occurs after the user clicks the submit button to sign up
  const registerSubmit = (event) => {
    event.preventDefault();

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
    // registered users database, and remove the text from all of the sign up fields
    // If the registration fails, display the error message to the user and remove the
    // text from the password field so that the user can enter a new password
    if (password.length > 7) {
      if (password !== repeat_password) {
        setRepeatPassword("");
        setError("Passwords do not match");
      } else {
        Auth.signUp(signup_payload)
          .then((data) => registerUser())
          .catch(
            (err) => setError(err.message),
            (err) => setPassword("")
          );
      }
    }
    // If the password is not long enough, display a message for the user
    else {
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
          setError("Email already exists.");
          cleanupForm();
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
        .then(() => successfulSignUp())
        .catch((err) => {
          setError("Username taken!");
        });
    };

    // Function that is called when the mutation is run successfully
    const successfulSignUp = () => {
      subscribeUser();
      cleanupForm();
      setSuccess(true);
      setError("");
    };

    // Function that cleans up all of the fields in the form
    const cleanupForm = () => {
      setName(first);
      setFirst("");
      setLast("");
      setEmail("");
      setUsername("");
      setPassword("");
      setRepeatPassword("");
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

  return (
    <div className="register-page-content">
      <Grid>
        <Row>
          <Col size={1}>
            <p className="mobile-page-title">REGISTER</p>
          </Col>
        </Row>
        <Row className="register-fields-section">
          <Col size={1}>
            {/* If the user has not yet signed up, display a form so that the user can
            enter their information and submit. For each field, update the state as the user
            changes the values in the boxes. Additionally, add a password strength meter that
            notifies the user of the quality of their password. Display errors to the user if
            their sign up attempts are unsuccessful  */}
            {(() => {
              if (success) {
                return (
                  <h4 className="sign-up-message">
                    Welcome {name}. <br></br>Please confirm your email before
                    signing in!
                  </h4>
                );
              } else {
                return (
                  <form
                    className="register-form"
                    action="/"
                    id="register"
                    onSubmit={registerSubmit}
                  >
                    <Row>
                      <Col size={1}>
                        <label className="label-text-left" for="first_slot">
                          First Name*
                        </label>
                      </Col>
                    </Row>
                    <Row>
                      <Col size={1}>
                        <input
                          className="register-input"
                          name="first"
                          required
                          id="first_slot"
                          value={first}
                          onChange={(event) => setFirst(event.target.value)}
                        />
                      </Col>
                    </Row>
                    <br></br>
                    <Row>
                      <Col size={1}>
                        <label className="label-text-left" for="last_slot">
                          Last Name*
                        </label>
                      </Col>
                    </Row>
                    <Row>
                      <Col size={1}>
                        <input
                          className="register-input"
                          id="last_slot"
                          name="last"
                          value={last}
                          onChange={(event) => setLast(event.target.value)}
                          required
                        />
                      </Col>
                    </Row>
                    <br></br>
                    <Row>
                      <Col size={1}>
                        <label className="label-text-left" for="username_slot">
                          Username*
                        </label>
                      </Col>
                    </Row>
                    <Row>
                      <input
                        className="register-input"
                        type="username"
                        name="username"
                        value={username}
                        id="username_slot"
                        onChange={(event) => setUsername(event.target.value)}
                        required
                      />
                    </Row>
                    <br></br>
                    <Row>
                      <Col size={1}>
                        <label className="label-text-left" for="email_slot">
                          Email*
                        </label>
                      </Col>
                    </Row>
                    <Row>
                      <input
                        className="register-input"
                        type="email"
                        name="email"
                        value={email}
                        id="email_slot"
                        onChange={(event) => setEmail(event.target.value)}
                        required
                      />
                    </Row>
                    <br></br>
                    <Row>
                      <Col size={1}>
                        <label className="label-text-left" for="password_slot">
                          Password*
                        </label>
                      </Col>
                    </Row>
                    <Row>
                      <Col size={1}>
                        <input
                          className="register-input"
                          type="password"
                          name="password"
                          value={password}
                          id="password_slot"
                          onChange={(event) => setPassword(event.target.value)}
                          required
                        />
                      </Col>
                    </Row>
                    <PasswordStrengthBar password={password} minLength={8} />
                    <Row>
                      <Col size={1}>
                        <label
                          className="label-text-left"
                          for="password_r_slot"
                        >
                          Repeat Password*
                        </label>
                      </Col>
                    </Row>

                    <Row>
                      <Col size={1}>
                        <input
                          className="register-input"
                          type="password"
                          name="password"
                          value={repeat_password}
                          id="password_r_slot"
                          onChange={(event) =>
                            setRepeatPassword(event.target.value)
                          }
                          required
                        />
                      </Col>
                    </Row>
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
                        <label className="email-unsubscribe-text">
                          I want to receive email updates about future Onfour
                          shows.
                        </label>
                      </Col>
                    </Row>
                    <br></br>
                    <div style={{ color: "red" }}>{error}</div>
                    <br></br>
                    <button
                      className="register-submit-button"
                      type="submit"
                      form="register"
                      value="Submit"
                    >
                      SIGN UP
                    </button>
                    <br></br>
                    <Row>
                      <Col size={1}>
                        <p className="label-text login-prompt">
                          Already have an account? Click{" "}
                          <span
                            className="register-prompt"
                            onClick={toggleLogin}
                          >
                            here
                          </span>{" "}
                          to log in.
                        </p>
                      </Col>
                    </Row>
                  </form>
                );
              }
            })()}
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default RegisterMobile;

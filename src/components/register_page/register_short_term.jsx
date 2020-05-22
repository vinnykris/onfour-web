// React
import React, { useState } from "react";
import PasswordStrengthBar from "react-password-strength-bar";
// Components
import { Grid, Row, Col } from "../grid";
// GraphQL
import * as mutations from "../../graphql/mutations";
// APIs/Amplify
import awsmobile from "../../apis/AppSync";
import Auth from "../../apis/UserPool";
import Amplify from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";
// Styles
import "./register_styles.scss";

Amplify.configure(awsmobile); // Configuring AppSync API

const Register = () => {
  const [email, setEmail] = useState(""); // Tracks users email
  const [password, setPassword] = useState(""); // Tracks users password
  const [first, setFirst] = useState(""); // Tracks users first name
  const [last, setLast] = useState(""); // Tracks users last name
  const [error, setError] = useState(""); // Tracks password failure errors
  const [success, setSuccess] = useState(false); // Tracks if user successfully signed up
  const [name, setName] = useState(""); // Tracks users first name after successful registration

  // Function that occurs after the user clicks the submit button to sign up
  const onSubmit = (event) => {
    event.preventDefault();

    // Username/Password information passed into cognito API
    const signup_payload = {
      username: email,
      password,
    };

    // Email/First Name/Last Name/Concerts information passed into AppSync API/Registration Table
    const register_payload = {
      email: email,
      first: first,
      last: last,
      concert: "0",
    };

    // If the password is long enough, then pass the sign up payload into the
    // cognito API. If no errors occur, set name to the user's first name, set
    // success to true, call the registerUser function to add the user to the
    // registered users database, and remove the text from all of the sign up fields
    // If the registration fails, display the error message to the user and remove the
    // text from the password field so that the user can enter a new password
    if (password.length > 7) {
      Auth.signUp(signup_payload)
        .then((data) => setName(first))
        .then((data) => setSuccess(true))
        .then((data) => registerUser())
        .then((data) => setFirst(""))
        .then((data) => setLast(""))
        .then((data) => setEmail(""))
        .then((data) => setPassword(""))
        .then((data) => setError(""))
        .catch(
          (err) => setError(err.message),
          (err) => setPassword("")
        );
    }
    // If the password is not long enough, display a message for the user
    else {
      setPassword("");
      setError("Password must be of at least length 8.");
    }

    // Function that takes the user's entered information and passes it in to
    // the AppSync API to be stored in our registered users database table
    const registerUser = (event) => {
      API.graphql(
        graphqlOperation(mutations.createRegistration, {
          input: register_payload,
        })
      );
    };
  };

  return (
    <div className="register-page-content">
      <Grid>
        <Row>
          <div className="short-term-spacer"></div>
        </Row>
        <Row>
          <Col size={1}>
            {/* If the user successfully signs up, display a message with their name
            and notify them to check their email. Otherwise, have a message that prompts
            the user to sign up */}
            {(() => {
              if (success) {
                return (
                  <div>
                    <h2>
                      Welcome {name}. Please confirm your email before signing
                      in!
                    </h2>
                  </div>
                );
              } else {
                return <h2> Sign Up With Onfour! </h2>;
              }
            })()}
          </Col>
        </Row>
        <Row>
          <br></br>
        </Row>
        <Row>
          <Col size={2}></Col>
          <Col size={1}>
            {/* If the user has not yet signed in, display a form so that the user can
            enter their information and submit. For each field, update the state as the user
            changes the values in the boxes. Additionally, add a password strength meter that
            notifies the user of the quality of their password. Display errors to the user if
            their sign up attempts are unsuccessful  */}
            {(() => {
              if (success) {
                return;
              } else {
                return (
                  <form action="/" id="newsletter" onSubmit={onSubmit}>
                    <input
                      placeholder="First Name"
                      name="first"
                      required
                      value={first}
                      onChange={(event) => setFirst(event.target.value)}
                      style={{ width: 300 }}
                    />
                    <input
                      placeholder="Last Name"
                      name="last"
                      value={last}
                      onChange={(event) => setLast(event.target.value)}
                      required
                      style={{ width: 300 }}
                    />
                    <input
                      placeholder="Email"
                      type="email"
                      name="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                      style={{ width: 300 }}
                    />
                    <input
                      placeholder="Password"
                      type="password"
                      name="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                      style={{ width: 300 }}
                    />
                    <PasswordStrengthBar password={password} minLength={8} />
                    <div style={{ color: "red" }}>{error}</div>
                    <button
                      type="submit"
                      form="newsletter"
                      value="Submit"
                      style={{ width: 300 }}
                    >
                      Submit
                    </button>
                  </form>
                );
              }
            })()}
          </Col>
          <Col size={2}></Col>
        </Row>
        <Row>
          <div className="short-term-spacer"></div>
        </Row>
      </Grid>
    </div>
  );
};

export default Register;

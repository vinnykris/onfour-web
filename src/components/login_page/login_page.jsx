// React
import React, { useState } from "react";

// Components
import { Grid, Row, Col } from "../grid";

// APIs/Amplify
import awsmobile from "../../apis/AppSync";
import Auth from "../../apis/UserPool";
import Amplify from "aws-amplify";

// Styles
import "./login_styles.scss";

Amplify.configure(awsmobile); // Configuring AppSync API

const Login = () => {
  const [email, setEmail] = useState(""); // Tracks users email
  const [password, setPassword] = useState(""); // Tracks users password
  const [error, setError] = useState(""); // Tracks error messages when trying to log in

  // function when the user clicks the submit button to log in
  // reloads the window if successful, otherwise provides error message to user
  const onSubmit = (event) => {
    event.preventDefault();

    Auth.signIn(email, password)
      .then((data) => setEmail(""))
      .then((data) => setPassword(""))
      .then((data) => setError(""))
      .then((data) => window.location.reload())
      .catch(
        (err) => setError(err.message),
        (err) => setPassword("")
      );
  };

  return (
    <div className="login-page-content">
      <Grid className="login-grid">
        <Row className="login-fields-section">
          <Col className="login-purple-scheme" size={0.5}></Col>
          <Col size={6}>
            <form
              className="login-form"
              action="/"
              id="newsletter"
              onSubmit={onSubmit}
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
                form="newsletter"
                value="Submit"
              >
                SIGN IN
              </button>
            </form>
          </Col>
          <Col className="login-purple-scheme" size={0.5}></Col>
        </Row>
      </Grid>
    </div>
  );
};
export default Login;

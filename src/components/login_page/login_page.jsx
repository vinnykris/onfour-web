// React
import React, { useState } from "react";
// Components
import { Grid, Row, Col } from "../grid";
// GraphQL
import * as queries from "../../graphql/queries";
// APIs/Amplify
import awsmobile from "../../apis/AppSync";
import Auth from "../../apis/UserPool";
import Amplify from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";
// Styles
import "./login_styles.scss";

Amplify.configure(awsmobile); // Configuring AppSync API

const Login = () => {
  const [email, setEmail] = useState(""); // Tracks users email
  const [password, setPassword] = useState(""); // Tracks users password
  const [error, setError] = useState(""); // Tracks error messages when trying to log in
  const [auth, setAuth] = useState(false); // Tracks if user is logged in/valid session
  const [user_email, setUserEmail] = useState(""); // Tracks user's email after signing in
  const [first, setFirst] = useState(""); // Tracks first name of signed in user

  // If the user is logged in/valid, set their auth value to true and track their email
  // If the user is not logged in/invalid, reset their auth value to false
  Auth.currentAuthenticatedUser({})
    .then((user) => setUserEmail(user.attributes.email))
    .then((user) => setAuth(true))
    .catch((err) => setAuth(false));

  // If the first name for the logged in user's email has not been retrieved yet,
  // query the registration database's table to retrieve the first name filtered
  // for the specific email and assign that value to first
  if (first === "" && user_email !== "") {
    API.graphql(
      graphqlOperation(queries.query_name, {
        filter: { email: { eq: user_email } },
      })
    ).then((data) =>
      setFirst(data.data.listOnfour_registrations.items[0].first)
    );
  }

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

  const onSubmitTwo = (event) => {
    Auth.signOut()
      .then((data) => console.log(data))
      .then((user) => window.location.reload())
      .catch((err) => console.log(err));
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
              {(() => {
                if (!auth) {
                  return (
                    <button
                      className="login-submit-button"
                      type="submit"
                      form="newsletter"
                      value="Submit"
                    >
                      SIGN IN
                    </button>
                  );
                }
              })()}
            </form>
            <div>
              {(() => {
                if (auth) {
                  return (
                    <button
                      type="submit"
                      form="newsletter"
                      value="Submit"
                      style={{ width: 300 }}
                      onClick={onSubmitTwo}
                    >
                      Sign Out
                    </button>
                  );
                }
              })()}
            </div>
          </Col>
          <Col className="login-purple-scheme" size={0.5}></Col>
        </Row>
      </Grid>
    </div>
  );
};
export default Login;

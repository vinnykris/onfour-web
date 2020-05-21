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
      graphqlOperation(queries.query_name2, {
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
      <Grid>
        <Row>
          <div className="short-term-spacer"></div>
        </Row>
        <Row>
          <Col size={1}>
            {(() => {
              if (auth) {
                return (
                  <div>
                    <h2>Hi {first}, Start exploring our concerts!</h2>
                  </div>
                );
              } else {
                return <h2> Welcome Back! </h2>;
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
            <form action="/" id="newsletter" onSubmit={onSubmit}>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                style={{ width: 300 }}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                style={{ width: 300 }}
              />
              <div style={{ color: "red" }}>{error}</div>

              {(() => {
                if (!auth) {
                  return (
                    <button
                      type="submit"
                      form="newsletter"
                      value="Submit"
                      style={{ width: 300 }}
                    >
                      Sign In
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
          <Col size={2}></Col>
        </Row>

        <Row>
          <Col size={2}></Col>
          <Col size={1}>
            {(() => {
              if (auth) {
                return;
              } else {
                return (
                  <p className="description-text">
                    Not registered yet? <br></br>Sign up{" "}
                    <a href="/register">here</a>!
                  </p>
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
export default Login;

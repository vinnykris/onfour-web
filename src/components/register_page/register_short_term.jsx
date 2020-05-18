import React, { useState } from "react";
import "./register_styles.scss";
import { Grid, Row, Col } from "../grid";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../../graphql/mutations";
import Amplify from "aws-amplify";
import awsmobile from "../../AppSync2";
import header_image from "../../images/banner_background_blur.jpg";
import Auth from "../../UserPool";
import PasswordStrengthBar from "react-password-strength-bar";

Amplify.configure(awsmobile);

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    const signupPayload = {
      username: email,
      password,
    };

    const payload = {
      email: email,
      first: first,
      last: last,
      paid: false,
    };

    if (password.length > 7) {
      Auth.signUp(signupPayload)
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
    } else {
      setPassword("");
      setError("Password must be of at least length 8.");
    }

    const registerUser = (event) => {
      API.graphql(
        graphqlOperation(mutations.createOnfour_reg, {
          input: payload,
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

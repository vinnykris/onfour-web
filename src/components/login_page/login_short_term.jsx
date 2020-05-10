import React, { useState } from "react";
import "../../styles.scss";
import { Grid, Row, Col } from "../grid";
import header_image from "../../images/banner_background_blur.jpg";
import Auth from "../../UserPool";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("");
  const [first, setFirst] = useState("");

  let logged_in = "Sign In";

  Auth.currentAuthenticatedUser({})
    .then((user) => setName(user.attributes.email))
    .then((user) => setAuth(true))

    .catch((err) => setAuth(false));

  if (auth) {
    logged_in = "Sign Out";
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
    <div>
      <Grid>
        <Row>
          <Col size={1}>
            <div className="banner-container">
              <img
                className="bannerbackground"
                src={header_image}
                alt="nav-logo"
              ></img>
            </div>
          </Col>
        </Row>
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
            <p className="description-text">
              Not registered yet? <br></br>Sign up <a href="/register">here</a>!
            </p>
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

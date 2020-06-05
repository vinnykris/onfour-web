// React
import React, { useState } from "react";

// APIs
import Auth from "../../apis/UserPool";

// Components
import { Grid, Row, Col } from "../grid";
import FadeLoader from "react-spinners/FadeLoader";

// Styles
import "./forgot_styles.scss";

// Forgot Username Page
const Forgot = () => {
  const [stage, setStage] = useState("first"); // first = email stage, second = verification code stage
  const [email, setEmail] = useState(""); // Email or username entered on initial email page
  const [code, setCode] = useState(""); // Verification code
  const [password, setPassword] = useState(""); // Password
  const [confirm_password, setConfirmPassword] = useState(""); // Repeated password
  const [error, setError] = useState(""); // Tracking/setting error message when changing password
  const [error_color, setErrorColor] = useState("red"); // Tracking/setting error message when changing password
  const [success, setSuccess] = useState(true); //Track if the reset password is seccessful

  // Function to redirect to stream page
  const redirect = () => {
    window.location.href = "http://onfour.live/stream";
  };

  // After a successfull password change, clear the input fields, display a success
  // message, and then redirect the user to the stream page after ~3 seconds
  const acceptPasswordChange = () => {
    // setError("Password successfully changed!");
    setSuccess(true);
    // setErrorColor("white");
    setEmail("");
    setCode("");
    setPassword("");
    setConfirmPassword("");
    window.setTimeout(redirect, 2800);
    
  };

  // Function to send a verification code to the input email
  const sendCode = (event) => {
    event.preventDefault();
    Auth.forgotPassword(email);
    setStage("second"); // set stage to "second" so that the next page is rendered
  };

  // Function to change the user's password given the username, password, and verifiation code
  const resetPassword = (event) => {
    event.preventDefault();

    // Set passworth length error
    if (password.length < 8 && confirm_password.length < 8) {
      setPassword("");
      setConfirmPassword("");
      setError("Password must be of at least length 8.");
      return;
    }

    // Set passwords not matching error
    if (password !== confirm_password) {
      setConfirmPassword("");
      setError("Passwords are not the same");
      return;
    }

    // If everything passes, call the accepPasswordChange function
    // Otherwise, display the error message
    Auth.forgotPasswordSubmit(email, code, password)
      .then((data) => {
        acceptPasswordChange();
        setStage("third"); // set stage to "third" so that the success message is rendered
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="forgot-page-content">
      <Grid className="forgot-grid">
        <Row className="forgot-fields-section">
          <Col size={6}>
            {stage === "first" && (
              <div>
                <form onSubmit={sendCode} className="forgot-form" id="forgot">
                  <Row>
                    <label className="label-text" for="email_slot">
                      Email Address or Username*
                    </label>
                  </Row>
                  <Row>
                    <input
                      className="forgot-input"
                      name="email"
                      id="email_slot"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                    />
                  </Row>
                  <br></br>
                  <br></br>
                  <button
                    className="forgot-submit-button"
                    type="submit"
                    form="forgot"
                    value="Submit"
                  >
                    SEND VERIFICATION CODE
                  </button>
                </form>
              </div>
            )}

            {stage === "second" && (
              <div>
                <form
                  onSubmit={resetPassword}
                  className="forgot-form"
                  id="forgot"
                >
                  <Row>
                    <label className="label-text" for="email_slot">
                      Email Address or Username*
                    </label>
                  </Row>
                  <Row>
                    <input
                      className="forgot-input"
                      name="email"
                      id="email_slot"
                      disabled="true"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                    />
                  </Row>
                  <br></br>
                  <Row>
                    <label className="label-text" for="verification_code">
                      Verification Code*
                    </label>
                  </Row>
                  <Row>
                    <input
                      className="forgot-input"
                      name="code"
                      id="verification_code"
                      value={code}
                      onChange={(event) => setCode(event.target.value)}
                      required
                    />
                  </Row>
                  <br></br>
                  <Row>
                    <label className="label-text" for="password_slot">
                      New Password*
                    </label>
                  </Row>
                  <Row>
                    <input
                      className="forgot-input"
                      type="password"
                      name="password"
                      id="password_slot"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                    />
                  </Row>
                  <br></br>
                  <Row>
                    <label className="label-text" for="new_password_slot">
                      Repeat New Password*
                    </label>
                  </Row>
                  <Row>
                    <input
                      className="forgot-input"
                      type="password"
                      name="new_password"
                      id="new_password_slot"
                      value={confirm_password}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                      required
                    />
                  </Row>
                  <br></br>
                  <div style={{ color: error_color }}>{error}</div>
                  <br></br>
                  <button
                    className="forgot-submit-button"
                    type="submit"
                    form="forgot"
                    value="Submit"
                  >
                    CHANGE PASSWORD
                  </button>
                </form>
              </div>
            )}
            {stage === "third" && (
              <div className="success-container">
                <p className="success-message-forgot">{"Password successfully changed!\n Please wait for the page to be reloaded"}</p>
                <div className="loader-container">
                  <FadeLoader
                    sizeUnit={"px"}
                    height={15}
                    width={6}
                    radius={2}
                    margin={2}
                    color={"#7b6dac"}
                    loading={success}
                  ></FadeLoader>
                </div>
              </div>
            )}
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default Forgot;

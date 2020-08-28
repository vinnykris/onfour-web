// Main Imports
import history from "../../history";

// React
import React, { useState } from "react";

// APIs
import Auth from "../../apis/UserPool";

// Components
import { Grid, Row, Col } from "../grid";
import PulseLoader from "react-spinners/PulseLoader";
import { useWindowDimensions } from "../custom_hooks";

// Styles
import "./forgot_styles.scss";

import { createCrew, addUserToCrew } from "../../utils/crew";

// Forgot Username Page
const Forgot = () => {
  const [stage, setStage] = useState("first"); // first = email stage, second = verification code stage
  const [email, setEmail] = useState(""); // Email or username entered on initial email page
  const [code, setCode] = useState(""); // Verification code
  const [password, setPassword] = useState(""); // Password
  const [confirm_password, setConfirmPassword] = useState(""); // Repeated password
  const [error, setError] = useState(""); // Tracking/setting error message when changing password
  const [success, setSuccess] = useState(true); //Track if the reset password is seccessful

  const { height, width } = useWindowDimensions(); // Dimensions of screen

  // Function to redirect to login page
  const redirect = () => {
    if (width > 600) history.push("/login"); // No redirect for mobile
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

  const examplefunc = async () => {
    await createCrew(
      [
        "barkadosh1@gmail.com",
        "vkk9@cornell.edu",
        "yz2579@cornell.edu",
        "sia8@cornell.edu",
        "wangy184@newschool.edu",
        "bk497@cornell.edu",
      ],
      "Onfour Crew",
      "barkadosh",
      "green"
    );

    // await addUserToCrew(
    //   "3df6b226-e86c-48c1-90c0-1fb2bc1db6c0",
    //   "onfour-bar",
    //   "bk497@cornell.edu",
    //   "green",
    //   "barkadosh"
    // );
  };

  return (
    <div className="forgot-page-content">
      <Grid className="forgot-grid">
        <Row className="forgot-fields-section">
          <Col size={6}>
            {stage === "first" && (
              <div>
                {width > 600 ? (
                  <form onSubmit={sendCode} className="forgot-form" id="forgot">
                    <Row className="forgot-header">
                      <h6 className="forgot-header-text">
                        Please enter your email or username below to receive a
                        verification email!
                      </h6>
                    </Row>
                    <Row className="forgot-input-row">
                      <input
                        className="forgot-input"
                        name="email"
                        id="email_slot"
                        value={email}
                        placeholder="Email Address or Username"
                        onChange={(event) => setEmail(event.target.value)}
                        required
                      />
                    </Row>
                    <br></br>
                    <Row className="forgot-verification-footer">
                      <button
                        className="forgot-submit-button"
                        type="submit"
                        form="forgot"
                        value="Submit"
                      >
                        SEND VERIFICATION CODE
                      </button>
                      <button onClick={examplefunc}>HI</button>
                      <div className="App">
                        <button
                          onClick={() =>
                            Auth.federatedSignIn({ provider: "Google" })
                          }
                        >
                          Open Google
                        </button>
                      </div>
                    </Row>
                  </form>
                ) : (
                  <form
                    onSubmit={sendCode}
                    className="forgot-form-mobile"
                    id="forgot"
                  >
                    <Row className="forgot-header">
                      <h6 className="forgot-header-text-mobile">
                        Please enter your email or username below to receive a
                        verification email!
                      </h6>
                    </Row>
                    <Row className="forgot-input-row">
                      <input
                        className="forgot-input"
                        name="email"
                        id="email_slot"
                        value={email}
                        placeholder="Email Address or Username"
                        onChange={(event) => setEmail(event.target.value)}
                        required
                      />
                    </Row>
                    <br></br>
                    <Row className="forgot-verification-footer-mobile">
                      <button
                        className="forgot-submit-button"
                        type="submit"
                        form="forgot"
                        value="Submit"
                      >
                        SEND VERIFICATION CODE
                      </button>
                    </Row>
                  </form>
                )}
              </div>
            )}
            {stage === "second" && (
              <div>
                {width > 600 ? (
                  <form
                    onSubmit={resetPassword}
                    className="forgot-form"
                    id="forgot"
                  >
                    <Row className="forgot-header">
                      <h6 className="forgot-header-text">
                        Please enter your verification and new password below!
                      </h6>
                    </Row>
                    <Row className="forgot-input-row">
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
                    <Row className="forgot-input-row">
                      <input
                        className="forgot-input"
                        name="code"
                        id="verification_code"
                        value={code}
                        placeholder="Verification Code"
                        onChange={(event) => setCode(event.target.value)}
                        required
                      />
                    </Row>
                    <Row className="forgot-input-row">
                      <input
                        className="forgot-input"
                        type="password"
                        name="password"
                        id="password_slot"
                        value={password}
                        placeholder="New Password"
                        onChange={(event) => setPassword(event.target.value)}
                        required
                      />
                    </Row>
                    <Row className="forgot-input-row">
                      <input
                        className="forgot-input"
                        type="password"
                        name="new_password"
                        id="new_password_slot"
                        value={confirm_password}
                        placeholder="Repeat New Password"
                        onChange={(event) =>
                          setConfirmPassword(event.target.value)
                        }
                        required
                      />
                    </Row>
                    <div style={{ color: "red" }}>{error}</div>
                    <br></br>
                    <Row className="forgot-verification-footer">
                      <button
                        className="forgot-submit-button"
                        type="submit"
                        form="forgot"
                        value="Submit"
                      >
                        CHANGE PASSWORD
                      </button>
                    </Row>
                  </form>
                ) : (
                  <form
                    onSubmit={resetPassword}
                    className="forgot-form-mobile"
                    id="forgot"
                  >
                    <Row className="forgot-header">
                      <h6 className="forgot-header-text-mobile">
                        Please enter your verification and new password below!
                      </h6>
                    </Row>
                    <Row className="forgot-input-row">
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
                    <Row className="forgot-input-row">
                      <input
                        className="forgot-input"
                        name="code"
                        id="verification_code"
                        value={code}
                        placeholder="Verification Code"
                        onChange={(event) => setCode(event.target.value)}
                        required
                      />
                    </Row>
                    <Row className="forgot-input-row">
                      <input
                        className="forgot-input"
                        type="password"
                        name="password"
                        id="password_slot"
                        value={password}
                        placeholder="New Password"
                        onChange={(event) => setPassword(event.target.value)}
                        required
                      />
                    </Row>
                    <Row className="forgot-input-row">
                      <input
                        className="forgot-input"
                        type="password"
                        name="new_password"
                        id="new_password_slot"
                        value={confirm_password}
                        placeholder="Repeat New Password"
                        onChange={(event) =>
                          setConfirmPassword(event.target.value)
                        }
                        required
                      />
                    </Row>
                    <div style={{ color: "red" }}>{error}</div>
                    <br></br>
                    <Row className="forgot-verification-footer-mobile">
                      <button
                        className="forgot-submit-button"
                        type="submit"
                        form="forgot"
                        value="Submit"
                      >
                        CHANGE PASSWORD
                      </button>
                    </Row>
                  </form>
                )}
              </div>
            )}
            {stage === "third" && (
              <div>
                {width > 600 ? (
                  <div className="success-container">
                    <p className="success-message-forgot">
                      {
                        "Password successfully changed!\n Please wait for the page to be reloaded"
                      }
                    </p>
                    <div className="loader-container">
                      <PulseLoader
                        sizeUnit={"px"}
                        size={15}
                        color={"#7b6dac"}
                        loading={success}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="success-container">
                    <p className="success-message-forgot">
                      {
                        "Password successfully changed!\n Please log in using your new password."
                      }
                    </p>
                  </div>
                )}
              </div>
            )}
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default Forgot;

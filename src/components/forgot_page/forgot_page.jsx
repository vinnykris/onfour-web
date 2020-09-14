// Main Imports
import history from "../../history";

// React
import React, { useState } from "react";

// APIs
import Auth from "../../apis/UserPool";

// Components
import { Grid, Row, Col } from "../grid";
import InputOne from ".././inputs/input_one";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useWindowDimensions } from "../custom_hooks";

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
    if (password.length < 8) {
      setPassword("");
      // setConfirmPassword("");
      setError("Password must be of at least length 8.");
      return;
    }

    // // Set passwords not matching error
    // if (password !== confirm_password) {
    //   setConfirmPassword("");
    //   setError("Passwords are not the same");
    //   return;
    // }

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
                {width > 600 ? (
                  <form onSubmit={sendCode} className="forgot-form" id="forgot">
                    <Row className="forgot-header">
                      <div className="header-7 signin-text-color">
                        Enter your email or username below and we'll help you
                        reset your password.
                      </div>
                    </Row>
                    <div className="register-input-container">
                      <InputOne
                        id="email_slot"
                        type="text"
                        name="email"
                        is_required={true}
                        placeholder="Email Address or Username"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </div>

                    {/* <Row className="forgot-verification-footer">
                      <button
                        className="forgot-submit-button"
                        type="submit"
                        form="forgot"
                        value="Submit"
                      >
                        SEND VERIFICATION CODE
                      </button> */}
                    <button
                      className="primary-button button-text forgot-submit-button"
                      type="submit"
                      form="forgot"
                      value="Submit"
                    >
                      SEND VERIFICATION CODE
                    </button>
                    {/* </Row> */}
                  </form>
                ) : (
                  <div className="forgot-stage-mobile">
                    <form
                      onSubmit={sendCode}
                      className="forgot-form-mobile"
                      id="forgot"
                    >
                      <div className="header-4 forgot-header-color-mobile">
                        Forgot Password?
                      </div>
                      <div className="subtitle-3 forgot-text-color-mobile">
                        Enter your email or username below and we'll help you
                        reset your password.
                      </div>
                      <div className="register-input-container">
                        <InputOne
                          name="email"
                          type="text"
                          id="email_slot"
                          is_required={true}
                          value={email}
                          placeholder="Email Address or Username"
                          onChange={(event) => setEmail(event.target.value)}
                        />
                      </div>
                      <button
                        className="primary-button button-text forgot-submit-button"
                        type="submit"
                        form="forgot"
                        value="Submit"
                      >
                        SEND VERIFICATION CODE
                      </button>
                    </form>
                  </div>
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
                      <div className="header-7 signin-text-color">
                        Please check your email for your verification code.
                        Enter your code and new password below.
                      </div>
                    </Row>
                    {/* <Row className="forgot-input-row">
                      <input
                        className="forgot-input"
                        name="email"
                        id="email_slot"
                        disabled="true"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                      />
                    </Row> */}
                    <div className="register-input-container">
                      <InputOne
                        id="email_slot"
                        type="text"
                        name="email"
                        is_required={true}
                        placeholder=""
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        is_disabled={true}
                      />
                    </div>
                    <div className="register-input-container">
                      <InputOne
                        id="verification_code"
                        type="text"
                        name="code"
                        is_required={true}
                        placeholder="Verification Code"
                        value={code}
                        onChange={(event) => setCode(event.target.value)}
                        //is_disabled={false}
                      />
                    </div>
                    {/* <Row className="forgot-input-row">
                      <input
                        className="forgot-input"
                        name="code"
                        id="verification_code"
                        value={code}
                        placeholder="Verification Code"
                        onChange={(event) => setCode(event.target.value)}
                        required
                      />
                    </Row> */}
                    {/* <Row className="forgot-input-row">
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
                    </Row> */}
                    <div className="register-input-container">
                      <InputOne
                        id="password_slot"
                        type="password"
                        name="password"
                        is_required={true}
                        placeholder="New Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        is_password={true}
                      />
                    </div>
                    {/* <Row className="forgot-input-row">
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
                    <br></br> */}
                    {/* <Row className="forgot-verification-footer">
                      <button
                        className="forgot-submit-button"
                        type="submit"
                        form="forgot"
                        value="Submit"
                      >
                        CHANGE PASSWORD
                      </button>
                    </Row> */}
                    <button
                      className="primary-button button-text forgot-submit-button"
                      type="submit"
                      form="forgot"
                      value="Submit"
                    >
                      CHANGE PASSWORD
                    </button>
                  </form>
                ) : (
                  <div className="forgot-stage-mobile">
                    <form
                      onSubmit={resetPassword}
                      className="forgot-form-mobile"
                      id="forgot"
                    >
                      <div className="header-7 forgot-text-color-mobile">
                        Please enter your verification and new password below!
                      </div>
                      <div className="register-input-container">
                        <InputOne
                          id="email_slot"
                          type="text"
                          name="email"
                          is_required={true}
                          placeholder=""
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          is_disabled={true}
                        />
                      </div>
                      <div className="register-input-container">
                        <InputOne
                          id="verification_code"
                          type="text"
                          name="code"
                          is_required={true}
                          placeholder="Verification Code"
                          value={code}
                          onChange={(event) => setCode(event.target.value)}
                        />
                      </div>
                      <div className="register-input-container">
                        <InputOne
                          id="password_slot"
                          type="password"
                          name="password"
                          is_required={true}
                          placeholder="New Password"
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                          is_password={true}
                        />
                      </div>
                      <div style={{ color: "red" }}>{error}</div>
                      <button
                        className="primary-button button-text forgot-submit-button"
                        type="submit"
                        form="forgot"
                        value="Submit"
                      >
                        CHANGE PASSWORD
                      </button>
                    </form>
                  </div>
                )}
              </div>
            )}
            {stage === "third" && (
              <div>
                {width > 600 ? (
                  <div className="success-container">
                    <p className="header-7 signin-text-color">
                      {
                        "Password successfully changed!\n Please wait for the page to be reloaded"
                      }
                    </p>
                    <div className="loader-container">
                      <ScaleLoader
                        sizeUnit={"px"}
                        size={18}
                        color={"#E465A2"}
                        loading={success}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="success-container-mobile">
                    <div className="header-7 forgot-text-color-mobile success-message-width ">
                      {
                        "Password successfully changed!\n Please log in using your new password."
                      }
                    </div>
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

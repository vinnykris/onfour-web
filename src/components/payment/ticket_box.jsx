// React Imports
import React, { useState, useEffect } from "react";
import NumberFormat from "react-number-format";

// Stripe Imports
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import stripeTokenHandler from "./stripe";

// Component Imports
import { useInputValue } from "../custom_hooks";
import MoonLoader from "react-spinners/MoonLoader";

// AWS Imports
import { Analytics } from "aws-amplify";

// Styles Imports
import "./donate_styles.scss";
import { Link } from "react-router-dom";

// The CheckoutForm component defines the userflow and layout of the payment form
// It contains function that calls the Stripe backend with AWS lambda function
const CheckoutForm = (props) => {
  // Stripe constants
  const stripe = useStripe();
  const elements = useElements();

  // State variables for diffenet payment form display
  const [payed, setPayed] = useState(false); // Variable to show the payment success message
  const [need_confirm, setNeedConfirm] = useState(true); // Variable to show the CONFIRM button
  const [payment_message, setMessage] = useState(""); // Variable to store the payment error message
  const [display_err, setDisplayErr] = useState(false); // Variable to display error message
  const [waiting, setWaiting] = useState(false); // Variable to display processing message
  const [loading, setLoading] = useState(false);

  // Input form values
  const name = useInputValue("");
  // var user_email = "";
  // // if (props.auth) {
  // //   user_email = props.user_email;
  // //   console.log("user authenticated");
  // // }
  // console.log(user_email);
  const email = useInputValue("");

  // Style defination for card information input section
  const iframeStyles = {
    base: {
      color: "rgba(255, 255, 255, 0.87)",
      backgrondColor: "#FFFFFF",
      fontSize: "16px",
      fontFamily: '"Montserrat", sans-serif',
      fontStyle: "normal",
      fontWeight: "normal",
      // lineHeight: "26px",
      letterSpacing: "0.05em",
      caretColor: "#E465A2",
      iconColor: "rgba(255, 255, 255, 0.28)",
      "::placeholder": {
        color: "rgba(255, 255, 255, 0.28)",
      },
      "::after": {
        border: "2px solid #E465A2 !important",
      },
    },
    invalid: {
      iconColor: "#ed586e",
      color: "#ed586e",
    },
    complete: {
      iconColor: "#08c43a",
    },
  };

  // Input content defination for card input information
  const cardElementOpts = {
    iconStyle: "solid",
    style: iframeStyles,
    hidePostalCode: true,
  };

  // This function set needConfirm to false
  // It is called after the user clicks the PAY button
  const needConfirmation = (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setNeedConfirm(false);
  };

  useEffect(() => {
    if (props.auth) {
      email.setValue(props.user_email);
      // email = useInputValue(props.user_email);
    }
  }, [props.auth]);

  // This function gets called after user clicked the CONFIRM button
  // It's sending the Stripe token to the AWS lambda function for executing the payment
  const submitPayment = async (event) => {
    event.preventDefault();
    if (props.amount_value > 0) {
      setWaiting(true);

      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        setWaiting(false);
        return;
      }

      const card = elements.getElement(CardElement);
      const result = await stripe.createToken(card);

      if (result.error) {
        // Show error to your customer.
        // console.log(result.error.message);
        setWaiting(false);
        setDisplayErr(true);
        setMessage(result.error.message);
        Analytics.record({ name: "tokenPaymentError" });
      } else {
        // Send the token to AWS lambda function
        const payment_result = await stripeTokenHandler(
          result.token,
          Math.round(props.amount_value * 100),
          //name.value,
          email.value,
          props.concert_id
        );
        setMessage(payment_result);
        if (payment_result === "Charge processed successfully!") {
          // if payment succeeds, setPay to true to display the payment success message
          setPayed(true);
          props.addTicket(email.value);
        } else {
          // if there is an error, display the error and change the processing message back to the CONFIRM button
          Analytics.record({ name: "stripeError" });
          setNeedConfirm(true);
          setDisplayErr(true);
          setWaiting(false);
        }
      }
    } else {
      setPayed(true);
      props.addTicket(email.value);
    }
  };

  const addTicket = async () => {
    setLoading(true);
    await props.addTicket(email.value);
    clearFields();
  };

  const clearFields = () => {
    setLoading(false);
    email.setValue("");
  };

  return (
    <div className="donate-box-container">
      <form id="ticket" className="ticket-form" onSubmit={submitPayment}>
        {(() => {
          if (!payed) {
            return (
              <div>
                {/* {props.amount_value > 0 ? ( */}
                <div>
                  {/* <input
                      name="name"
                      label="Name"
                      type="name"
                      placeholder="Your Name"
                      className="donate-form-input body-1 short-width-input"
                      required
                      {...name}
                    /> */}
                  {props.auth ? (
                    <input
                      name="email"
                      label="Email"
                      type="email"
                      value={props.user_email}
                      placeholder="Your Email"
                      className="donate-form-input body-1 short-width-input"
                      required
                      // onChange={email.onChange}
                      disabled
                      {...email}
                    />
                  ) : (
                    <div className="not-logged-in-field">
                      <input
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="Your Email"
                        className="donate-form-input body-1 short-width-input"
                        required
                        {...email}
                      />
                      <span className="sign-up-prompt subtitle-3">
                        <Link
                          className="ticket-disclaimer subtitle-3"
                          to="/register"
                        >
                          Sign up
                        </Link>
                        &nbsp; to save your ticket to your account.
                      </span>
                    </div>
                  )}
                  {props.amount_value > 0 ? (
                    <div>
                      <div className="donate-form-input body-1">
                        <CardElement options={cardElementOpts} />
                      </div>
                      {need_confirm ? (
                        <div>
                          {/* <br></br> */}
                          <button
                            className="donate-button button-text"
                            type="toConfirm"
                            disabled={!stripe}
                            onClick={needConfirmation}
                          >
                            PAY NOW
                          </button>
                          <p className="venmo-text segmented-button-text secure-msg">
                            *Your payment is secured via Stripe.
                          </p>
                        </div>
                      ) : (
                        <div>
                          {waiting ? (
                            <div>
                              <p className="donate-process-text body-1">
                                Processing
                              </p>
                            </div>
                          ) : (
                            <div>
                              {display_err ? (
                                <p className="error-msg">{payment_message}</p>
                              ) : (
                                <p className="donate-process-text body-1">
                                  Please confirm you are paying $
                                  {props.amount_value}
                                </p>
                              )}
                              <button
                                form="ticket"
                                className="donate-button button-text"
                                type="submit"
                                disabled={!stripe}
                              >
                                Confirm
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : !loading ? (
                    <button
                      className="donate-button button-text"
                      type="submit"
                      disabled={!props.is_user_price_inputed}
                      // onClick={() => {
                      //   props.addTicket();
                      //   setLoading(true);
                      // }}
                      onClick={addTicket}
                    >
                      GET TICKET
                    </button>
                  ) : (
                    <div className="centered-loader">
                      <MoonLoader
                        sizeUnit={"px"}
                        size={18}
                        color={"white"}
                        loading={loading}
                      />
                    </div>
                  )}
                  {/* } */}
                </div>
                {/* ) : !loading ? (
                <button
                  className="donate-button button-text"
                  type="submit"
                  disabled={!props.is_user_price_inputed}
                  onClick={() => {
                    props.addTicket();
                    setLoading(true);
                  }}
                >
                  GET TICKET
                </button>
                ) : (
                <div className="centered-loader">
                  <MoonLoader
                    sizeUnit={"px"}
                    size={18}
                    color={"white"}
                    loading={loading}
                  />
                </div>
                )} */}
              </div>
            );
          } else {
            return (
              <div>
                <br></br>
                <div className="pay_sucess_msg body-1">Payment Successful!</div>
              </div>
            );
          }
        })()}
      </form>
    </div>
  );
};

// donateBox is a wrapper component for CheckoutForm
// It is used for cleaner layout
const TicketBox = (props) => {
  return (
    <CheckoutForm
      auth={props.auth}
      user_email={props.user_email}
      amount_value={props.amount_value}
      addTicket={props.addTicket}
      is_user_price_inputed={props.is_user_price_inputed}
      concert_id={props.concert_id}
    />
  );
};

export default TicketBox;

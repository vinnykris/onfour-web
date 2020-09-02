// React Imports
import React, { useState } from "react";
import NumberFormat from "react-number-format";

// Stripe Imports
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import stripeTokenHandler from "./stripe";

// Component Imports
import { useInputValue } from "../custom_hooks";

// AWS Imports
import { Analytics } from "aws-amplify";

// Styles Imports
import "./donate_styles.scss";

// The CheckoutForm component defines the userflow and layout of the payment form
// It contains function that calls the Stripe backend with AWS lambda function
const CheckoutForm = () => {
  // Stripe constants
  const stripe = useStripe();
  const elements = useElements();

  // State variables for diffenet payment form display
  const [payed, setPayed] = useState(false); // Variable to show the payment success message
  const [need_confirm, setNeedConfirm] = useState(true); // Variable to show the CONFIRM button
  const [payment_message, setMessage] = useState(""); // Variable to store the payment error message
  const [display_err, setDisplayErr] = useState(false); // Variable to display error message
  const [waiting, setWaiting] = useState(false); // Variable to display processing message

  // State variables for the information inside payment form
  const [amount_value, setAmount] = useState(""); // The amount of money the user input

  // Input form values
  const name = useInputValue("");
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

  // This function gets called after user clicked the CONFIRM button
  // It's sending the Stripe token to the AWS lambda function for executing the payment
  const submitPayment = async (event) => {
    event.preventDefault();
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
      console.log(result.error.message);
      setWaiting(false);
      setDisplayErr(true);
      setMessage(result.error.message);
      Analytics.record({ name: "tokenPaymentError" });
    } else {
      // Send the token to AWS lambda function
      const payment_result = await stripeTokenHandler(
        result.token,
        Math.round(amount_value * 100),
        name.value,
        email.value
      );
      setMessage(payment_result);
      if (payment_result === "Charge processed successfully!") {
        // if payment succeeds, setPay to true to display the payment success message
        setPayed(true);
      } else {
        // if there is an error, display the error and change the processing message back to the CONFIRM button
        Analytics.record({ name: "stripeError" });
        setNeedConfirm(true);
        setDisplayErr(true);
        setWaiting(false);
      }
    }
  };

  return (
    <div className="donate-box-container">
      <form id="donate" className="donate-form" onSubmit={submitPayment}>
        {(() => {
          if (!payed) {
            return (
              <div>
                {display_err ? (
                  <p className="error-msg">{payment_message}</p>
                ) : (
                  <br></br>
                )}
                <NumberFormat
                  className="donate-form-input body-1 short-width-input"
                  name="amount"
                  placeholder="Amount $0.00"
                  value={amount_value}
                  onChange={(event) =>
                    setAmount(event.target.value.substring(1))
                  }
                  prefix="$"
                  decimalScale={2}
                  required
                />
                <input
                  name="name"
                  label="Name"
                  type="name"
                  placeholder="Your Name"
                  className="donate-form-input body-1 short-width-input"
                  required
                  {...name}
                />
                <input
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="Your Email"
                  className="donate-form-input body-1 short-width-input"
                  required
                  {...email}
                />
                <div className="donate-form-input body-1">
                  <CardElement options={cardElementOpts} />
                </div>
                {need_confirm ? (
                  <div>
                    <br></br>
                    <button
                      className="donate-button button-text"
                      type="toConfirm"
                      disabled={!stripe}
                      onClick={needConfirmation}
                    >
                      Donate with Credit Card
                    </button>
                    <p className="venmo-text segmented-button-text secure-msg">
                      *The payment is secure
                    </p>
                  </div>
                ) : (
                  <div>
                    {waiting ? (
                      <div>
                        <p className="donate-process-text">Processing</p>
                      </div>
                    ) : (
                      <div>
                        <p className="donate-process-text">
                          Please confirm you are donating ${amount_value}
                        </p>
                        <button
                          form="donate"
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
            );
          } else {
            return (
              <div>
                <br></br>
                <div className="pay_sucess_msg">Payment Successful!</div>
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
const DonateBox = () => {
  return <CheckoutForm />;
};

export default DonateBox;

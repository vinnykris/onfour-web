// React Imports
import React, { useState } from "react";

// Stripe Imports
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import stripeTokenHandler from "./stripe";

// Component Imports
import { useInputValue } from "../custom_hooks";

// AWS Imports
import { Analytics } from "aws-amplify";

// Styles Imports
import "./ticket_box_styles.scss";

// PaymentBox is a wrapper component for CheckoutForm
// It is used for cleaner layout
const TicketBox = ({ amount_value, onClick, registerConcert, header }) => {
  // Stripe constants
  const stripe = useStripe();
  const elements = useElements();

  // State variables for diffenet payment form display
  const [payed, setPayed] = useState(false); // Variable to show the payment success message
  const [need_confirm, setNeedConfirm] = useState(true); // Variable to show the CONFIRM button
  const [payment_message, setMessage] = useState(""); // Variable to store the payment error message
  const [display_err, setDisplayErr] = useState(false); // Variable to display error message
  const [waiting, setWaiting] = useState(false); // Variable to display processing message

  // Input form values
  const name = useInputValue("");
  const email = useInputValue("");

  // Style defination for card information input section
  const iframeStyles = {
    base: {
      color: "#000000",
      backgrondColor: "#FFFFFF",
      fontSize: "16px",
      iconColor: "#C4C4C4",
      "::placeholder": {
        color: "#C4C4C4",
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
      setMessage(result.error.message);
      setDisplayErr(true);
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
        registerConcert();
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
    <div className="ticket-bar">
      <div className="ticket-inner-container">
        <div className="ticket-checkout-header">
          <div className="ticket-header-container">
            <h5>{header}</h5>
          </div>
        </div>
        <form id="ticket" className="ticket-form" onSubmit={submitPayment}>
          {(() => {
            if (!payed) {
              return (
                <div>
                  {display_err ? (
                    <p className="error-msg">{payment_message}</p>
                  ) : (
                    <br></br>
                  )}
                  <input
                    name="name"
                    label="Name"
                    type="name"
                    placeholder="Cardholder Name"
                    className="ticket-form-input short-width-input"
                    required
                    {...name}
                  />
                  <input
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="Email for the Receipt"
                    className="ticket-form-input short-width-input"
                    required
                    {...email}
                  />
                  <div className="ticket-form-input">
                    <CardElement options={cardElementOpts} />
                  </div>
                  <br></br>
                  {waiting ? (
                    <div>
                      <p className="process-text">Processing</p>
                    </div>
                  ) : (
                    <div>
                      <button
                        form="none"
                        className="ticket-button"
                        onClick={onClick}
                      >
                        GO BACK
                      </button>
                      <button
                        form="ticket"
                        className="ticket-button"
                        type="submit"
                        disabled={!stripe}
                      >
                        PAY ${amount_value}
                      </button>
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
    </div>
  );
};

export default TicketBox;

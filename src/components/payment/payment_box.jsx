// React Imports
import React, { useState } from "react";

// Stripe Imports
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import stripeTokenHandler from "./stripe";

// Component Imports
import FormField from "./form_field";
import CurrencyField from "./currency_field";

// AWS Imports
import { Analytics } from "aws-amplify";

// Styles Imports
import "./payment_styles.scss";

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
  const [name, setName] = useState(""); // The input username
  const [email, setEmail] = useState(""); // The input user's email

  // Style defination for card information input section
  const iframeStyles = {
    base: {
      color: "#303096",
      fontSize: "16px",
      iconColor: "#303096",
      "::placeholder": {
        color: "#30309663",
      },
    },
    invalid: {
      iconColor: "#ed586e",
      color: "##ed586e",
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

  // This function gets called when user closed the payment modal
  // It reset the status of the payment modal back to original
  const resetPayment = (event) => {
    event.preventDefault();
    setPayed(false);
    setDisplayErr(false);
    setNeedConfirm(true);
    setWaiting(false);
    setAmount("");
    setName("");
    setEmail("");
  };

  // This function gets called after user clicked the CONFIRM button
  // It's sending the Stripe token to the AWS lambda function for executing the payment
  const submitPayment = async (event) => {
    event.preventDefault();
    setWaiting(true);

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);

    if (result.error) {
      // Show error to your customer.
      console.log(result.error.message);
      Analytics.record({ name: "tokenPaymentError" });
    } else {
      // Send the token to AWS lambda function
      const payment_result = await stripeTokenHandler(
        result.token,
        Math.round(amount_value * 100),
        name,
        email
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
    <div>
      <form id="donate" className="payment-form" onSubmit={submitPayment}>
        {(() => {
          if (!payed) {
            return (
              <div>
                <button
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={resetPayment}
                >
                  <span aria-hidden="true">&times;</span>
                </button>

                <br></br>
                {display_err && <p className="error-msg">{payment_message}</p>}
                <CurrencyField
                  className="currency-form-input"
                  name="amount"
                  label="Amount"
                  placeholder="$0.00"
                  value={amount_value}
                  onChange={(event) =>
                    setAmount(event.target.value.substring(1))
                  }
                  prefix="$"
                  decimalScale={2}
                  required
                />
                <FormField
                  name="name"
                  label="Name"
                  type="text"
                  placeholder="Jane Doe"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
                <FormField
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="jane.doe@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
                <br></br>
                <CardElement options={cardElementOpts} />
                <br></br>
                {need_confirm ? (
                  <button
                    className="payment-button"
                    type="toConfirm"
                    disabled={!stripe}
                    onClick={needConfirmation}
                  >
                    Pay
                  </button>
                ) : (
                  <div>
                    {waiting ? (
                      <div>
                        <p>Processing</p>
                      </div>
                    ) : (
                      <div>
                        <p>Please confirm you are donating ${amount_value}</p>
                        <button
                          form="donate"
                          className="payment-button"
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
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={resetPayment}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
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

// PaymentBox is a wrapper component for CheckoutForm
// It is used for cleaner layout
const PaymentBox = () => {
  return (
    <div>
      <br></br>
      <br></br>
      <div className="paymentbar">
        <CheckoutForm />
        <br></br>
        <br></br>
      </div>
    </div>
  );
};

export default PaymentBox;

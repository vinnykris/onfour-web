// React Imports
import React, { useState } from "react";
import NumberFormat from "react-number-format";

// Stripe Imports
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import stripeTokenHandler from "./stripe";

// Component Imports
import { useInputValue } from "../custom_hooks";

// Image imports
import venmo_code from "../../images/venmo_codes/onfour_venmo.jpeg";

// Styles Imports
import "./donate_styles.scss";

// The CheckoutForm component defines the userflow and layout of the payment form
// It contains function that calls the Stripe backend with AWS lambda function
const VenmoBox = (props) => {
  return (
    <div className="donate-box-container">
      {props.is_mobile ? (
        <div className="venmo-container">
          <img className="venmo-code" src={venmo_code} alt="venmo-qr"></img>
          <div className="venmo-text-container">
            <p className="venmo-text mobile-button-text">
              Scan the bar code to donate. <br></br>onfour will ensure your
              money is sent to the artist.
            </p>
          </div>
        </div>
      ) : (
        <div className="venmo-container">
          <img className="venmo-code" src={venmo_code} alt="venmo-qr"></img>
          <div className="venmo-text-container">
            <p className="venmo-text segmented-button-text">
              Scan the bar code to donate. <br></br>onfour will ensure your
              money is sent to the artist.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VenmoBox;

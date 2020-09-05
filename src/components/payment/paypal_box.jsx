// React Imports
import React, { useState } from "react";
import NumberFormat from "react-number-format";

// Stripe Imports
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import stripeTokenHandler from "./stripe";

// Component Imports
import { useInputValue } from "../custom_hooks";

import { Analytics } from "aws-amplify";

// Image imports
import venmo_code from "../../images/venmo_codes/onfour_venmo.jpeg";

// Styles Imports
import "./donate_styles.scss";

const donatePaypal = () => {
  Analytics.record({ name: "paypalClicked" });
  const url = "https://bit.ly/3dN8gOB";
  window.open(url, "_blank");
};

const PaypalBox = (props) => {
  return (
    <div className="donate-box-container">
      {props.is_mobile ? (
        <div className="venmo-container">
          <button className="paypal-button mobile-button-text" onClick={donatePaypal}>
            Donate with Paypal
          </button>
          <div className="venmo-text-container">
            <p className="venmo-text mobile-button-text">
              Click to donate with Paypal. <br></br>onfour will ensure your
              money is sent to the artist.
            </p>
          </div>
        </div>
      ) : (
        <div className="venmo-container">
          <button className="paypal-button button-text" onClick={donatePaypal}>
            Donate with Paypal
          </button>
          <div className="venmo-text-container">
            <p className="venmo-text segmented-button-text">
              Click to donate with Paypal. <br></br>onfour will ensure your
              money is sent to the artist.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaypalBox;

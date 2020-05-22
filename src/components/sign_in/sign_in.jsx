import React, { useState } from "react";
import "./sign_in_styles.scss";
import FormField from "../payment/FormField";
import Login from "../login_page/login_short_term";

const CheckoutForm = () => {
  const [payed, setPayed] = useState(false);
  const submitPayment = async (event) => {
    event.preventDefault();
    setPayed(true);
  };

  return (
    <div>
      <form className="payment-form" onSubmit={submitPayment}>
        {(() => {
          if (!payed) {
            return (
              <div>
                <button
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <br></br>
                <br></br>

                <FormField name="email" label="Email" type="email" required />
                <FormField
                  name="password"
                  label="Password"
                  type="text"
                  required
                />
                <br></br>
                <button className="payment-button" type="submit">
                  Sign In
                </button>
              </div>
            );
          } else {
            return (
              <div>
                <br></br>
                <div className="pay_sucess_msg">
                  Thank you for your donation! :)
                </div>
              </div>
            );
          }
        })()}
      </form>
    </div>
  );
};

// const stripePromise = loadStripe("pk_test_QYP6EIav9kdtsfLIRkarusKO00YsyMSiOK");

const payment_box = () => {
  return (
    <div>
      <br></br>
      <br></br>
      <div className="paymentbar">
        <Login />
        <br></br>
        <br></br>
      </div>
    </div>
  );
};

export default payment_box;

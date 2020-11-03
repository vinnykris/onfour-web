// React Imports
import React from "react";

// Image imports
// import venmo_code from "../../images/venmo_codes/onfour_venmo.jpeg";

// Styles Imports
import "./donate_styles.scss";

// The CheckoutForm component defines the userflow and layout of the payment form
// It contains function that calls the Stripe backend with AWS lambda function
const VenmoBox = (props) => {
  return (
    <div className="donate-box-container">
      {props.is_mobile ? (
        <div className="venmo-container">
          <img className="venmo-code" src={"https://onfour-media.s3.amazonaws.com/website+component/spencer-venmo-flowcode.png"} alt="venmo-qr"></img>
          <div className="venmo-text-container">
            <p className="venmo-text mobile-button-text">
              Scan the bar code to donate. <br></br>onfour will ensure your
              money is sent to the artist.
            </p>
          </div>
        </div>
      ) : (
        <div className="venmo-container">
          <img className="venmo-code" src={"https://onfour-media.s3.amazonaws.com/website+component/spencer-venmo-flowcode.png"} alt="venmo-qr"></img>
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

// React Imports
import React from "react";

// Component Imports
import PaymentBox from "./donate_box";

// PaymentModal is a modal wrappper for the PaymentBox component
// Each modal is identified by its id
const PaymentModal = () => {
  return (
    <div
      className="modal payment-modal"
      id="paymentModal"
      tapindex="-1"
      role="dialog"
      aria-labelledby="paymentModalLabel"
      aria-hidden="true"
      data-backdrop="false"
    >
      <PaymentBox></PaymentBox>
    </div>
  );
};

export default PaymentModal;

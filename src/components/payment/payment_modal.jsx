import React from "react";
import PaymentBox from "./payment_box";

const modal = () => {
  return (
    <div
      className="modal"
      id="exampleModal"
      tapindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <PaymentBox></PaymentBox>
    </div>
  );
};

export default modal;

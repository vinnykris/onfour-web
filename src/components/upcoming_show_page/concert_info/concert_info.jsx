import React from "react";
import "./concert_info_styles.scss";


const CheckoutForm = ({descriptions}) => {

    return (
        <div>
            <form id="concert_info" className="payment-form">
                <button className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <br></br>
                <p>{descriptions}</p>
            </form>
        </div>
    );
};


// const stripePromise = loadStripe("pk_test_QYP6EIav9kdtsfLIRkarusKO00YsyMSiOK");

const payment_box = ({descriptions}) => {
    return (
        <div>
            <br></br>
            <br></br>
            <div className="paymentbar">
                <CheckoutForm descriptions={descriptions} />
                <br></br>
                <br></br>
            </div>
        </div>
    );
};

export default payment_box;
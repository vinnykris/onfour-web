import React, { useState } from "react";
import "../styles.scss";
import { render } from "@testing-library/react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Grid, Row, Col } from "./grid";
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../graphql/mutations";
import Amplify from "aws-amplify";
import awsmobile from "../AppSync";
import { loadStripe} from "@stripe/stripe-js"
import {
    useStripe,
    useElements,
    CardElement,
    ElementsConsumer,
} from "@stripe/react-stripe-js";
import axios from "axios";
import FormField from "./payment/FormField";
import stripeTokenHandler from "./payment/stripe";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [payed, setPayed] = useState(false);

    const iframeStyles = {
        base: {
            color: "#303096",
            fontSize: "16px",
            iconColor: "#303096",
            "::placeholder": {
                color: "#30309663"
            }
        },
        invalid: {
            iconColor: "#ed586e",
            color: "##ed586e"
        },
        complete: {
            iconColor: "#08c43a"
        }
    };

    const cardElementOpts = {
        iconStyle: "solid",
        style: iframeStyles,
        hidePostalCode: true
    };

    const submitPayment = async (event) =>{
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const card = elements.getElement(CardElement);
        const result = await stripe.createToken(card);

        console.log("test1", result);

        if (result.error) {
            // Show error to your customer.
            console.log(result.error.message);
        } else {
            console.log("test2");
            // Send the token to your server.
            // This function does not exist yet; we will define it in the next step.
            stripeTokenHandler(result.token);
            setPayed(true);
        }
    }
    return (
        <div>
            <form className="payment-form" onSubmit={submitPayment}>
                {(() => {
                    if (!payed) {
                        return (
                            <div>
                                <FormField
                                    name="name"
                                    label="Name"
                                    type="text"
                                    placeholder="Jane Doe"
                                    required
                                />
                                <FormField
                                    name="email"
                                    label="Email"
                                    type="email"
                                    placeholder="jane.doe@example.com"
                                    required
                                />
                                <FormField
                                    name="zip"
                                    label="ZIP"
                                    type="text"
                                    placeholder="94103"
                                    required
                                />
                                <br></br>
                                <CardElement options={cardElementOpts}/>
                                <br></br>
                                <button className="payment-button" type="submit" disabled={!stripe}>
                                    Pay
                                </button>
                            </div>
                        );
                    } else {
                        return <div className="pay_sucess_msg">Payment Succeeded! :)</div>;
                    }
                })()}
            </form>
        </div>
    );
};


// const stripePromise = loadStripe("pk_test_QYP6EIav9kdtsfLIRkarusKO00YsyMSiOK");

const ticket = () => {
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

export default ticket;
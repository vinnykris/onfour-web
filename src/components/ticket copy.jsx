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
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import axios from "axios";
import FormField from "./payment/FormField";
import stripeTokenHandler from "./payment/stripe";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

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

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        });

        if (!error) {
            const { id } = paymentMethod;

            try{
                const { data } = await axios({
                    method: 'post',
                    url: '/api/charge',
                    data: { id, amount: 500 }
                });
                // axios.post('/api/charge', {id, amount: 500});
                console.log(data);
            }catch (error) {
                console.log(error);
            }
        }
    }
    return (
        <div>
            <form className="payment-form" onSubmit={submitPayment}>
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
import React, { useState } from "react";
import "./payment_styles.scss";
import {
    useStripe,
    useElements,
    CardElement,
} from "@stripe/react-stripe-js";
import FormField from "./form_field";
import stripeTokenHandler from "./stripe";
import CurrencyField from "./currency_field";


const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [payed, setPayed] = useState(false);
    const [needConfirm, setNeedConfirm] = useState(true);
    const [paymentMessage, setMessage] = useState("");
    const [displayErr, setDisplayErr] = useState(false);
    const [waiting, setWaiting] = useState(false);

    // state variables for the information inside payment form
    const [amount_value, setAmount] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');


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

    const needConfirmation = (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }
        setNeedConfirm(false);
    };

    const resetPayment = (event) =>{
        event.preventDefault();
        setPayed(false);
        setDisplayErr(false);
        setNeedConfirm(true);
        setWaiting(false);
        setAmount('');
        setName('');
        setEmail('');
    };

    const submitPayment = async (event) =>{
        event.preventDefault();
        setWaiting(true);

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
            const payment_result = await stripeTokenHandler(result.token, Math.round(amount_value*100), name, email);
            setMessage(payment_result);
            if (payment_result === "Charge processed successfully!") {
                setPayed(true);
            } else {
                setNeedConfirm(true);
                setDisplayErr(true);
                setWaiting(false);
            }
            
        }
    }


    return (
        <div>
            <form id="ticket" className="payment-form" onSubmit={submitPayment}>
                {(() => {
                    if (!payed) {
                        return (
                            <div>
                                <button className="close" data-dismiss="modal" aria-label="Close" onClick={resetPayment}>
                                    <span aria-hidden="true">&times;</span>
                                </button>

                                <br></br>
                                {displayErr && (
                                    <p className='error-msg'>{paymentMessage}</p>
                                )}
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
                                <CardElement options={cardElementOpts}/>
                                <br></br>
                                {needConfirm ? (
                                    <button className="payment-button" type="toConfirm" disabled={!stripe} onClick={needConfirmation}>
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
                                                        <button form="ticket" className="payment-button" type="submit" disabled={!stripe}>
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
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={resetPayment}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <br></br>
                                <div className = "pay_sucess_msg">Payment Successful!</div>
                                {/* if (messageRec) {
                                    return ();
                                } else {
                                    return (<div className="pay_sucess_msg"></div>);
                                }; */}
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
                <CheckoutForm />  
                <br></br>
                <br></br>
            </div>
        </div>
    );
};

export default payment_box;
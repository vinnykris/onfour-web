import React, { useState } from "react";
import "./payment_styles.scss";
import {
    useStripe,
    useElements,
    CardElement,
} from "@stripe/react-stripe-js";
import FormField from "./FormField";
import stripeTokenHandler from "./stripe";
import CurrencyField from "./CurrencyField";


const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [payed, setPayed] = useState(false);
    const [needConfirm, setNeedConfirm] = useState(true);
    const [paymentMessage, setMessage] = useState("");
    const [displayErr, setDisplayErr] = useState(false);
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
        setAmount('');
        setName('');
        setEmail('');
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
            const payment_result = await stripeTokenHandler(result.token, Math.round(amount_value*100), name, email);
            setMessage(payment_result);
            if (payment_result === "Charge processed successfully!") {
                setPayed(true);
            } else {
                setNeedConfirm(true);
                setDisplayErr(true);
            }
            
        }
    }
    return (
        <div>
            <form className="payment-form" onSubmit={submitPayment}>
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
                                    onChange={(event) => setName(event.target.value)}
                                    required
                                />
                                <FormField
                                    name="email"
                                    label="Email"
                                    type="email"
                                    placeholder="jane.doe@example.com"
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                />
                                <br></br>
                                <CardElement options={cardElementOpts}/>
                                <br></br>
                                <div>
                                    {needConfirm ? (
                                        <button className="payment-button" type="toConfirm" disabled={!stripe} onClick={needConfirmation}>
                                            Pay
                                        </button>
                                    ) : (
                                        <div>
                                                <p>Donating ${amount_value} to the musician?</p>
                                            <button className="payment-button" type="submit" disabled={!stripe}>
                                                Confirm
                                            </button>
                                        </div>
                                    )}
                                </div>
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
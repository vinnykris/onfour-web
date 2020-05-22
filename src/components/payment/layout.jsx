// React Imports
import React from "react";

// Stripe Imports
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


// This allows Stripe to detect anomalous behavior that may be indicative
// of fraud as customers browse your website.
// TIP
// call loadStripe outside of a component
// in that way there's no chance it will get
// called more times than it needs to

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);


// Layout is a wrapper conponent that loads Stripe only once
// and passes the stripePromise conponent to every page of the website
const Layout = ({ children }) => {
    return (
        <>
            <Elements stripe={stripePromise}>{children}</Elements>
        </>
    );
};
export default Layout;
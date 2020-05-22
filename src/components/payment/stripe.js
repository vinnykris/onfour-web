// Package Imports
import axios from "axios";

// This function stores the API information for AWS lambda function
const checkout = axios.create({
    baseURL: "https://2pmhxaifq8.execute-api.us-east-1.amazonaws.com/default",
    headers: {
        "Content-Type": "application/json",
        "x-api-key": "Gsb7vYcAQD1B7zNev6cz83VnDWQLbReH8HSOsGJs",
    },
});

// This function send the Stripe token and payment information to AWS lambda with post request
const stripeTokenHandler = async (token, amount_value, name, email) => {
    const paymentData = { token: token.id, amount: amount_value, name: name, email: email };

    try {
        const { data } = await checkout.post("/onfour_payment", paymentData);
        // console.log(data);
        return data.message;
    } catch (error) {
        // console.log(error.response.data.error);
        return error.response.data.error;
    }
    
    
};

export default stripeTokenHandler;
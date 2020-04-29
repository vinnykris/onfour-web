import axios from "axios";

const checkout = axios.create({
    baseURL: "https://v2synsqy6k.execute-api.us-east-1.amazonaws.com/default",
    headers: {
        "Content-Type": "application/json",
        "x-api-key": "5N1p7fldJx3eVNALOCHDb27bgISfZUWt47k3etx9",
    },
});

const stripeTokenHandler = async (token) => {
    const paymentData = { token: token.id };

    console.log("checking");

    return checkout.post("/AP_test1", paymentData);
};

export default stripeTokenHandler;
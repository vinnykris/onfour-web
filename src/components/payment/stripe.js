import axios from "axios";

const checkout = axios.create({
    baseURL: "https://2pmhxaifq8.execute-api.us-east-1.amazonaws.com/default",
    headers: {
        "Content-Type": "application/json",
        "x-api-key": "Gsb7vYcAQD1B7zNev6cz83VnDWQLbReH8HSOsGJs",
    },
});

const stripeTokenHandler = async (token) => {
    const paymentData = { token: token.id };

    console.log("checking");

    return checkout.post("/onfour_payment", paymentData);
};

export default stripeTokenHandler;
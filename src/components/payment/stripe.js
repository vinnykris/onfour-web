import axios from "axios";

const checkout = axios.create({
    baseURL: "https://2pmhxaifq8.execute-api.us-east-1.amazonaws.com/default",
    headers: {
        "Content-Type": "application/json",
        "x-api-key": "Gsb7vYcAQD1B7zNev6cz83VnDWQLbReH8HSOsGJs",
    },
});

const stripeTokenHandler = async (token, amount_value) => {
    const paymentData = { token: token.id, amount: amount_value };

    console.log("checking");

    // return checkout.post("/onfour_payment", paymentData).catch(function (error) {
    //     console.log(error);
    // });
    return checkout.post("/onfour_payment", paymentData);
    // return checkout.post("/onfour_payment", paymentData).catch(function (error) {
    //     if (error.response) {
    //         // Request made and server responded
    //         console.log(error.response.data);
    //         console.log(error.response.status);
    //         console.log(error.response.headers);
    //     } else if (error.request) {
    //         // The request was made but no response was received
    //         console.log(error.request);
    //     } else {
    //         // Something happened in setting up the request that triggered an Error
    //         console.log("Error", error.message);
    //     }
    // });
};

export default stripeTokenHandler;
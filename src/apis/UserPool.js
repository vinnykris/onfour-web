// File configures out Cognito User Pool API so that we can track when
// users register, log in, sign out, are logged in, etc.

// Amplify
import Amplify, { Auth } from "aws-amplify";

Amplify.configure({
  Auth: {
    // REQUIRED - Amazon Cognito Region
    region: "us-east-1",

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: "us-east-1_zHyCq5Y6W",

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: "11os48ai0lk5uo63gc0gnfdtl0",

    // OPTIONAL - Hosted UI configuration
    oauth: {
      domain: "onfourpool.auth.us-east-1.amazoncognito.com",
      redirectSignIn: "http://localhost:3000/",
      redirectSignOut: "http://localhost:3000/",
      responseType: "code", // or 'token', note that REFRESH token will only be generated when the responseType is code
    },
  },
});

export default Auth;

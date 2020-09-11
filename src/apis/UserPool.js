// File configures out Cognito User Pool API so that we can track when
// users register, log in, sign out, are logged in, etc.

// Amplify
import Amplify, { Auth } from "aws-amplify";

Amplify.configure({
  Auth: {
    region: "us-east-1",

    userPoolId: "us-east-1_zHyCq5Y6W",

    userPoolWebClientId: "11os48ai0lk5uo63gc0gnfdtl0",
  },
  oauth: {
    domain: "onfourpool.auth.us-east-1.amazoncognito.com",
    redirectSignIn: "http://localhost:3000",
    redirectSignOut: "http://localhost:3000",
    responseType: "code",
    scope: ["email", "profile", "openid"],
  },
});

export default Auth;

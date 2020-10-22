// File configures out Cognito User Pool API so that we can track when
// users register, log in, sign out, are logged in, etc.

// Amplify
import Amplify, { Auth } from "aws-amplify";

Amplify.configure({
  Auth: {
    region: "us-east-1",

    userPoolId: "us-east-1_Zk9B73Bkt",

    userPoolWebClientId: "1eolu4qrfnuv4207u32p53uudm",

    authenticationFlowType: "USER_PASSWORD_AUTH",
  },
  oauth: {
    domain: "onfournewpool.auth.us-east-1.amazoncognito.com",
    redirectSignIn: "http://localhost:3000/profile",
    redirectSignOut: "http://localhost:3000",
    responseType: "code",
    scope: ["email", "profile", "openid"],
  },
});

export default Auth;

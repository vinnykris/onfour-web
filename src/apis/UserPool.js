// File configures out Cognito User Pool API so that we can track when
// users register, log in, sign out, are logged in, etc.

// Amplify
import Amplify, { Auth } from "aws-amplify";

Amplify.configure({
  Auth: {
    // REQUIRED - Amazon Cognito Region
    region: "us-east-1",

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: "us-east-1_qgIFKD7ne",

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: "42ejcjmuaslnoboi6k2fag3qph",
  },
});

export default Auth;

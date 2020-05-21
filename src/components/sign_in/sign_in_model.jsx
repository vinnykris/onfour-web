// React Imports
import React from 'react';

// Component Imports
import SignInBox from "./sign_in";

// Styling Imports
import "./sign_in_styles.scss";

// Modal wrapper for SignIn form 
const SignInModal = () => {
    return (
        <div className="modal" id="signInModal" tapindex="-1" role="dialog" aria-labelledby="signInModalLabel" aria-hidden="true">
            <SignInBox></SignInBox>
        </div>
    );
}

export default SignInModal;
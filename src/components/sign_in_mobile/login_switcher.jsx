// React Imports
import React, { useState } from "react";

// Component Imports
import RegisterMobile from "./register_mobile";
import LoginMobile from "./login_mobile";

// Styling Imports
import "./sign_in_mobile_styles.scss";

// Modal for registering and signing up. It displays the correct page
// inside of the model by tracking what tab the user clicks on
const LoginSwitcher = ({ closeMenu }) => {
  const [show_sign_up, setShowSignUp] = useState(false); // Tracks whether to show sign up

  const toggle = () => {
    setShowSignUp(!show_sign_up);
  };

  return (
    <div>
      {!show_sign_up ? (
        <LoginMobile toggleRegister={toggle} closeMenu={closeMenu} />
      ) : (
        <div></div>
        // <RegisterMobile toggleLogin={toggle} />
      )}
    </div>
  );
};

export default LoginSwitcher;

// React Imports
import React from "react";

// Image imports
import logged_in_icon from "../../images/icons/profile_outline.png";

// Styling Imports
import "./sign_in_mobile_styles.scss";

// Creates the appropriate icon for a logged in user
const LoggedInUser = ({ first, last }) => {
  return (
    <span className="logged-in-container">
      <img className="user-icon" src={logged_in_icon} alt="white-outline"></img>
      <div className="initials">
        {first[0]}
        {last[0]}
      </div>
    </span>
  );
};

export default LoggedInUser;

// Main Imports
import React, { useState, useEffect } from "react";

// AWS Imports
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../../graphql/mutations";
import Amplify, { Analytics } from "aws-amplify";
import awsmobile from "../../apis/AppSync";
import Auth from "../../apis/UserPool";

// Styling Imports
import "./about_styles.scss";

//Amplify.configure(awsmobile);

// AboutPage component that contains all the about page layout
const LandingPage = () => {
  return <div className="about-page-content"></div>;
};
export default LandingPage;
